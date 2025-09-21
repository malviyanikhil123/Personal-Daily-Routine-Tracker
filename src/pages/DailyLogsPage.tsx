import React from 'react';
import { useApp } from '../hooks';
import { calculateDayProgress, getIncompleteTasks } from '../utils';
import { weekService } from '../services';

const DailyLogsPage: React.FC = () => {
  const { state, completeWeek } = useApp();

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

  // Calculate roadmap completion with detailed skill tracking
  const calculateRoadmapDetails = (roadmap: typeof state.devopsRoadmap) => {
    let totalSkills = 0;
    let completedSkills = 0;
    let inProgressSteps = 0;
    let completedSteps = 0;
    
    roadmap.forEach(step => {
      const stepSkillsTotal = Object.keys(step.details).length;
      const stepSkillsCompleted = step.skillsChecked ? 
        Object.values(step.skillsChecked).filter(checked => checked).length : 0;
      
      totalSkills += stepSkillsTotal;
      completedSkills += stepSkillsCompleted;
      
      if (step.status === 'completed') {
        completedSteps += 1;
      } else if (step.status === 'in-progress') {
        inProgressSteps += 1;
      }
    });
    
    return {
      totalSkills,
      completedSkills,
      inProgressSteps,
      completedSteps,
      skillCompletionRate: totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0
    };
  };

  const devopsDetails = calculateRoadmapDetails(state.devopsRoadmap);
  const cppDetails = calculateRoadmapDetails(state.cppDsaRoadmap);

  weeklyStats.devopsCompletedSteps = devopsDetails.completedSteps;
  weeklyStats.cppCompletedSteps = cppDetails.completedSteps;
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
          <button className="complete-week-btn" onClick={completeWeek}>
            <i className="fas fa-check-circle"></i>
            Complete Week
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

          {/* Overall Weekly Tasks Progress */}
          <div className="overall-progress-section">
            <div className="progress-header">
              <span>Overall Weekly Tasks Progress</span>
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

          {/* Weekly Tasks Statistics */}
          <div className="weekly-tasks-stats">
            <h4>📋 Weekly Tasks</h4>
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
        </div>
        <div>
          {/* DevOps Roadmap Statistics */}
          <div className="roadmap-stats devops-section">
            <h4>🔧 DevOps Roadmap Progress</h4>
            <div className="roadmap-progress-section">
              <div className="progress-header">
                <span>DevOps Skills Completion</span>
                <span className="progress-percentage">{devopsDetails.skillCompletionRate}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill devops"
                  style={{
                    width: `${devopsDetails.skillCompletionRate}%`,
                    background: devopsDetails.skillCompletionRate === 100
                      ? 'linear-gradient(90deg, #28a745, #34ce57)'
                      : 'linear-gradient(90deg, #17a2b8, #138496)'
                  }}
                />
              </div>
              <div className="progress-details">
                {devopsDetails.completedSkills} of {devopsDetails.totalSkills} skills completed
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card devops">
                <div className="stat-icon">📈</div>
                <div className="stat-value">{devopsDetails.skillCompletionRate}%</div>
                <div className="stat-label">Skill Completion</div>
              </div>
              <div className="stat-card devops">
                <div className="stat-icon">🔧</div>
                <div className="stat-value">{devopsDetails.completedSkills}</div>
                <div className="stat-label">Skills Completed</div>
              </div>
              <div className="stat-card devops">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{devopsDetails.totalSkills}</div>
                <div className="stat-label">Total Skills</div>
              </div>
              <div className="stat-card devops">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">{devopsDetails.inProgressSteps}</div>
                <div className="stat-label">Steps In Progress</div>
              </div>
            </div>
          </div>

          {/* C++ & DSA Roadmap Statistics */}
          <div className="roadmap-stats cpp-section">
            <h4>💻 C++ & DSA Roadmap Progress</h4>
            <div className="roadmap-progress-section">
              <div className="progress-header">
                <span>C++ & DSA Skills Completion</span>
                <span className="progress-percentage">{cppDetails.skillCompletionRate}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill cpp"
                  style={{
                    width: `${cppDetails.skillCompletionRate}%`,
                    background: cppDetails.skillCompletionRate === 100
                      ? 'linear-gradient(90deg, #28a745, #34ce57)'
                      : 'linear-gradient(90deg, #dc3545, #c82333)'
                  }}
                />
              </div>
              <div className="progress-details">
                {cppDetails.completedSkills} of {cppDetails.totalSkills} skills completed
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card cpp">
                <div className="stat-icon">📊</div>
                <div className="stat-value">{cppDetails.skillCompletionRate}%</div>
                <div className="stat-label">Skill Completion</div>
              </div>
              <div className="stat-card cpp">
                <div className="stat-icon">💻</div>
                <div className="stat-value">{cppDetails.completedSkills}</div>
                <div className="stat-label">Skills Completed</div>
              </div>
              <div className="stat-card cpp">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{cppDetails.totalSkills}</div>
                <div className="stat-label">Total Skills</div>
              </div>
              <div className="stat-card cpp">
                <div className="stat-icon">🔥</div>
                <div className="stat-value">{cppDetails.inProgressSteps}</div>
                <div className="stat-label">Steps In Progress</div>
              </div>
            </div>
          </div>

          {/* Combined Summary */}
          <div className="combined-roadmap-stats">
            <h4>🎯 Combined Roadmap Summary</h4>
            <div className="stats-grid">
              <div className="stat-card roadmap-total">
                <div className="stat-icon">🎯</div>
                <div className="stat-value">{devopsDetails.completedSkills + cppDetails.completedSkills}</div>
                <div className="stat-label">Total Skills Completed</div>
              </div>
              <div className="stat-card roadmap-total">
                <div className="stat-icon">📊</div>
                <div className="stat-value">{devopsDetails.totalSkills + cppDetails.totalSkills}</div>
                <div className="stat-label">Total Skills Available</div>
              </div>
              <div className="stat-card roadmap-total">
                <div className="stat-icon">📈</div>
                <div className="stat-value">{Math.round(((devopsDetails.completedSkills + cppDetails.completedSkills) / (devopsDetails.totalSkills + cppDetails.totalSkills)) * 100)}%</div>
                <div className="stat-label">Overall Skill Progress</div>
              </div>
              <div className="stat-card roadmap-total">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">{devopsDetails.inProgressSteps + cppDetails.inProgressSteps}</div>
                <div className="stat-label">Steps In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Skills Progress Today */}
        {(() => {
          const today = new Date().toISOString().split('T')[0];
          const todayLogs = state.dailyLogs[today] || [];
          const roadmapSkills = todayLogs.filter(log => log.roadmapType && log.skill);
          
          if (roadmapSkills.length > 0) {
            const devopsSkills = roadmapSkills.filter(log => log.roadmapType === 'devops');
            const cppSkills = roadmapSkills.filter(log => log.roadmapType === 'cpp');
            
            return (
              <div className="roadmap-skills-today">
                <h3>🎯 Today's Roadmap Skills Completed ({roadmapSkills.length})</h3>
                <div className="skills-progress-grid">
                  {devopsSkills.length > 0 && (
                    <div className="skills-section devops">
                      <h4>🟠 DevOps Skills ({devopsSkills.length})</h4>
                      <div className="skills-list">
                        {devopsSkills.map((log, index) => (
                          <div key={index} className="skill-completion-item">
                            <div className="skill-icon">✅</div>
                            <div className="skill-details">
                              <div className="skill-name">{log.skill}</div>
                              <div className="skill-meta">
                                <span className="step-title">{log.stepTitle}</span>
                                <span className="completion-time">{log.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {cppSkills.length > 0 && (
                    <div className="skills-section cpp">
                      <h4>🔵 C++ & DSA Skills ({cppSkills.length})</h4>
                      <div className="skills-list">
                        {cppSkills.map((log, index) => (
                          <div key={index} className="skill-completion-item">
                            <div className="skill-icon">✅</div>
                            <div className="skill-details">
                              <div className="skill-name">{log.skill}</div>
                              <div className="skill-meta">
                                <span className="step-title">{log.stepTitle}</span>
                                <span className="completion-time">{log.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })()}

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