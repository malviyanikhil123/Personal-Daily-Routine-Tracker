import React from 'react';
import type { WeeklyTaskItemProps } from '../types';
import { timeService } from '../services';
import { useApp } from '../hooks';

const WeeklyTaskItem: React.FC<WeeklyTaskItemProps> = ({ 
  task, 
  day, 
  onToggle 
}) => {
  const { state } = useApp();
  
  const isExpired = task.isExpired || timeService.isTaskExpired(day, task, state.currentWeek);
  const isPending = timeService.isTaskPending(day, task, state.currentWeek);
  
  let taskClass = '';
  let taskStatus = '';
  
  if (task.completed) {
    taskClass = 'completed';
  } else if (isExpired) {
    taskClass = 'expired';
    taskStatus = ' (Expired)';
  } else if (isPending) {
    taskClass = 'pending';
    taskStatus = ' (Pending)';
  }

  const handleToggle = () => {
    onToggle(day, task.id);
  };

  return (
    <div 
      className={`task-item ${taskClass}`}
      data-type={task.type}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        disabled={isExpired && !task.completed}
        onChange={handleToggle}
      />
      <span className="task-text">{task.task}{taskStatus}</span>
      <span className="task-time">{timeService.formatTimeToAMPM(task.time)}</span>
    </div>
  );
};

export default WeeklyTaskItem;