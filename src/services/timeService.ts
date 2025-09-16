import type { TimeService, WeeklyTask } from '../types';

export const timeService: TimeService = {
  formatTimeToAMPM: (time24: string): string => {
    if (!time24) return time24;
    
    // Handle time ranges like "07:00-08:00"
    if (time24.includes('-')) {
      const [startTime, endTime] = time24.split('-');
      return `${timeService.convertSingleTime(startTime.trim())}-${timeService.convertSingleTime(endTime.trim())}`;
    }
    
    // Handle single time
    return timeService.convertSingleTime(time24);
  },

  convertSingleTime: (time: string): string => {
    if (!time || !time.includes(':')) return time;
    
    const [hours24, minutes] = time.split(':');
    const hour24 = parseInt(hours24);
    
    if (hour24 === 0) {
      return `12:${minutes} AM`;
    } else if (hour24 < 12) {
      return `${hour24}:${minutes} AM`;
    } else if (hour24 === 12) {
      return `12:${minutes} PM`;
    } else {
      return `${hour24 - 12}:${minutes} PM`;
    }
  },

  isTaskExpired: (day: string, task: WeeklyTask, currentWeek: string): boolean => {
    if (task.completed || task.isExpired) return task.isExpired || false;
    
    const now = new Date();
    // Fix timezone issue: append time to ensure local date parsing
    const taskDate = new Date(currentWeek + 'T00:00:00');
    
    // Get the day index (Monday = 0, Sunday = 6)
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    taskDate.setDate(taskDate.getDate() + dayIndex);
    
    // Parse the task's end time (assuming format like "07:00-08:00")
    const taskDeadline = new Date(taskDate);
    
    if (task.time && task.time.includes('-')) {
      try {
        // Extract end time from range (e.g., "07:00-08:00" -> "08:00")
        const endTime = task.time.split('-')[1].trim();
        const [hours, minutes] = endTime.split(':').map(num => parseInt(num));
        
        taskDeadline.setHours(hours, minutes, 0, 0);
      } catch {
        // Fallback to end of day if time parsing fails
        taskDeadline.setHours(23, 59, 59, 999);
      }
    } else {
      // Fallback to end of day if no time range specified
      taskDeadline.setHours(23, 59, 59, 999);
    }
    
    // Task is expired if current time is past the deadline
    return now > taskDeadline;
  },

  isTaskPending: (day: string, task: WeeklyTask, currentWeek: string): boolean => {
    if (task.completed || task.isExpired) return false;
    
    const now = new Date();
    // Fix timezone issue: append time to ensure local date parsing
    const taskDate = new Date(currentWeek + 'T00:00:00');
    
    // Get the day index (Monday = 0, Sunday = 6)
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    taskDate.setDate(taskDate.getDate() + dayIndex);
    
    // Check if it's the same day
    const isToday = now.toDateString() === taskDate.toDateString();
    
    if (!isToday) return false;
    
    // If it's today, check if the task time hasn't passed yet
    if (task.time && task.time.includes('-')) {
      try {
        // Extract end time from range (e.g., "07:00-08:00" -> "08:00")
        const endTime = task.time.split('-')[1].trim();
        const [hours, minutes] = endTime.split(':').map(num => parseInt(num));
        
        const taskDeadline = new Date(taskDate);
        taskDeadline.setHours(hours, minutes, 0, 0);
        
        // Task is pending if it's today and the deadline hasn't passed
        return now <= taskDeadline;
      } catch {
        // Fallback: if time parsing fails, consider it pending for the whole day
        return true;
      }
    }
    
    // If no time range specified, consider it pending for the whole day
    return true;
  }
};