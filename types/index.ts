export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  organization?: string;
}

export type ProjectStatus = 'active' | 'in_review' | 'completed' | 'archived';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Mobile';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  dueDate: string;
  assignees: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface MetricStat {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  iconName: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'project' | 'auth' | 'system' | 'comment';
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AppView = 'landing' | 'login' | 'dashboard' | 'projects' | 'analytics' | 'settings';
