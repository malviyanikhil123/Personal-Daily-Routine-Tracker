import type { RoadmapStep, WeeklyTask, WeeklyTasks, DailyLogs } from '../types';
import { timeService } from '../services';

export const generateTaskId = (day: string): string => {
  return `${day}-${Date.now()}-${Math.random()}`;
};

export const calculateRoadmapProgress = (roadmap: RoadmapStep[]): number => {
  if (roadmap.length === 0) return 0;
  const completed = roadmap.filter(step => step.status === 'completed').length;
  return Math.round((completed / roadmap.length) * 100);
};

export const calculateDayProgress = (tasks: WeeklyTask[]): { completed: number; total: number; percentage: number } => {
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const getIncompleteTasks = (weeklyTasks: WeeklyTasks, currentWeek: string): { [day: string]: WeeklyTask[] } => {
  const incompleteTasks: { [day: string]: WeeklyTask[] } = {};
  const weekTasks = weeklyTasks[currentWeek];
  
  if (!weekTasks) return incompleteTasks;
  
  Object.entries(weekTasks).forEach(([day, tasks]) => {
    // Only include expired tasks, not pending ones
    const expiredTasks = tasks.filter(task => 
      !task.completed && timeService.isTaskExpired(day, task, currentWeek)
    );
    if (expiredTasks.length > 0) {
      incompleteTasks[day] = expiredTasks.map(task => ({
        ...task,
        isExpired: true
      }));
    }
  });
  
  return incompleteTasks;
};

export const markExpiredTasks = (weeklyTasks: WeeklyTasks, currentWeek: string): { 
  updatedTasks: WeeklyTasks; 
  expiredTasks: Array<{ task: string; day: string; time: string }>;
} => {
  const currentWeekTasks = weeklyTasks[currentWeek];
  if (!currentWeekTasks) {
    return { updatedTasks: weeklyTasks, expiredTasks: [] };
  }

  let hasExpiredTasks = false;
  const expiredTasks: Array<{ task: string; day: string; time: string }> = [];
  const updatedWeeklyTasks = { ...weeklyTasks };

  Object.entries(currentWeekTasks).forEach(([day, tasks]) => {
    const updatedTasks = tasks.map(task => {
      if (!task.completed && !task.isExpired && timeService.isTaskExpired(day, task, currentWeek)) {
        hasExpiredTasks = true;
        expiredTasks.push({ task: task.task, day, time: task.time });
        return { ...task, isExpired: true };
      }
      return task;
    });

    if (hasExpiredTasks) {
      updatedWeeklyTasks[currentWeek] = {
        ...updatedWeeklyTasks[currentWeek],
        [day]: updatedTasks
      };
    }
  });

  return { updatedTasks: updatedWeeklyTasks, expiredTasks };
};

export const logTaskCompletion = (task: WeeklyTask, dailyLogs: DailyLogs): DailyLogs => {
  const today = new Date().toISOString().split('T')[0];
  
  const updatedLogs = { ...dailyLogs };
  if (!updatedLogs[today]) {
    updatedLogs[today] = [];
  }

  // Remove previous log for this task if exists
  updatedLogs[today] = updatedLogs[today].filter(log => log.taskId !== task.id);

  // Add new log if task is completed
  if (task.completed) {
    updatedLogs[today].push({
      taskId: task.id,
      task: task.task,
      time: task.time,
      type: task.type,
      status: 'completed',
      completedAt: new Date().toISOString()
    });
  }

  return updatedLogs;
};

export const logUndoneTask = (task: WeeklyTask, day: string, dailyLogs: DailyLogs): DailyLogs => {
  const today = new Date().toISOString().split('T')[0];
  
  const updatedLogs = { ...dailyLogs };
  if (!updatedLogs[today]) {
    updatedLogs[today] = [];
  }

  // Check if already logged as undone
  const existingLog = updatedLogs[today].find(log => 
    log.taskId === task.id && log.status === 'undone'
  );

  if (!existingLog) {
    updatedLogs[today].push({
      taskId: task.id,
      task: task.task,
      time: task.time,
      type: task.type,
      day: day,
      status: 'undone',
      expiredAt: new Date().toISOString()
    });
  }

  return updatedLogs;
};

export const initializeSkillsChecked = (step: RoadmapStep): RoadmapStep => {
  if (!step.skillsChecked) {
    return {
      ...step,
      skillsChecked: Object.keys(step.details).reduce((acc, skill) => {
        acc[skill] = false;
        return acc;
      }, {} as Record<string, boolean>)
    };
  }
  return step;
};

export const getSkillProgress = (step: RoadmapStep): { completed: number; total: number; percentage: number } => {
  if (!step.skillsChecked) {
    return { completed: 0, total: Object.keys(step.details).length, percentage: 0 };
  }
  
  const completed = Object.values(step.skillsChecked).filter(checked => checked).length;
  const total = Object.keys(step.details).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const logRoadmapSkillCompletion = (
  roadmapType: 'devops' | 'cpp',
  stepId: number,
  stepTitle: string,
  skill: string,
  completed: boolean,
  dailyLogs: DailyLogs
): DailyLogs => {
  const today = new Date().toISOString().split('T')[0];
  
  const updatedLogs = { ...dailyLogs };
  if (!updatedLogs[today]) {
    updatedLogs[today] = [];
  }

  // Create a unique taskId for roadmap skills
  const skillTaskId = `roadmap-${roadmapType}-${stepId}-${skill.replace(/[^a-zA-Z0-9]/g, '-')}`;

  // Remove previous log for this skill if exists
  updatedLogs[today] = updatedLogs[today].filter(log => log.taskId !== skillTaskId);

  // Add new log if skill is completed
  if (completed) {
    updatedLogs[today].push({
      taskId: skillTaskId,
      task: `📚 ${skill}`,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'learning',
      status: 'completed',
      completedAt: new Date().toISOString(),
      roadmapType,
      stepId,
      stepTitle,
      skill
    });
  }

  return updatedLogs;
};