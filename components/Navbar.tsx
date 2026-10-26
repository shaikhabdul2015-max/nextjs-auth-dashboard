import React, { useState } from 'react';
import {
  Layers,
  Search,
  Bell,
  CheckCircle2,
  Database,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User as UserIcon,
} from 'lucide-react';
import { Button } from './ui/Button.tsx';
import { User, AppView } from '../types/index.ts';
import { DEMO_USERS } from '../lib/constants.ts';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: User | null;
  onSignOut: () => void;
  onSwitchUser: (user: User) => void;
  isSupabaseLive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  onSignOut,
  onSwitchUser,
  isSupabaseLive,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="main-navbar" className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            id="navbar-brand-button"
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-md cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-neutral-900 block leading-tight">
                Nexus
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                Workspace
              </span>
            </div>
          </button>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-neutral-200">
            <button
              id="nav-link-landing"
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                currentView === 'landing'
                  ? 'text-neutral-900 bg-neutral-100'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              Overview
            </button>
            <button
              id="nav-link-dashboard"
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                currentView === 'dashboard'
                  ? 'text-neutral-900 bg-neutral-100'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-link-login"
              onClick={() => setCurrentView('login')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                currentView === 'login'
                  ? 'text-neutral-900 bg-neutral-100'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              Auth &amp; Login
            </button>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Supabase Status Indicator */}
          <div
            id="supabase-status-pill"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-neutral-200 bg-neutral-50 text-neutral-700"
            title={
              isSupabaseLive
                ? 'Connected to live Supabase backend'
                : 'Running with local persistent store (configure VITE_SUPABASE_URL for remote)'
            }
          >
            <Database className="h-3 w-3 text-neutral-500" />
            <span className="text-[11px]">
              {isSupabaseLive ? 'Supabase Connected' : 'Local Storage Mode'}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isSupabaseLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </div>

          {/* User Account / Actions */}
          {user ? (
            <div className="relative">
              <button
                id="user-profile-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-1.5 pr-2.5 text-left text-xs hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="h-7 w-7 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-800 text-white font-medium">
                    {user.fullName.charAt(0)}
                  </div>
                )}
                <div className="hidden lg:block text-left">
                  <p className="font-semibold text-neutral-800 leading-none truncate max-w-[100px]">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] text-neutral-500 capitalize">{user.role}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {showUserMenu && (
                <div
                  id="user-dropdown-card"
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg z-50 animate-in fade-in-50 zoom-in-95"
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-900">{user.fullName}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                    <span className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700">
                      Role: {user.role}
                    </span>
                  </div>

                  {/* Switch Demo Persona */}
                  <div className="py-1">
                    <p className="px-3 py-1 text-[10px] font-bold uppercase text-neutral-400">
                      Switch Role
                    </p>
                    {DEMO_USERS.map((demo) => (
                      <button
                        key={demo.id}
                        id={`switch-to-${demo.id}`}
                        onClick={() => {
                          onSwitchUser(demo);
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-md transition-colors text-left cursor-pointer ${
                          user.id === demo.id
                            ? 'bg-neutral-100 font-semibold text-neutral-900'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <span>{demo.fullName}</span>
                        <span className="text-[10px] text-neutral-400 capitalize">{demo.role}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-neutral-100">
                    <button
                      id="navbar-signout-btn"
                      onClick={() => {
                        onSignOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              id="navbar-signin-cta"
              size="sm"
              onClick={() => setCurrentView('login')}
            >
              Sign In
            </Button>
          )}

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setCurrentView('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('login');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
          >
            Auth &amp; Login
          </button>
        </div>
      )}
    </header>
  );
};
