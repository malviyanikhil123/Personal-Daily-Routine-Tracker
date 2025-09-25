import React, { useEffect } from 'react';
import { useApp } from '../hooks';
import { calculateDayProgress, getIncompleteTasks } from '../utils';
import { weekService } from '../services';

const DailyLogsPage: React.FC = () => {
  const { state, markExpiredTasks } = useApp();
  
  // Check for expired tasks when the page loads
  useEffect(() => {
    markExpiredTasks();
  }, [markExpiredTasks]);
  
  const currentWeekTasks = state.weeklyTasks[state.currentWeek] || {};
  const incompleteTasks = getIncompleteTasks(state.weeklyTasks, state.currentWeek);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Calculate weekly statistics
  const weeklyStats = {
    totalTasks: 0,
    completedTasks: 0,
    incompleteTasks: 0,
    overallCompletionRate: 0,
    devopsCompletedSteps: 0,
    cppCompletedSteps: 0,
    totalCompletedSteps: 0
  };

  Object.values(currentWeekTasks).forEach(dayTasks => {
    weeklyStats.totalTasks += dayTasks.length;
    weeklyStats.completedTasks += dayTasks.filter(task => task.completed).length;
  });

  // Calculate roadmap completion
  weeklyStats.devopsCompletedSteps = state.devopsRoadmap.filter(step => step.status === 'completed').length;
  weeklyStats.cppCompletedSteps = state.cppDsaRoadmap.filter(step => step.status === 'completed').length;
  weeklyStats.totalCompletedSteps = weeklyStats.devopsCompletedSteps + weeklyStats.cppCompletedSteps;

  weeklyStats.incompleteTasks = weeklyStats.totalTasks - weeklyStats.completedTasks;
  weeklyStats.overallCompletionRate = weeklyStats.totalTasks > 0 
    ? Math.round((weeklyStats.completedTasks / weeklyStats.totalTasks) * 100)
    : 0;

  // Calculate total expired tasks count
  const totalExpiredTasks = Object.values(incompleteTasks).reduce((total, dayTasks) => total + dayTasks.length, 0);

  // Calculate historical expired tasks
  const historicalExpiredTasks = Object.values(state.weeklyHistories).reduce((total, weekHistory) => total + weekHistory.expiredTasks, 0);
  const totalHistoricalWeeks = Object.keys(state.weeklyHistories).length;

  const handleExportLogs = () => {
    const exportData = {
      weeklyTasks: state.weeklyTasks,
      dailyLogs: state.dailyLogs,
      devopsRoadmap: state.devopsRoadmap,
      cppDsaRoadmap: state.cppDsaRoadmap,
      exportDate: new Date().toISOString(),
      currentWeek: state.currentWeek
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Logs exported successfully!');
  };

  return (
    <section className="tab-content active">
      <div className="section-header">
        <h2>
          <i className="fas fa-clipboard-list"></i>
          Daily Task Logs
        </h2>
        <div className="log-controls">
          <select defaultValue={state.currentWeek}>
            <option value={state.currentWeek}>
              Current Week ({weekService.formatWeekRange(state.currentWeek)})
            </option>
          </select>
          <button className="export-btn" onClick={handleExportLogs}>
            <i className="fas fa-download"></i>
            Export Logs
          </button>
        </div>
      </div>

      <div className="logs-container">
        {/* Daily Summary */}
        <div className="daily-summary">
          <h3>📊 Daily Completion Summary</h3>
          <div className="summary-grid">
            {daysOfWeek.map((day) => {
              const dayTasks = currentWeekTasks[day] || [];
              const progress = calculateDayProgress(dayTasks);
              const isToday = day === daysOfWeek[new Date().getDay() - 1]; // Adjust for Monday = 0
              
              return (
                <div 
                  key={day}
                  className={`day-summary ${isToday ? 'today' : ''} ${progress.percentage === 100 ? 'completed' : ''}`}
                >
                  <div className="day-label">{day}</div>
                  <div className="day-visual-progress">
                    <div className="progress-circle">
                      <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="none"
                          stroke="#e0e0e0"
                          strokeWidth="4"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="none"
                          stroke={progress.percentage === 100 ? "#28a745" : progress.percentage > 0 ? "#667eea" : "#e0e0e0"}
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 25}`}
                          strokeDashoffset={`${2 * Math.PI * 25 * (1 - progress.percentage / 100)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 30 30)"
                        />
                        <text
                          x="30"
                          y="36"
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={progress.percentage === 100 ? "#28a745" : "#667eea"}
                        >
                          {progress.percentage}%
                        </text>
                      </svg>
                    </div>
                    <div className="progress-text">
                      {progress.completed}/{progress.total} tasks
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Statistics */}
        <div className="weekly-stats">
          <h3>📈 Weekly Statistics</h3>
          
          {/* Overall Progress Bar */}
          <div className="overall-progress-section">
            <div className="progress-header">
              <span>Overall Week Progress</span>
              <span className="progress-percentage">{weeklyStats.overallCompletionRate}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${weeklyStats.overallCompletionRate}%`,
                  background: weeklyStats.overallCompletionRate === 100 
                    ? 'linear-gradient(90deg, #28a745, #34ce57)' 
                    : 'linear-gradient(90deg, #667eea, #764ba2)'
                }}
              />
            </div>
            <div className="progress-details">
              {weeklyStats.completedTasks} of {weeklyStats.totalTasks} tasks completed
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{weeklyStats.overallCompletionRate}%</div>
              <div className="stat-label">Overall Completion</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{weeklyStats.completedTasks}</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="roadmap-stats">
          <h3>🎓 Learning Progress</h3>
          <div className="stats-grid">
            <div className="stat-card devops">
              <div className="stat-icon">🔧</div>
              <div className="stat-value">{weeklyStats.devopsCompletedSteps}</div>
              <div className="stat-label">DevOps Topics</div>
            </div>
            <div className="stat-card cpp">
              <div className="stat-icon">💻</div>
              <div className="stat-value">{weeklyStats.cppCompletedSteps}</div>
              <div className="stat-label">C++ & DSA Topics</div>
            </div>
            <div className="stat-card roadmap-total">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">{weeklyStats.totalCompletedSteps}</div>
              <div className="stat-label">Total Topics Completed</div>
            </div>
          </div>
        </div>

        {/* Historical Summary */}
        {totalHistoricalWeeks > 0 && (
          <div className="historical-summary">
            <h3>📈 Previous Weeks Summary</h3>
            <div className="historical-stats">
              <div className="historical-stat-card">
                <div className="historical-stat-icon">📅</div>
                <div className="historical-stat-value">{totalHistoricalWeeks}</div>
                <div className="historical-stat-label">Completed Weeks</div>
              </div>
              <div className="historical-stat-card expired">
                <div className="historical-stat-icon">⚠️</div>
                <div className="historical-stat-value">{historicalExpiredTasks}</div>
                <div className="historical-stat-label">Total Expired Tasks</div>
              </div>
              <div className="historical-stat-card average">
                <div className="historical-stat-icon">📊</div>
                <div className="historical-stat-value">
                  {totalHistoricalWeeks > 0 ? Math.round(historicalExpiredTasks / totalHistoricalWeeks) : 0}
                </div>
                <div className="historical-stat-label">Avg Expired/Week</div>
              </div>
            </div>
          </div>
        )}

        {/* Current Week Expired Tasks */}
        {Object.keys(incompleteTasks).length > 0 ? (
          <div className="incomplete-tasks">
            <h3>⚠️ Current Week - Expired Tasks ({totalExpiredTasks})</h3>
            <div className="expired-summary">
              <div className="expired-count-visual">
                <div className="expired-circle">
                  <span className="expired-number">{totalExpiredTasks}</span>
                </div>
                <div className="expired-text">Tasks need attention</div>
              </div>
            </div>
            <div className="incomplete-tasks-grid">
              {Object.entries(incompleteTasks).map(([day, tasks]) => (
                <div key={day} className="incomplete-day-section">
                  <div className="incomplete-day-header">
                    {day} ({tasks.length} expired)
                  </div>
                  <div className="incomplete-tasks-list">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className="incomplete-task-item expired"
                      >
                        <div>
                          <strong>{task.task}</strong>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            {task.time} • {task.type}
                          </div>
                        </div>
                        <div className="task-status">
                          Expired
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-incomplete-tasks">
            <i className="fas fa-check-circle"></i>
            <p>Great! No expired tasks this week!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyLogsPage;