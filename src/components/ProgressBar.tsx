import React from 'react';
import type { ProgressBarProps } from '../types';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <div className={`progress-overview ${className}`}>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="progress-text">{progress}% Complete</span>
    </div>
  );
};

export default ProgressBar;