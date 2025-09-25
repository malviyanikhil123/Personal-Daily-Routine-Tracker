import { useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AppState, StepStatus } from '../types';
import { useLocalStorage, useToast, useWeekManagement } from '../hooks';
import { devopsRoadmapData, cppDsaRoadmapData } from '../utils';
import { markExpiredTasks, logTaskCompletion, logUndoneTask } from '../utils/helpers';
import { weekService } from '../services';
import { AppContext, type AppAction, type AppContextType } from './AppContext';

// App reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, currentTab: action.payload };
    
    case 'UPDATE_ROADMAP_STEP': {
      const { roadmapType, stepId, status } = action.payload;
      const roadmapKey = roadmapType === 'devops' ? 'devopsRoadmap' : 'cppDsaRoadmap';
      
      return {
        ...state,
        [roadmapKey]: state[roadmapKey].map(step =>
          step.id === stepId ? { ...step, status } : step
        )
      };
    }
    
    case 'UPDATE_SKILL_CHECKED': {
      const { roadmapType, stepId, skill, checked } = action.payload;
      const roadmapKey = roadmapType === 'devops' ? 'devopsRoadmap' : 'cppDsaRoadmap';
      
      return {
        ...state,
        [roadmapKey]: state[roadmapKey].map(step =>
          step.id === stepId 
            ? { 
                ...step, 
                skillsChecked: { 
                  ...step.skillsChecked, 
                  [skill]: checked 
                } 
              }
            : step
        )
      };
    }
    
    case 'TOGGLE_WEEKLY_TASK': {
      const { day, taskId } = action.payload;
      const currentWeekTasks = state.weeklyTasks[state.currentWeek];
      
      if (!currentWeekTasks || !currentWeekTasks[day]) return state;
      
      return {
        ...state,
        weeklyTasks: {
          ...state.weeklyTasks,
          [state.currentWeek]: {
            ...currentWeekTasks,
            [day]: currentWeekTasks[day].map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        }
      };
    }
    
    case 'SET_DEVOPS_ROADMAP':
      return { ...state, devopsRoadmap: action.payload };
    
    case 'SET_CPP_ROADMAP':
      return { ...state, cppDsaRoadmap: action.payload };
    
    case 'SET_WEEKLY_TASKS':
      return { ...state, weeklyTasks: action.payload };
    
    case 'SET_DAILY_LOGS':
      return { ...state, dailyLogs: action.payload };
    
    case 'MARK_EXPIRED_TASKS':
      return { ...state, weeklyTasks: action.payload };
    
    case 'SET_WEEKLY_HISTORIES':
      return { ...state, weeklyHistories: action.payload };
    
    case 'AUTO_RESET_WEEK': {
      const { oldWeekKey, newWeekKey, newWeekStart } = action.payload;
      const oldWeekTasks = state.weeklyTasks[oldWeekKey];
      
      if (!oldWeekTasks) {
        return {
          ...state,
          currentWeek: newWeekKey,
          currentWeekStart: newWeekStart
        };
      }
      
      // Calculate stats for the automatically completed week
      let totalTasks = 0;
      let completedTasks = 0;
      let expiredTasks = 0;
      
      Object.values(oldWeekTasks).forEach(dayTasks => {
        totalTasks += dayTasks.length;
        completedTasks += dayTasks.filter(task => task.completed).length;
        // When week ends, ALL uncompleted tasks should be counted as expired
        expiredTasks += dayTasks.filter(task => !task.completed).length;
      });
      
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      // Add old week to history
      const newHistory = {
        ...state.weeklyHistories,
        [oldWeekKey]: {
          weekKey: oldWeekKey,
          weekRange: oldWeekKey,
          totalTasks,
          completedTasks,
          expiredTasks,
          completionRate,
          endDate: new Date().toISOString()
        }
      };
      
      // Remove the old week from weeklyTasks
      const newWeeklyTasks = { ...state.weeklyTasks };
      delete newWeeklyTasks[oldWeekKey];
      
      return {
        ...state,
        weeklyHistories: newHistory,
        weeklyTasks: newWeeklyTasks,
        currentWeek: newWeekKey,
        currentWeekStart: newWeekStart
      };
    }

    case 'SET_CURRENT_WEEK_START':
      return { ...state, currentWeekStart: action.payload };
    
    default:
      return state;
  }
}

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { showToast } = useToast();
  const { currentWeek, weeklyTasks, setWeeklyTasks } = useWeekManagement();
  
  const { value: devopsRoadmap, setValue: setDevopsRoadmap } = useLocalStorage('devopsRoadmap', devopsRoadmapData);
  const { value: cppDsaRoadmap, setValue: setCppDsaRoadmap } = useLocalStorage('cppDsaRoadmap', cppDsaRoadmapData);
  const { value: dailyLogs, setValue: setDailyLogs } = useLocalStorage('dailyLogs', {});
  const { value: weeklyHistories, setValue: setWeeklyHistories } = useLocalStorage('weeklyHistories', {});

  // Initialize state
  const initialState: AppState = {
    devopsRoadmap,
    cppDsaRoadmap,
    weeklyTasks,
    dailyLogs,
    currentWeek,
    currentWeekStart: currentWeek,
    currentTab: 'devops-roadmap',
    weeklyHistories
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // One-time migration to fix historical expired tasks data
  useEffect(() => {
    const migrationKey = 'expiredTasksMigrationV1';
    const hasMigrated = localStorage.getItem(migrationKey);
    
    if (!hasMigrated && Object.keys(state.weeklyHistories).length > 0) {
      let needsMigration = false;
      const migratedHistories = { ...state.weeklyHistories };
      
      Object.keys(migratedHistories).forEach(weekKey => {
        const week = migratedHistories[weekKey];
        // If week has tasks but 0 expired tasks, it likely needs migration
        if (week.totalTasks > 0 && week.expiredTasks === 0 && week.completedTasks < week.totalTasks) {
          needsMigration = true;
          migratedHistories[weekKey] = {
            ...week,
            expiredTasks: week.totalTasks - week.completedTasks
          };
        }
      });
      
      if (needsMigration) {
        dispatch({ type: 'SET_WEEKLY_HISTORIES', payload: migratedHistories });
        localStorage.setItem(migrationKey, 'true');
        console.log('✅ Migrated historical expired tasks data');
      } else {
        localStorage.setItem(migrationKey, 'true');
      }
    }
  }, [state.weeklyHistories]);

  // Auto-save functionality - save to localStorage every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setDevopsRoadmap(state.devopsRoadmap);
      setCppDsaRoadmap(state.cppDsaRoadmap);
      setWeeklyTasks(state.weeklyTasks);
      setDailyLogs(state.dailyLogs);
      setWeeklyHistories(state.weeklyHistories);
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [state.devopsRoadmap, state.cppDsaRoadmap, state.weeklyTasks, state.dailyLogs, state.weeklyHistories, setDevopsRoadmap, setCppDsaRoadmap, setWeeklyTasks, setDailyLogs, setWeeklyHistories]);

  // Automatic expired task checking every 5 minutes
  useEffect(() => {
    const checkExpiredTasksInterval = setInterval(() => {
      const { updatedTasks, expiredTasks } = markExpiredTasks(state.weeklyTasks, state.currentWeek);
      
      if (expiredTasks.length > 0) {
        dispatch({ type: 'MARK_EXPIRED_TASKS', payload: updatedTasks });
        
        // Log expired tasks as undone
        let updatedLogs = state.dailyLogs;
        expiredTasks.forEach(({ task: taskName, day, time }) => {
          const currentWeekTasks = updatedTasks[state.currentWeek];
          if (currentWeekTasks && currentWeekTasks[day]) {
            const task = currentWeekTasks[day].find(t => t.task === taskName && t.time === time);
            if (task) {
              updatedLogs = logUndoneTask(task, day, updatedLogs);
            }
          }
        });
        
        if (updatedLogs !== state.dailyLogs) {
          dispatch({ type: 'SET_DAILY_LOGS', payload: updatedLogs });
        }
        
        showToast(`⏰ ${expiredTasks.length} task${expiredTasks.length > 1 ? 's' : ''} expired and marked as undone`, 'warning');
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(checkExpiredTasksInterval);
  }, [state.weeklyTasks, state.currentWeek, state.dailyLogs, showToast]);

  // Sync state with localStorage when roadmaps change
  useEffect(() => {
    setDevopsRoadmap(state.devopsRoadmap);
  }, [state.devopsRoadmap, setDevopsRoadmap]);

  useEffect(() => {
    setCppDsaRoadmap(state.cppDsaRoadmap);
  }, [state.cppDsaRoadmap, setCppDsaRoadmap]);

  // Simple sync: update state when hook data changes (only if hook has data)
  useEffect(() => {
    if (Object.keys(weeklyTasks).length > 0) {
      dispatch({ type: 'SET_WEEKLY_TASKS', payload: weeklyTasks });
    }
  }, [weeklyTasks]);

  useEffect(() => {
    setDailyLogs(state.dailyLogs);
  }, [state.dailyLogs, setDailyLogs]);

  // Auto-reset week function
  const checkAndResetWeek = useCallback(() => {
    const currentWeekKey = weekService.getCurrentWeek();
    
    // Check if we're in a new week
    if (currentWeekKey !== state.currentWeekStart) {
      // Auto-archive the previous week and start a new one
      dispatch({
        type: 'AUTO_RESET_WEEK',
        payload: {
          oldWeekKey: state.currentWeek,
          newWeekKey: currentWeekKey,
          newWeekStart: currentWeekKey
        }
      });
      
      showToast(`🗓️ New week started! Previous week automatically archived.`, 'info');
    }
  }, [state.currentWeekStart, state.currentWeek, showToast]);

  // Check for week reset on app load and periodically
  useEffect(() => {
    // Check immediately on app load
    checkAndResetWeek();
    
    // Check every hour for week changes
    const weekCheckInterval = setInterval(() => {
      checkAndResetWeek();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(weekCheckInterval);
  }, [checkAndResetWeek]);

  // Sync weeklyHistories with localStorage
  useEffect(() => {
    setWeeklyHistories(state.weeklyHistories);
  }, [state.weeklyHistories, setWeeklyHistories]);

  // Action helpers
  const updateRoadmapStep = (roadmapType: 'devops' | 'cpp', stepId: number, status: StepStatus) => {
    dispatch({ type: 'UPDATE_ROADMAP_STEP', payload: { roadmapType, stepId, status } });
    
    const roadmap = roadmapType === 'devops' ? state.devopsRoadmap : state.cppDsaRoadmap;
    const step = roadmap.find(s => s.id === stepId);
    if (step) {
      showToast(`${step.title} marked as ${status.replace('-', ' ')}!`);
    }
  };

  const updateSkillChecked = (roadmapType: 'devops' | 'cpp', stepId: number, skill: string, checked: boolean) => {
    dispatch({ type: 'UPDATE_SKILL_CHECKED', payload: { roadmapType, stepId, skill, checked } });
    
    if (checked) {
      showToast(`✓ ${skill} marked as learned!`, 'success');
    }
  };

  const toggleWeeklyTask = (day: string, taskId: string) => {
    const currentWeekTasks = state.weeklyTasks[state.currentWeek];
    if (!currentWeekTasks || !currentWeekTasks[day]) return;
    
    const task = currentWeekTasks[day].find(t => t.id === taskId);
    if (!task) return;

    // Check if task is expired and not completed
    if (task.isExpired && !task.completed) {
      showToast(`❌ Cannot check expired task "${task.task}"!`, 'error');
      return;
    }
    
    dispatch({ type: 'TOGGLE_WEEKLY_TASK', payload: { day, taskId } });
    
    const newStatus = !task.completed;
    const updatedLogs = logTaskCompletion({ ...task, completed: newStatus }, state.dailyLogs);
    dispatch({ type: 'SET_DAILY_LOGS', payload: updatedLogs });
    
    showToast(
      `${task.task} ${newStatus ? 'completed' : 'uncompleted'}!`,
      newStatus ? 'success' : 'info'
    );
  };

  const markExpiredTasksAction = () => {
    const { updatedTasks, expiredTasks } = markExpiredTasks(state.weeklyTasks, state.currentWeek);
    
    if (expiredTasks.length > 0) {
      dispatch({ type: 'MARK_EXPIRED_TASKS', payload: updatedTasks });
      
      // Log expired tasks as undone
      let updatedLogs = state.dailyLogs;
      expiredTasks.forEach(({ task: taskName, day, time }) => {
        const currentWeekTasks = updatedTasks[state.currentWeek];
        if (currentWeekTasks && currentWeekTasks[day]) {
          const task = currentWeekTasks[day].find(t => t.task === taskName && t.time === time);
          if (task) {
            updatedLogs = logUndoneTask(task, day, updatedLogs);
          }
        }
      });
      
      if (updatedLogs !== state.dailyLogs) {
        dispatch({ type: 'SET_DAILY_LOGS', payload: updatedLogs });
      }
      
      showToast(`⏰ ${expiredTasks.length} task${expiredTasks.length > 1 ? 's' : ''} expired and marked as undone`, 'warning');
    }
  };

  const forceRefreshRoadmaps = () => {
    // Remove roadmap data from localStorage to force refresh
    localStorage.removeItem('cppDsaRoadmap');
    localStorage.removeItem('devopsRoadmap');
    localStorage.removeItem('roadmapVersion');
    
    // Reset with fresh data
    const freshDevopsRoadmap = devopsRoadmapData.map(step => ({ ...step }));
    const freshCppDsaRoadmap = cppDsaRoadmapData.map(step => ({ ...step }));
    
    // Update state
    dispatch({ type: 'SET_DEVOPS_ROADMAP', payload: freshDevopsRoadmap });
    dispatch({ type: 'SET_CPP_ROADMAP', payload: freshCppDsaRoadmap });
    
    // Save fresh data to localStorage
    setDevopsRoadmap(freshDevopsRoadmap);
    setCppDsaRoadmap(freshCppDsaRoadmap);
    localStorage.setItem('roadmapVersion', '3.0');
    
    showToast('🔄 Roadmaps refreshed with latest data!', 'success');
  };

  const value: AppContextType = {
    state,
    dispatch,
    showToast,
    updateRoadmapStep,
    updateSkillChecked,
    toggleWeeklyTask,
    markExpiredTasks: markExpiredTasksAction,
    forceRefreshRoadmaps,
    checkAndResetWeek
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}