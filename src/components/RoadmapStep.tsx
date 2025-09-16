import React from 'react';
import type { RoadmapStepProps } from '../types';

const RoadmapStep: React.FC<RoadmapStepProps> = ({ 
  step, 
  onStatusUpdate, 
  onShowDetails 
}) => {
  const handleStartLearning = () => {
    onStatusUpdate(step.id, 'in-progress');
  };

  const handleMarkComplete = () => {
    onStatusUpdate(step.id, 'completed');
  };

  const handleShowDetails = () => {
    onShowDetails(step.id);
  };

  return (
    <div className="roadmap-step">
      <div className="step-header">
        <h3 className="step-title">{step.title}</h3>
        <span className={`step-status ${step.status}`}>
          {step.status.replace('-', ' ')}
        </span>
      </div>
      <p className="step-description">{step.description}</p>
      <div className="step-skills">
        {step.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
      <div className="step-actions">
        {step.status === 'not-started' && (
          <button className="btn-primary" onClick={handleStartLearning}>
            Start Learning
          </button>
        )}
        <button className="btn-secondary" onClick={handleShowDetails}>
          View Details
        </button>
        {step.status !== 'not-started' && step.status !== 'completed' && (
          <button className="btn-primary" onClick={handleMarkComplete}>
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default RoadmapStep;