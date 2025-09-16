import { useEffect, useState, useRef } from 'react';
import { weekService } from '../services';
import type { WeeklyTasks } from '../types';
import { initializeWeeklyTasks } from '../utils/data';

export function useWeekManagement() {
  const [weeklyTasks, setWeeklyTasksState] = useState<WeeklyTasks>(() => {
    try {
      const saved = localStorage.getItem('weeklyTasks');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return {};
    }
  });

  const currentWeek = weekService.getCurrentWeek();
  const hasRunInitialization = useRef(false);

  // Immediate initialization check
  useEffect(() => {
    // Force initialization if weeklyTasks is empty or current week is missing
    const shouldInitialize = !hasRunInitialization.current && 
      (Object.keys(weeklyTasks).length === 0 || !weeklyTasks[currentWeek]);
    
    if (shouldInitialize) {
      hasRunInitialization.current = true;
      
      try {
        const testData = initializeWeeklyTasks();
        const newWeeklyTasks = {
          [currentWeek]: testData
        };
        
        setWeeklyTasksState(newWeeklyTasks);
        localStorage.setItem('weeklyTasks', JSON.stringify(newWeeklyTasks));
        
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }
  }, [currentWeek, weeklyTasks]);

  const setWeeklyTasks = (newTasks: WeeklyTasks | ((prev: WeeklyTasks) => WeeklyTasks)) => {
    const updatedTasks = typeof newTasks === 'function' ? newTasks(weeklyTasks) : newTasks;
    setWeeklyTasksState(updatedTasks);
    
    try {
      localStorage.setItem('weeklyTasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  return {
    currentWeek,
    weeklyTasks,
    setWeeklyTasks
  };
}