import { createContext } from 'react';
import type { AppState, TabType, StepStatus, RoadmapStep, WeeklyTasks, DailyLogs, WeeklyHistories } from '../types';

// Action types
export type AppAction = 
  | { type: 'SET_TAB'; payload: TabType }
  | { type: 'UPDATE_ROADMAP_STEP'; payload: { roadmapType: 'devops' | 'cpp'; stepId: number; status: StepStatus } }
  | { type: 'UPDATE_SKILL_CHECKED'; payload: { roadmapType: 'devops' | 'cpp'; stepId: number; skill: string; checked: boolean } }
  | { type: 'TOGGLE_WEEKLY_TASK'; payload: { day: string; taskId: string } }
  | { type: 'SET_DEVOPS_ROADMAP'; payload: RoadmapStep[] }
  | { type: 'SET_CPP_ROADMAP'; payload: RoadmapStep[] }
  | { type: 'SET_WEEKLY_TASKS'; payload: WeeklyTasks }
  | { type: 'SET_DAILY_LOGS'; payload: DailyLogs }
  | { type: 'MARK_EXPIRED_TASKS'; payload: WeeklyTasks }
  | { type: 'SET_WEEKLY_HISTORIES'; payload: WeeklyHistories }
  | { type: 'COMPLETE_WEEK'; payload: { weekKey: string; newWeekKey: string } }
  | { type: 'AUTO_RESET_WEEK'; payload: { oldWeekKey: string; newWeekKey: string; newWeekStart: string } }
  | { type: 'SET_CURRENT_WEEK_START'; payload: string };

// Context interface
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  updateRoadmapStep: (roadmapType: 'devops' | 'cpp', stepId: number, status: StepStatus) => void;
  updateSkillChecked: (roadmapType: 'devops' | 'cpp', stepId: number, skill: string, checked: boolean) => void;
  toggleWeeklyTask: (day: string, taskId: string) => void;
  markExpiredTasks: () => void;
  forceRefreshRoadmaps: () => void;
  completeWeek: () => void;
  checkAndResetWeek: () => void;
}

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);