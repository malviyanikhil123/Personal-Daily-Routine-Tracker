import type { WeekService, WeeklyTask } from '../types';

export const weekService: WeekService = {
  getCurrentWeek: (): string => {
    const now = new Date();
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = now.getDay();
    // Calculate days to subtract to get to Monday (start of week)
    // For Monday-to-Sunday week calculation:
    // If today is Sunday (0), go back 6 days to get previous Monday
    // If today is Monday (1), go back 0 days (today is start of week)
    // If today is Tuesday (2), go back 1 day to get Monday
    // If today is Wednesday (3), go back 2 days to get Monday, etc.
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - daysToMonday);
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of day
    
    // Use local date formatting to avoid timezone issues
    const year = startOfWeek.getFullYear();
    const month = String(startOfWeek.getMonth() + 1).padStart(2, '0');
    const day = String(startOfWeek.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  formatDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  },

  formatWeekRange: (weekStartDate: string): string => {
    const weekStart = new Date(weekStartDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return `${weekService.formatDate(weekStart)} - ${weekService.formatDate(weekEnd)}`;
  },

  isTaskExpired: (day: string, task: WeeklyTask, currentWeek: string): boolean => {
    if (task.completed || task.isExpired) return task.isExpired;
    
    const now = new Date();
    // Fix timezone issue: append time to ensure local date parsing
    const taskDate = new Date(currentWeek + 'T00:00:00');
    
    // Calculate which day of the week this task belongs to
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = daysOfWeek.indexOf(day);
    
    if (dayIndex === -1) return false;
    
    // Add days to get the actual date for this task
    taskDate.setDate(taskDate.getDate() + dayIndex);
    
    // Parse task time to get end time
    const taskEndTime = new Date(taskDate);
    if (task.time.includes('-')) {
      const [, endTime] = task.time.split('-');
      const [hours, minutes] = endTime.trim().split(':');
      taskEndTime.setHours(parseInt(hours), parseInt(minutes));
    } else {
      // If no end time, consider it expired after start time + 1 hour
      const [hours, minutes] = task.time.split(':');
      taskEndTime.setHours(parseInt(hours) + 1, parseInt(minutes));
    }
    
    return now > taskEndTime;
  }
};