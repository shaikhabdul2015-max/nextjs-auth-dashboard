import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  Mail,
  User as UserIcon,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { DEMO_USERS } from '../../lib/constants.ts';
import { User, AppView } from '../../types/index.ts';

interface LoginPageProps {
  onNavigate: (view: AppView) => void;
  onSignIn: (email: string) => Promise<{ success: boolean; error?: string }>;
  onSignUp: (email: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  onSwitchUser: (user: User) => void;
  currentUser: User | null;
  isSupabaseLive: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onSignIn,
  onSignUp,
  onSwitchUser,
  currentUser,
  isSupabaseLive,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        const res = await onSignIn(email);
        if (res.success) {
          onNavigate('dashboard');
        } else {
          setErrorMsg(res.error || 'Unable to sign in.');
        }
      } else {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }
        const res = await onSignUp(email, fullName);
        if (res.success) {
          onNavigate('dashboard');
        } else {
          setErrorMsg(res.error || 'Unable to create account.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (demoUser: User) => {
    onSwitchUser(demoUser);
    onNavigate('dashboard');
  };

  return (
    <div id="login-page-root" className="min-h-[calc(100vh-4rem)] bg-neutral-50/60 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header Box */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-xs">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {mode === 'signin' ? 'Welcome to Workspace' : 'Create Workspace Account'}
          </h1>
          <p className="text-xs text-neutral-500">
            {mode === 'signin'
              ? 'Authenticate to access project analytics, tasks, and team resources.'
              : 'Set up your developer profile with role privileges.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-neutral-100 p-1">
            <button
              id="auth-tab-signin"
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
              }}
              className={`rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              className={`rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {mode === 'signup' && (
              <Input
                id="signup-fullname-input"
                label="Full Name"
                placeholder="e.g. Jordan Hayes"
                leftIcon={<UserIcon className="h-4 w-4" />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}

            <Input
              id="auth-email-input"
              label="Work Email"
              type="email"
              placeholder="you@company.com"
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="auth-password-input"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={<KeyRound className="h-4 w-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                mode === 'signin'
                  ? 'Demo password verification accepts any string'
                  : 'Must be at least 8 characters'
              }
              required
            />

            <Button
              id="auth-submit-btn"
              type="submit"
              className="w-full"
              size="md"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {mode === 'signin' ? 'Sign In to Workspace' : 'Complete Registration'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-white px-2 text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
              Instant 1-Click Personas
            </span>
          </div>

          {/* 1-Click Demo Logins */}
          <div className="space-y-2">
            {DEMO_USERS.map((demo) => (
              <button
                key={demo.id}
                id={`quick-login-${demo.id}`}
                type="button"
                onClick={() => handleQuickLogin(demo)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 hover:border-neutral-300 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={demo.avatarUrl}
                    alt={demo.fullName}
                    className="h-7 w-7 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 leading-tight">
                      {demo.fullName}
                    </p>
                    <p className="text-[10px] text-neutral-500 capitalize">{demo.role} Role</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">
                  Select
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Supabase backend connection information card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 space-y-2 shadow-2xs">
          <button
            id="toggle-supabase-guide"
            onClick={() => setShowConfigGuide(!showConfigGuide)}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-800 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-neutral-600" />
              <span>Supabase Integration Details</span>
            </div>
            <span className="text-[11px] text-neutral-500">
              {showConfigGuide ? 'Hide' : 'Inspect'}
            </span>
          </button>

          {showConfigGuide && (
            <div className="pt-2 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
              <p className="leading-relaxed">
                This project uses <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px]">lib/supabase.ts</code>.
                To connect a live Supabase project, provide:
              </p>
              <div className="font-mono text-[11px] bg-neutral-900 text-neutral-100 p-2.5 rounded-md space-y-1">
                <p>VITE_SUPABASE_URL=https://xyz.supabase.co</p>
                <p>VITE_SUPABASE_ANON_KEY=eyJhbGciOi...</p>
              </div>
              <p className="text-[11px] text-neutral-500">
                In the meantime, the built-in storage persistence layer handles all CRUD, sessions, and roles seamlessly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
