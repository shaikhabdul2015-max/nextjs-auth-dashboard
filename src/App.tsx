/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RootLayout } from '../app/layout.tsx';
import { LandingPage } from '../app/page.tsx';
import { LoginPage } from '../app/login/page.tsx';
import { DashboardPage } from '../app/dashboard/page.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { AppView } from '../types/index.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const {
    user,
    isLoading,
    isSupabaseLive,
    signIn,
    signUp,
    signOut,
    switchUser,
  } = useAuth();

  return (
    <RootLayout
      currentView={currentView}
      setCurrentView={setCurrentView}
      user={user}
      onSignOut={signOut}
      onSwitchUser={switchUser}
      isSupabaseLive={isSupabaseLive}
    >
      {currentView === 'landing' && (
        <LandingPage
          onNavigate={setCurrentView}
          user={user}
          isSupabaseLive={isSupabaseLive}
        />
      )}
      {currentView === 'login' && (
        <LoginPage
          onNavigate={setCurrentView}
          onSignIn={signIn}
          onSignUp={signUp}
          onSwitchUser={switchUser}
          currentUser={user}
          isSupabaseLive={isSupabaseLive}
        />
      )}
      {currentView === 'dashboard' && (
        <DashboardPage
          user={user}
          onNavigate={setCurrentView}
          isSupabaseLive={isSupabaseLive}
        />
      )}
    </RootLayout>
  );
}

