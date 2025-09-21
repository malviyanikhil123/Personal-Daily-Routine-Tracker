import { useState, useEffect } from 'react';
import { Header, ToastContainer } from './components';
import { DevOpsRoadmapPage, CppRoadmapPage, WeeklyTasksPage, DailyLogsPage, AnalyticsPage } from './pages';
import { AppProvider } from './context';
import { useToast, useApp } from './hooks';
import type { TabType } from './types';
import './styles/index.css';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('devops-roadmap');
  const { toasts, removeToast } = useToast();
  const { forceRefreshRoadmaps } = useApp();

  // Make forceRefreshRoadmaps available globally for debugging
  useEffect(() => {
    (window as typeof window & { forceRefreshRoadmaps?: () => void }).forceRefreshRoadmaps = forceRefreshRoadmaps;
    return () => {
      delete (window as typeof window & { forceRefreshRoadmaps?: () => void }).forceRefreshRoadmaps;
    };
  }, [forceRefreshRoadmaps]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'devops-roadmap':
        return <DevOpsRoadmapPage />;
      case 'cpp-roadmap':
        return <CppRoadmapPage />;
      case 'weekly':
        return <WeeklyTasksPage />;
      case 'logs':
        return <DailyLogsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <DevOpsRoadmapPage />;
    }
  };

  return (
    <>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="main">
        <div className="container">
          {renderCurrentTab()}
        </div>
      </main>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
