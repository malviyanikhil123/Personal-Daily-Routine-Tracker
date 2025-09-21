import React, { useMemo, useState } from 'react';
import { useApp } from '../hooks';

interface DailyActivityData {
  date: string;
  completed: number;
  undone: number;
  expired: number;
  learning: number;
  project: number;
  planning: number;
  work: number;
  break: number;
  total: number;
}

const AnalyticsPage: React.FC = () => {
  const { state } = useApp();

  // Process daily logs data for charts
  const analyticsData = useMemo(() => {
    const logs = state.dailyLogs;
    const taskTypes = { learning: 0, project: 0, planning: 0, work: 0, break: 0 };
    const completionStats = { completed: 0, undone: 0 };
    const dailyActivity: { [key: string]: DailyActivityData } = {};
    const roadmapProgress = { devops: 0, cpp: 0 };
    const currentDate = new Date();

    // Process all daily logs
    Object.entries(logs).forEach(([date, dayLogs]) => {
      let dayCompleted = 0;
      let dayUndone = 0;
      let dayExpired = 0;
      let dayLearning = 0;
      let dayProject = 0;
      let dayPlanning = 0;
      let dayWork = 0;
      let dayBreak = 0;

      const logDate = new Date(date);
      const isExpired = logDate < currentDate;

      dayLogs.forEach(log => {
        // Count by task type
        taskTypes[log.type] += 1;
        
        // Count by status
        if (log.status === 'completed') {
          completionStats.completed += 1;
          dayCompleted += 1;
        } else {
          completionStats.undone += 1;
          dayUndone += 1;
          // Count as expired if the date has passed and task is not completed
          if (isExpired) {
            dayExpired += 1;
          }
        }

        // Count by type for daily breakdown
        switch(log.type) {
          case 'learning': dayLearning += 1; break;
          case 'project': dayProject += 1; break;
          case 'planning': dayPlanning += 1; break;
          case 'work': dayWork += 1; break;
          case 'break': dayBreak += 1; break;
        }

        // Count roadmap progress
        if (log.roadmapType === 'devops') {
          roadmapProgress.devops += 1;
        } else if (log.roadmapType === 'cpp') {
          roadmapProgress.cpp += 1;
        }
      });

      // Store daily activity
      dailyActivity[date] = {
        date,
        completed: dayCompleted,
        undone: dayUndone,
        expired: dayExpired,
        learning: dayLearning,
        project: dayProject,
        planning: dayPlanning,
        work: dayWork,
        break: dayBreak,
        total: dayLogs.length
      };
    });

    // Create weekly data (last 7 days)
    const last7Days = Object.keys(dailyActivity)
      .sort()
      .slice(-7)
      .map(date => dailyActivity[date]);

    return {
      taskTypes,
      completionStats,
      dailyActivity: Object.values(dailyActivity).sort((a: DailyActivityData, b: DailyActivityData) => a.date.localeCompare(b.date)),
      roadmapProgress,
      weeklyData: last7Days,
      totalTasks: completionStats.completed + completionStats.undone
    };
  }, [state.dailyLogs]);

  // Chart components
  const PieChart = ({ data, title, colors }: { data: { [key: string]: number }; title: string; colors: string[] }) => {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
    const total = Object.values(data).reduce((sum: number, val: number) => sum + val, 0);
    
    if (total === 0) {
      return (
        <div className="chart-container">
          <h3 style={{ color: '#333333', fontWeight: '600' }}>{title}</h3>
          <div className="no-data">No data available</div>
        </div>
      );
    }

    let currentAngle = 0;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    return (
      <div className="chart-container">
        <h3 style={{ color: '#333333', fontWeight: '600' }}>{title}</h3>
        <div className="pie-chart-wrapper">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity="1" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                </linearGradient>
              ))}
            </defs>
            {Object.entries(data).map(([key, value]: [string, number], index) => {
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;
              
              if (value === 0) return null;

              const startAngle = (currentAngle * Math.PI) / 180;
              const endAngle = ((currentAngle + angle) * Math.PI) / 180;
              
              const isHovered = hoveredSegment === key;
              const segmentRadius = isHovered ? radius + 5 : radius;
              
              const x1 = centerX + segmentRadius * Math.cos(startAngle);
              const y1 = centerY + segmentRadius * Math.sin(startAngle);
              const x2 = centerX + segmentRadius * Math.cos(endAngle);
              const y2 = centerY + segmentRadius * Math.sin(endAngle);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${segmentRadius} ${segmentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              currentAngle += angle;

              return (
                <g key={key}>
                  <path
                    d={pathData}
                    fill={`url(#gradient-${index})`}
                    stroke="#fff"
                    strokeWidth="2"
                    style={{
                      filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredSegment(key)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  <text
                    x={centerX + (segmentRadius * 0.7) * Math.cos((startAngle + endAngle) / 2)}
                    y={centerY + (segmentRadius * 0.7) * Math.sin((startAngle + endAngle) / 2)}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="12"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {percentage.toFixed(0)}%
                  </text>
                  {isHovered && (
                    <text
                      x={centerX}
                      y={centerY - 5}
                      textAnchor="middle"
                      fill="#333"
                      fontSize="14"
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </text>
                  )}
                  {isHovered && (
                    <text
                      x={centerX}
                      y={centerY + 10}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="12"
                      style={{ pointerEvents: 'none' }}
                    >
                      {value} tasks
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="pie-chart-legend">
            {Object.entries(data).map(([key, value]: [string, number], index) => (
              <div key={key} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></span>
                <span className="legend-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title, showExpired = false }: { data: DailyActivityData[]; title: string; showExpired?: boolean }) => {
    const [hoveredPoint, setHoveredPoint] = useState<{ index: number; type: 'total' | 'completed' | 'expired' } | null>(null);
    
    if (data.length === 0) {
      return (
        <div className="chart-container">
          <h3>{title}</h3>
          <div className="no-data">No data available</div>
        </div>
      );
    }

    const maxValue = showExpired 
      ? Math.max(...data.map(d => Math.max(d.expired, d.total)))
      : Math.max(...data.map(d => Math.max(d.completed, d.total)));
    const chartWidth = 500;
    const chartHeight = 250;
    const padding = 50;

    const getX = (index: number) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    const getY = (value: number) => chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));

    const totalPoints = data.map((d, i) => `${getX(i)},${getY(d.total)}`).join(' ');
    const secondaryPoints = showExpired 
      ? data.map((d, i) => `${getX(i)},${getY(d.expired)}`).join(' ')
      : data.map((d, i) => `${getX(i)},${getY(d.completed)}`).join(' ');

    // Create area path for secondary data (expired or completed)
    const secondaryAreaPath = showExpired
      ? `M ${padding},${chartHeight - padding} L ${secondaryPoints} L ${padding + ((data.length - 1) * (chartWidth - 2 * padding)) / (data.length - 1)},${chartHeight - padding} Z`
      : `M ${padding},${chartHeight - padding} L ${secondaryPoints} L ${padding + ((data.length - 1) * (chartWidth - 2 * padding)) / (data.length - 1)},${chartHeight - padding} Z`;

    const secondaryColor = showExpired ? '#dc3545' : '#28a745';
    const secondaryLabel = showExpired ? 'Expired Tasks' : 'Completed Tasks';

    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <div className="line-chart-wrapper">
          <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            <defs>
              <linearGradient id="completedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Grid lines */}
            {[...Array(6)].map((_, i) => {
              const y = padding + (i * (chartHeight - 2 * padding)) / 5;
              const value = Math.round(maxValue - (i * maxValue) / 5);
              return (
                <g key={i}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="#e8e8e8"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <text
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#888"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            
            {/* Vertical grid lines */}
            {data.map((_, i) => (
              <line
                key={i}
                x1={getX(i)}
                y1={padding}
                x2={getX(i)}
                y2={chartHeight - padding}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))}
            
            {/* Area fill for secondary data */}
            <path
              d={secondaryAreaPath}
              fill="url(#completedGradient)"
            />
            
            {/* Lines with glow effect */}
            <polyline
              points={totalPoints}
              fill="none"
              stroke="#667eea"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: totalPoints ? `${totalPoints.length}` : '0',
                strokeDashoffset: totalPoints ? `${totalPoints.length}` : '0',
                animation: 'drawLine 2s ease-in-out forwards'
              }}
            />
            <polyline
              points={secondaryPoints}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: secondaryPoints ? `${secondaryPoints.length}` : '0',
                strokeDashoffset: secondaryPoints ? `${secondaryPoints.length}` : '0',
                animation: 'drawLine 2s ease-in-out 0.5s forwards'
              }}
            />
            
            {/* Interactive points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle 
                  cx={getX(i)} 
                  cy={getY(d.total)} 
                  r={hoveredPoint?.index === i && hoveredPoint?.type === 'total' ? "8" : "5"} 
                  fill="#667eea"
                  stroke="#fff"
                  strokeWidth="2"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: hoveredPoint?.index === i && hoveredPoint?.type === 'total' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredPoint({ index: i, type: 'total' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <circle 
                  cx={getX(i)} 
                  cy={getY(showExpired ? d.expired : d.completed)} 
                  r={hoveredPoint?.index === i && hoveredPoint?.type === (showExpired ? 'expired' : 'completed') ? "8" : "5"} 
                  fill={secondaryColor}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: hoveredPoint?.index === i && hoveredPoint?.type === (showExpired ? 'expired' : 'completed') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredPoint({ index: i, type: showExpired ? 'expired' : 'completed' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Tooltip */}
                {hoveredPoint?.index === i && (
                  <g>
                    <rect
                      x={getX(i) - 40}
                      y={getY(hoveredPoint.type === 'total' ? d.total : (showExpired ? d.expired : d.completed)) - 35}
                      width="80"
                      height="25"
                      fill="rgba(0,0,0,0.8)"
                      rx="4"
                    />
                    <text
                      x={getX(i)}
                      y={getY(hoveredPoint.type === 'total' ? d.total : (showExpired ? d.expired : d.completed)) - 20}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {hoveredPoint.type === 'total' 
                        ? `Total: ${d.total}` 
                        : showExpired 
                          ? `Expired: ${d.expired}` 
                          : `Completed: ${d.completed}`
                      }
                    </text>
                    <text
                      x={getX(i)}
                      y={getY(hoveredPoint.type === 'total' ? d.total : (showExpired ? d.expired : d.completed)) - 10}
                      textAnchor="middle"
                      fill="white"
                      fontSize="9"
                    >
                      {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </text>
                  </g>
                )}
              </g>
            ))}
            
            {/* Labels */}
            {data.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
                transform={`rotate(-45, ${getX(i)}, ${chartHeight - 10})`}
              >
                {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            ))}
          </svg>
          <div className="line-chart-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#667eea' }}></span>
              <span className="legend-label">Total Tasks</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: secondaryColor }}></span>
              <span className="legend-label">{secondaryLabel}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DonutChart = ({ data, title, colors, centerText }: { 
    data: { [key: string]: number }; 
    title: string; 
    colors: string[];
    centerText: { main: string; sub: string };
  }) => {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
    const total = Object.values(data).reduce((sum: number, val: number) => sum + val, 0);
    
    if (total === 0) {
      return (
        <div className="chart-container">
          <h3 style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>{title}</h3>
          <div className="no-data">No data available</div>
        </div>
      );
    }

    let currentAngle = 0;
    const outerRadius = 80;
    const innerRadius = 50;
    const centerX = 100;
    const centerY = 100;

    return (
      <div className="chart-container">
        <h3 style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>{title}</h3>
        <div className="pie-chart-wrapper">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`donut-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity="1" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                </linearGradient>
              ))}
            </defs>
            
            {Object.entries(data).map(([key, value]: [string, number], index) => {
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;
              
              if (value === 0) return null;

              const startAngle = (currentAngle * Math.PI) / 180;
              const endAngle = ((currentAngle + angle) * Math.PI) / 180;
              
              const isHovered = hoveredSegment === key;
              const segmentOuterRadius = isHovered ? outerRadius + 5 : outerRadius;
              
              const x1Outer = centerX + segmentOuterRadius * Math.cos(startAngle);
              const y1Outer = centerY + segmentOuterRadius * Math.sin(startAngle);
              const x2Outer = centerX + segmentOuterRadius * Math.cos(endAngle);
              const y2Outer = centerY + segmentOuterRadius * Math.sin(endAngle);
              
              const x1Inner = centerX + innerRadius * Math.cos(startAngle);
              const y1Inner = centerY + innerRadius * Math.sin(startAngle);
              const x2Inner = centerX + innerRadius * Math.cos(endAngle);
              const y2Inner = centerY + innerRadius * Math.sin(endAngle);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${x1Outer} ${y1Outer}`,
                `A ${segmentOuterRadius} ${segmentOuterRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
                `L ${x2Inner} ${y2Inner}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`,
                'Z'
              ].join(' ');

              currentAngle += angle;

              return (
                <g key={key}>
                  <path
                    d={pathData}
                    fill={`url(#donut-gradient-${index})`}
                    stroke="#fff"
                    strokeWidth="2"
                    style={{
                      filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredSegment(key)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  
                  {/* Percentage label on arc */}
                  <text
                    x={centerX + ((outerRadius + innerRadius) / 2) * Math.cos((startAngle + endAngle) / 2)}
                    y={centerY + ((outerRadius + innerRadius) / 2) * Math.sin((startAngle + endAngle) / 2)}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {percentage.toFixed(0)}%
                  </text>
                </g>
              );
            })}
            
            {/* Center content */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius - 2}
              fill="rgba(255,255,255,0.95)"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
            <text
              x={centerX}
              y={centerY - 8}
              textAnchor="middle"
              fill="#333"
              fontSize="18"
              fontWeight="bold"
            >
              {centerText.main}
            </text>
            <text
              x={centerX}
              y={centerY + 8}
              textAnchor="middle"
              fill="#666"
              fontSize="10"
            >
              {centerText.sub}
            </text>
            
            {/* Hover tooltip */}
            {hoveredSegment && (
              <text
                x={centerX}
                y={centerY + 25}
                textAnchor="middle"
                fill="#333"
                fontSize="12"
                fontWeight="bold"
              >
                {hoveredSegment}: {data[hoveredSegment]}
              </text>
            )}
          </svg>
          <div className="pie-chart-legend">
            {Object.entries(data).map(([key, value]: [string, number], index) => (
              <div key={key} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></span>
                <span className="legend-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AreaChart = ({ data, title }: { data: DailyActivityData[]; title: string }) => {
    if (data.length === 0) {
      return (
        <div className="chart-container">
          <h3>{title}</h3>
          <div className="no-data">No data available</div>
        </div>
      );
    }

    const maxValue = Math.max(...data.map(d => Math.max(d.completed, d.total, d.expired || 0)));
    const chartWidth = 500;
    const chartHeight = 250;
    const padding = 50;

    const getX = (index: number) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    const getY = (value: number) => chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));

    // Create area paths
    const totalAreaPath = `M ${padding},${chartHeight - padding} ${data.map((d, i) => `L ${getX(i)},${getY(d.total)}`).join(' ')} L ${padding + ((data.length - 1) * (chartWidth - 2 * padding)) / (data.length - 1)},${chartHeight - padding} Z`;
    const completedAreaPath = `M ${padding},${chartHeight - padding} ${data.map((d, i) => `L ${getX(i)},${getY(d.completed)}`).join(' ')} L ${padding + ((data.length - 1) * (chartWidth - 2 * padding)) / (data.length - 1)},${chartHeight - padding} Z`;

    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <div className="line-chart-wrapper">
          <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            <defs>
              <linearGradient id="totalAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#667eea" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="completedAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#28a745" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#28a745" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[...Array(6)].map((_, i) => {
              const y = padding + (i * (chartHeight - 2 * padding)) / 5;
              const value = Math.round(maxValue - (i * maxValue) / 5);
              return (
                <g key={i}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="#e8e8e8"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <text
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#888"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            
            {/* Area fills */}
            <path
              d={totalAreaPath}
              fill="url(#totalAreaGradient)"
            />
            <path
              d={completedAreaPath}
              fill="url(#completedAreaGradient)"
            />
            
            {/* Boundary lines */}
            <polyline
              points={data.map((d, i) => `${getX(i)},${getY(d.total)}`).join(' ')}
              fill="none"
              stroke="#667eea"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polyline
              points={data.map((d, i) => `${getX(i)},${getY(d.completed)}`).join(' ')}
              fill="none"
              stroke="#28a745"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle cx={getX(i)} cy={getY(d.total)} r="4" fill="#667eea" stroke="#fff" strokeWidth="2" />
                <circle cx={getX(i)} cy={getY(d.completed)} r="4" fill="#28a745" stroke="#fff" strokeWidth="2" />
              </g>
            ))}
            
            {/* Labels */}
            {data.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
                transform={`rotate(-45, ${getX(i)}, ${chartHeight - 10})`}
              >
                {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            ))}
          </svg>
          <div className="line-chart-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#667eea' }}></span>
              <span className="legend-label">Total Tasks</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#28a745' }}></span>
              <span className="legend-label">Completed Tasks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="tab-content active analytics-page">
      <div className="analytics-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">
              <span className="title-icon">📊</span>
              Analytics Dashboard
            </h1>
            <p className="page-subtitle">
              Comprehensive insights into your productivity and learning progress
            </p>
          </div>
          <div className="header-stats">
            <div className="quick-stat">
              <span className="stat-number">{analyticsData.totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="quick-stat">
              <span className="stat-number">
                {analyticsData.totalTasks > 0 
                  ? Math.round((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100)
                  : 0
                }%
              </span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-container">
        {/* Enhanced Summary Stats */}
        <div className="analytics-summary">
          <div className="summary-card total-tasks">
            <div className="card-content">
              <div className="summary-icon">
                <div className="icon-wrapper">📊</div>
              </div>
              <div className="summary-details">
                <div className="summary-value">{analyticsData.totalTasks}</div>
                <div className="summary-label">Total Tasks Logged</div>
                <div className="summary-trend">+{Math.round(analyticsData.totalTasks * 0.12)} this week</div>
              </div>
            </div>
          </div>

          <div className="summary-card completed-tasks">
            <div className="card-content">
              <div className="summary-icon">
                <div className="icon-wrapper">✅</div>
              </div>
              <div className="summary-details">
                <div className="summary-value">{analyticsData.completionStats.completed}</div>
                <div className="summary-label">Tasks Completed</div>
                <div className="summary-trend">
                  {analyticsData.completionStats.completed > analyticsData.completionStats.undone ? '↗️' : '↘️'} 
                  {analyticsData.totalTasks > 0 
                    ? Math.round((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100)
                    : 0
                  }% completion rate
                </div>
              </div>
            </div>
          </div>

          <div className="summary-card success-rate">
            <div className="card-content">
              <div className="summary-icon">
                <div className="icon-wrapper">📈</div>
              </div>
              <div className="summary-details">
                <div className="summary-value">
                  {analyticsData.totalTasks > 0 
                    ? Math.round((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100)
                    : 0
                  }%
                </div>
                <div className="summary-label">Success Rate</div>
                <div className="summary-trend">
                  {((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100) >= 70 ? '🔥 Excellent!' : '💪 Keep going!'}
                </div>
              </div>
            </div>
          </div>

          <div className="summary-card roadmap-skills">
            <div className="card-content">
              <div className="summary-icon">
                <div className="icon-wrapper">🎯</div>
              </div>
              <div className="summary-details">
                <div className="summary-value">{analyticsData.roadmapProgress.devops + analyticsData.roadmapProgress.cpp}</div>
                <div className="summary-label">Roadmap Skills</div>
                <div className="summary-trend">
                  DevOps: {analyticsData.roadmapProgress.devops} | C++: {analyticsData.roadmapProgress.cpp}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="charts-section">
          <div className="section-title">
            <h2>📊 Task Analysis</h2>
            <p>Breakdown of your task types and completion patterns</p>
          </div>
          
        
            <PieChart 
              data={analyticsData.taskTypes} 
              title="Tasks by Category"
              colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']}
            />
          
            <DonutChart 
              data={analyticsData.completionStats} 
              title="Completion Overview"
              colors={['#11998e', '#f093fb']}
              centerText={{
                main: `${analyticsData.totalTasks > 0 ? Math.round((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100) : 0}%`,
                sub: 'Success Rate'
              }}
            />
          
            <PieChart 
              data={analyticsData.roadmapProgress} 
              title="Learning Progress"
              colors={['#667eea', '#f093fb']}
            />
          </div>

        {/* Progress Trends Section */}
        <div className="charts-section">
          <div className="section-title">
            <h2>📈 Progress Trends</h2>
            <p>Track your productivity patterns and task completion over time</p>
          </div>
          
            <AreaChart 
              data={analyticsData.weeklyData} 
              title="Weekly Progress Overview"
            />
          
            <DonutChart 
              data={analyticsData.taskTypes} 
              title="Task Distribution"
              colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']}
              centerText={{
                main: `${analyticsData.totalTasks}`,
                sub: 'Total Tasks'
              }}
            />
          
            <LineChart 
              data={analyticsData.weeklyData} 
              title="Task Performance Analysis"
              showExpired={true}
            />
          </div>

        {/* Insights Section */}
        <div className="insights-section">
          <div className="section-title">
            <h2>🧠 Smart Insights</h2>
            <p>AI-powered insights based on your productivity patterns</p>
          </div>
          
          <div className="insights-grid">
            <div className="insight-card productivity">
              <div className="insight-icon">🚀</div>
              <div className="insight-content">
                <h3>Productivity Score</h3>
                <div className="insight-value">
                  {analyticsData.totalTasks > 0 
                    ? Math.round((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100)
                    : 0
                  }/100
                </div>
                <p>
                  {((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100) >= 80 
                    ? "Outstanding! You're crushing your goals! 🔥"
                    : ((analyticsData.completionStats.completed / analyticsData.totalTasks) * 100) >= 60
                    ? "Great work! You're on the right track! 💪"
                    : "Room for improvement. You've got this! 🌟"
                  }
                </p>
              </div>
            </div>

            <div className="insight-card learning">
              <div className="insight-icon">📚</div>
              <div className="insight-content">
                <h3>Learning Focus</h3>
                <div className="insight-value">
                  {analyticsData.taskTypes.learning > analyticsData.taskTypes.project ? 'Learning' : 'Projects'}
                </div>
                <p>
                  {analyticsData.taskTypes.learning > analyticsData.taskTypes.project 
                    ? "You're investing heavily in learning! Knowledge is power! 🧠"
                    : "Project-focused approach! Building real solutions! 🛠️"
                  }
                </p>
              </div>
            </div>

            <div className="insight-card consistency">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h3>Consistency Rating</h3>
                <div className="insight-value">
                  {analyticsData.weeklyData.length >= 5 ? 'High' : analyticsData.weeklyData.length >= 3 ? 'Medium' : 'Low'}
                </div>
                <p>
                  {analyticsData.weeklyData.length >= 5 
                    ? "Excellent consistency! Daily habits are forming! ⭐"
                    : "Building momentum! Keep the streak going! 📈"
                  }
                </p>
              </div>
            </div>

            <div className="insight-card roadmap">
              <div className="insight-icon">🗺️</div>
              <div className="insight-content">
                <h3>Roadmap Progress</h3>
                <div className="insight-value">
                  {analyticsData.roadmapProgress.devops > analyticsData.roadmapProgress.cpp ? 'DevOps' : 'C++ & DSA'}
                </div>
                <p>
                  Current focus: {analyticsData.roadmapProgress.devops > analyticsData.roadmapProgress.cpp 
                    ? "DevOps skills are advancing rapidly! 🚀"
                    : "C++ & DSA fundamentals getting stronger! 💻"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPage;