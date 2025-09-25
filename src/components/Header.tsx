import React from 'react';
import type { TabType } from '../types';
import TabButton from './TabButton';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    {
      id: 'devops-roadmap' as TabType,
      icon: 'fas fa-road',
      label: 'DevOps Roadmap'
    },
    {
      id: 'cpp-roadmap' as TabType,
      icon: 'fas fa-code',
      label: 'C++ & DSA Roadmap'
    },
    {
      id: 'weekly' as TabType,
      icon: 'fas fa-calendar-week',
      label: 'Weekly Tasks'
    },
    {
      id: 'logs' as TabType,
      icon: 'fas fa-chart-line',
      label: 'Daily Logs'
    }
  ];

  return (
    <header className="header">
      <div className="container">
        <h1>
          <i className="fas fa-tasks"></i>
          Learning & Daily Routine Tracker
        </h1>
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={currentTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              icon={tab.icon}
              label={tab.label}
              tabId={tab.id}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;