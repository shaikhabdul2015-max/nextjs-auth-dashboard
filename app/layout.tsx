import React from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { AppView, User } from '../types/index.ts';

interface RootLayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: User | null;
  onSignOut: () => void;
  onSwitchUser: (user: User) => void;
  isSupabaseLive: boolean;
}

export const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  currentView,
  setCurrentView,
  user,
  onSignOut,
  onSwitchUser,
  isSupabaseLive,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/60 text-neutral-900 antialiased font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onSignOut={onSignOut}
        onSwitchUser={onSwitchUser}
        isSupabaseLive={isSupabaseLive}
      />

      {/* Page Body */}
      <div className="flex-1">{children}</div>

      {/* Global Minimalist Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 text-xs text-neutral-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800">Nexus Workspace</span>
            <span>•</span>
            <span>App Router &amp; Component System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>TypeScript 5.8</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Supabase Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
