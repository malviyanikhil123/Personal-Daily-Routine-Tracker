// Core application types
export interface AppState {
  devopsRoadmap: RoadmapStep[];
  cppDsaRoadmap: RoadmapStep[];
  weeklyTasks: WeeklyTasks;
  dailyLogs: DailyLogs;
  currentWeek: string;
  currentWeekStart: string;
  currentTab: TabType;
  weeklyHistories: WeeklyHistories;
}

export interface WeeklyHistories {
  [week: string]: WeeklyHistory;
}

export interface WeeklyHistory {
  weekKey: string;
  weekRange: string;
  totalTasks: number;
  completedTasks: number;
  expiredTasks: number;
  completionRate: number;
  endDate: string;
}

export type TabType = 'devops-roadmap' | 'cpp-roadmap' | 'weekly' | 'logs' | 'analytics';

export type StepStatus = 'not-started' | 'in-progress' | 'completed';

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  skills: string[];
  details: Record<string, string>;
  status: StepStatus;
  skillsChecked?: Record<string, boolean>;
}

export interface WeeklyTask {
  time: string;
  task: string;
  type: TaskType;
  completed: boolean;
  isExpired: boolean;
  id: string;
}

export type TaskType = 'learning' | 'work' | 'project' | 'planning' | 'break';

export interface WeeklyTasks {
  [week: string]: {
    [day: string]: WeeklyTask[];
  };
}

export interface DailyLogs {
  [date: string]: LogEntry[];
}

export interface LogEntry {
  taskId: string;
  task: string;
  time: string;
  type: TaskType;
  status: 'completed' | 'undone';
  completedAt?: string;
  expiredAt?: string;
  day?: string;
  // Roadmap tracking fields
  roadmapType?: 'devops' | 'cpp';
  stepId?: number;
  stepTitle?: string;
  skill?: string; // The specific skill/subtopic completed
}

// Component Props Types
export interface ProgressBarProps {
  progress: number;
  className?: string;
}

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  tabId: TabType;
}

export interface RoadmapStepProps {
  step: RoadmapStep;
  roadmapType: 'devops' | 'cpp';
  onStatusUpdate: (stepId: number, status: StepStatus) => void;
  onShowDetails: (stepId: number) => void;
}

export interface WeeklyTaskItemProps {
  task: WeeklyTask;
  day: string;
  onToggle: (taskId: string, day: string) => void;
}

export interface DayCardProps {
  day: string;
  tasks: WeeklyTask[];
  onTaskToggle: (taskId: string, day: string) => void;
}

// Hook return types
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (newValue: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
}

export interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Data types for initial data
export interface RoadmapData {
  devops: RoadmapStep[];
  cpp: RoadmapStep[];
}

export interface WeeklyScheduleData {
  [day: string]: Omit<WeeklyTask, 'completed' | 'isExpired' | 'id'>[];
}

// Service types
export interface StorageService {
  saveToLocalStorage: <T>(key: string, data: T) => void;
  loadFromLocalStorage: <T>(key: string, defaultValue: T) => T;
  removeFromLocalStorage: (key: string) => void;
}

export interface WeekService {
  getCurrentWeek: () => string;
  formatDate: (date: Date | string) => string;
  formatWeekRange: (weekStartDate: string) => string;
  isTaskExpired: (day: string, task: WeeklyTask, currentWeek: string) => boolean;
}

export interface TimeService {
  formatTimeToAMPM: (time24: string) => string;
  convertSingleTime: (time: string) => string;
  isTaskExpired: (day: string, task: WeeklyTask, currentWeek: string) => boolean;
  isTaskPending: (day: string, task: WeeklyTask, currentWeek: string) => boolean;
}