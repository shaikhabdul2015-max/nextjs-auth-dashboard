import { Project, MetricStat, ActivityLog, User } from '../types/index.ts';

export const APP_CONFIG = {
  name: 'App Workspace',
  version: '1.0.0',
  description: 'Production-ready Next.js & React full-stack project architecture',
  company: 'CloudWorks Inc.',
};

export const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    email: 'alex.rivera@example.com',
    fullName: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    createdAt: '2026-01-10T12:00:00Z',
    organization: 'Acme Technologies',
  },
  {
    id: 'user-2',
    email: 'sarah.chen@example.com',
    fullName: 'Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'editor',
    createdAt: '2026-02-15T09:30:00Z',
    organization: 'Acme Technologies',
  },
  {
    id: 'user-3',
    email: 'marcus.vance@example.com',
    fullName: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'viewer',
    createdAt: '2026-03-01T15:00:00Z',
    organization: 'Acme Technologies',
  },
];

export const INITIAL_METRICS: MetricStat[] = [
  {
    id: 'metric-1',
    label: 'Total Active Projects',
    value: '14',
    change: 12.5,
    changeType: 'increase',
    period: 'vs last month',
    iconName: 'FolderKanban',
  },
  {
    id: 'metric-2',
    label: 'Sprint Velocity',
    value: '94.2%',
    change: 4.8,
    changeType: 'increase',
    period: 'vs last sprint',
    iconName: 'Zap',
  },
  {
    id: 'metric-3',
    label: 'Avg Response Time',
    value: '142ms',
    change: -18.2,
    changeType: 'increase', // negative latency is an improvement
    period: 'system health',
    iconName: 'Activity',
  },
  {
    id: 'metric-4',
    label: 'Team Contributors',
    value: '28',
    change: 3,
    changeType: 'increase',
    period: 'new members',
    iconName: 'Users',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Design System 2.0',
    description: 'Re-architecting the core component library with Tailwind tokens and WCAG 2.2 accessibility.',
    category: 'Design',
    status: 'active',
    priority: 'high',
    progress: 78,
    dueDate: '2026-10-15',
    assignees: [
      { id: 'user-1', name: 'Alex Rivera', avatarUrl: DEMO_USERS[0].avatarUrl },
      { id: 'user-2', name: 'Sarah Chen', avatarUrl: DEMO_USERS[1].avatarUrl },
    ],
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-09-12T14:30:00Z',
  },
  {
    id: 'proj-2',
    title: 'Supabase Real-Time Sync Layer',
    description: 'PostgreSQL row-level security replication and client websocket connection pooling.',
    category: 'Backend',
    status: 'in_review',
    priority: 'urgent',
    progress: 92,
    dueDate: '2026-09-30',
    assignees: [
      { id: 'user-3', name: 'Marcus Vance', avatarUrl: DEMO_USERS[2].avatarUrl },
      { id: 'user-1', name: 'Alex Rivera', avatarUrl: DEMO_USERS[0].avatarUrl },
    ],
    createdAt: '2026-08-15T00:00:00Z',
    updatedAt: '2026-09-13T09:15:00Z',
  },
  {
    id: 'proj-3',
    title: 'Mobile Companion App (iOS & Android)',
    description: 'Native push notifications, biometric auth unlock, and offline-first data caching.',
    category: 'Mobile',
    status: 'active',
    priority: 'medium',
    progress: 45,
    dueDate: '2026-11-20',
    assignees: [
      { id: 'user-2', name: 'Sarah Chen', avatarUrl: DEMO_USERS[1].avatarUrl },
    ],
    createdAt: '2026-08-20T00:00:00Z',
    updatedAt: '2026-09-11T16:00:00Z',
  },
  {
    id: 'proj-4',
    title: 'Multi-Region CI/CD Pipeline Migration',
    description: 'Zero-downtime canary deployments across Google Cloud Run and Kubernetes clusters.',
    category: 'DevOps',
    status: 'completed',
    priority: 'high',
    progress: 100,
    dueDate: '2026-09-05',
    assignees: [
      { id: 'user-1', name: 'Alex Rivera', avatarUrl: DEMO_USERS[0].avatarUrl },
      { id: 'user-3', name: 'Marcus Vance', avatarUrl: DEMO_USERS[2].avatarUrl },
    ],
    createdAt: '2026-07-10T00:00:00Z',
    updatedAt: '2026-09-05T18:00:00Z',
  },
  {
    id: 'proj-5',
    title: 'Next.js App Router Architecture Audit',
    description: 'Standardizing server components, streaming SSR layouts, and error boundary fallbacks.',
    category: 'Frontend',
    status: 'active',
    priority: 'medium',
    progress: 60,
    dueDate: '2026-10-01',
    assignees: [
      { id: 'user-2', name: 'Sarah Chen', avatarUrl: DEMO_USERS[1].avatarUrl },
    ],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-12T11:20:00Z',
  },
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    userId: 'user-1',
    userName: 'Alex Rivera',
    action: 'merged pull request for',
    target: 'Supabase Real-Time Sync Layer',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18m ago
    type: 'project',
  },
  {
    id: 'act-2',
    userId: 'user-2',
    userName: 'Sarah Chen',
    action: 'updated sprint scope for',
    target: 'Enterprise Design System 2.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // ~1h ago
    type: 'project',
  },
  {
    id: 'act-3',
    userId: 'user-3',
    userName: 'Marcus Vance',
    action: 'logged into admin session via',
    target: 'OAuth Supabase Provider',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3h ago
    type: 'auth',
  },
  {
    id: 'act-4',
    userId: 'user-1',
    userName: 'Alex Rivera',
    action: 'completed deployment verification',
    target: 'Multi-Region CI/CD Pipeline',
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7h ago
    type: 'system',
  },
];
