import React from 'react';
import { DayCard } from '../components';
import { useApp } from '../hooks';
import { weekService } from '../services';

const WeeklyTasksPage: React.FC = () => {
  const { state, toggleWeeklyTask } = useApp();
  
  const currentWeekTasks = state.weeklyTasks[state.currentWeek] || {};
  const weekRange = weekService.formatWeekRange(state.currentWeek);
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <section className="tab-content active">
      <div className="section-header">
        <h2>
          <i className="fas fa-calendar-alt"></i>
          Weekly Schedule
        </h2>
        <div className="week-controls">
          <span className="current-week">Week of {weekRange}</span>
        </div>
      </div>
      
      <div className="auto-reset-info">
        <i className="fas fa-info-circle"></i>
        <span>Weeks automatically reset every Monday. Previous weeks are archived with task statistics.</span>
      </div>
      
      <div className="weekly-grid">
        {daysOfWeek.map((day) => (
          <DayCard
            key={day}
            day={day}
            tasks={currentWeekTasks[day] || []}
            onTaskToggle={toggleWeeklyTask}
          />
        ))}
      </div>
    </section>
  );
};

export default WeeklyTasksPage;