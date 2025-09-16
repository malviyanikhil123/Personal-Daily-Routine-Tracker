import React from 'react';
import type { DayCardProps } from '../types';
import { timeService } from '../services';
import { useApp } from '../hooks';
import WeeklyTaskItem from './WeeklyTaskItem';

const DayCard: React.FC<DayCardProps> = ({ 
  day, 
  tasks, 
  onTaskToggle 
}) => {
  const { state } = useApp();
  
  const completed = tasks.filter(task => task.completed).length;
  const expired = tasks.filter(task => task.isExpired || timeService.isTaskExpired(day, task, state.currentWeek)).length;
  const pending = tasks.filter(task => timeService.isTaskPending(day, task, state.currentWeek)).length;
  const total = tasks.length;
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Create status summary
  let statusText = `${completed}/${total} (${progressPercentage}%)`;
  if (pending > 0) statusText += ` | ${pending} pending`;
  if (expired > 0) statusText += ` | ${expired} expired`;

  return (
    <div className="day-card">
      <div className="day-header">
        <h3 className="day-name">{day}</h3>
        <span className="day-progress">{statusText}</span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <WeeklyTaskItem
            key={task.id}
            task={task}
            day={day}
            onToggle={onTaskToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default DayCard;