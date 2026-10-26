import { useState, useEffect } from 'react';
import { User } from '../types/index.ts';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';
import { DEMO_USERS } from '../lib/constants.ts';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(false);

  useEffect(() => {
    setIsSupabaseLive(isSupabaseConfigured());
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user as unknown as User);
        } else {
          setUser(DEMO_USERS[0]);
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        setUser(DEMO_USERS[0]);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await supabase.auth.signInWithPassword({ email });
      if (res.data?.user) {
        setUser(res.data.user as unknown as User);
        return { success: true };
      }
      return { success: false, error: 'User not found' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Authentication failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, fullName: string) => {
    setIsLoading(true);
    try {
      const res = await supabase.auth.signUp({ email, fullName });
      if (res.data?.user) {
        setUser(res.data.user as unknown as User);
        return { success: true };
      }
      return { success: false, error: 'Sign up failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  const switchUser = (selectedUser: User) => {
    setUser(selectedUser);
    localStorage.setItem('app_active_user', JSON.stringify(selectedUser));
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    isSupabaseLive,
    signIn,
    signUp,
    signOut,
    switchUser,
  };
}
