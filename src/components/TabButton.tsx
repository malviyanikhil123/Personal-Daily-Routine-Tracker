import React from 'react';
import type { TabButtonProps } from '../types';

const TabButton: React.FC<TabButtonProps> = ({ 
  active, 
  onClick, 
  icon, 
  label, 
  tabId 
}) => {
  return (
    <button 
      className={`tab-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      data-tab={tabId}
    >
      <i className={icon}></i>
      {label}
    </button>
  );
};

export default TabButton;