import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Users2,
  Settings,
  Database,
  ExternalLink,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { AppView, User } from '../types/index.ts';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  projectCount: number;
  user: User | null;
  onOpenNewProjectModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  activeSection,
  setActiveSection,
  projectCount,
  user,
  onOpenNewProjectModal,
}) => {
  const mainNavItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'projects',
      label: 'All Projects',
      icon: FolderKanban,
      badge: projectCount.toString(),
    },
    {
      id: 'analytics',
      label: 'Metrics & Velocity',
      icon: BarChart3,
      badge: 'Live',
    },
    {
      id: 'team',
      label: 'Team Members',
      icon: Users2,
      badge: '3',
    },
  ];

  const bottomNavItems = [
    {
      id: 'database',
      label: 'Supabase Data Layer',
      icon: Database,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      id="dashboard-sidebar"
      className="w-64 shrink-0 border-r border-neutral-200 bg-neutral-50/50 flex flex-col justify-between p-4 hidden md:flex h-[calc(100vh-4rem)] sticky top-16"
    >
      {/* Upper Navigation */}
      <div className="space-y-6">
        {/* Workspace Card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-neutral-900 truncate">
                {user?.organization || 'Production'}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
              v1.0
            </span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-500 truncate">
            Workspace: {user?.role || 'Admin'}
          </p>
        </div>

        {/* Quick Action */}
        <button
          id="sidebar-new-project-btn"
          onClick={onOpenNewProjectModal}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </button>

        {/* Main Nav Items */}
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Workspace
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-200/70 text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                      isActive
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1 pt-2 border-t border-neutral-200">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Infrastructure
          </p>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-200/70 text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="rounded-lg border border-neutral-200 bg-white p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-neutral-500">
          <span>Row Storage</span>
          <span className="font-semibold text-neutral-700">1.2k / 10k</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full bg-neutral-900 rounded-full w-[24%]" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 pt-1">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          <span>RLS Enforced &amp; Encrypted</span>
        </div>
      </div>
    </aside>
  );
};
