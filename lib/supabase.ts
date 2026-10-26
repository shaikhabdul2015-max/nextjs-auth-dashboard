import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DEMO_USERS, INITIAL_PROJECTS } from './constants.ts';
import { User, Project } from '../types/index.ts';

// Environment variable retrieval
const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 10
  );
};

// Fallback / In-Memory Mock Store for zero-setup execution
const STORAGE_KEYS = {
  USER: 'app_active_user',
  PROJECTS: 'app_projects_store',
};

const getStoredUser = (): User | null => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.USER);
    return item ? JSON.parse(item) : DEMO_USERS[0];
  } catch {
    return DEMO_USERS[0];
  }
};

const setStoredUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {
    console.error('Failed to set stored user:', e);
  }
};

export const getStoredProjects = (): Project[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!item) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_PROJECTS;
  }
};

export const saveStoredProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to persist projects:', e);
  }
};

// Real Supabase client if configured
let realClient: SupabaseClient | null = null;
if (isSupabaseConfigured()) {
  try {
    realClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Could not initialize real Supabase client, falling back to local client:', err);
  }
}

/**
 * Universal client offering auth and data methods whether using real Supabase or local persistent fallback.
 */
export const supabase = {
  isConfigured: isSupabaseConfigured(),
  rawClient: realClient,

  auth: {
    getUser: async () => {
      if (realClient) {
        return realClient.auth.getUser();
      }
      return { data: { user: getStoredUser() }, error: null };
    },

    signInWithPassword: async ({ email }: { email: string; password?: string }) => {
      if (realClient) {
        return realClient.auth.signInWithPassword({ email, password: 'password' });
      }
      // Check demo users or construct one
      const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
        id: `user-${Date.now()}`,
        email,
        fullName: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        role: 'editor' as const,
        createdAt: new Date().toISOString(),
        organization: 'Acme Technologies',
      };
      setStoredUser(matched);
      return { data: { user: matched, session: { access_token: 'demo-token-123' } }, error: null };
    },

    signUp: async ({ email, fullName }: { email: string; password?: string; fullName?: string }) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        fullName: fullName || email.split('@')[0],
        role: 'editor',
        createdAt: new Date().toISOString(),
        organization: 'My Workspace',
      };
      setStoredUser(newUser);
      return { data: { user: newUser, session: { access_token: 'demo-token-123' } }, error: null };
    },

    signOut: async () => {
      if (realClient) {
        await realClient.auth.signOut();
      }
      setStoredUser(null);
      return { error: null };
    },
  },

  from: (tableName: string) => {
    return {
      select: async () => {
        if (realClient) {
          return realClient.from(tableName).select('*');
        }
        if (tableName === 'projects') {
          return { data: getStoredProjects(), error: null };
        }
        return { data: [], error: null };
      },
      insert: async (records: any[]) => {
        if (realClient) {
          return realClient.from(tableName).insert(records);
        }
        if (tableName === 'projects') {
          const current = getStoredProjects();
          const updated = [...records, ...current];
          saveStoredProjects(updated);
          return { data: updated, error: null };
        }
        return { data: records, error: null };
      },
      delete: () => ({
        eq: async (column: string, val: any) => {
          if (realClient) {
            return realClient.from(tableName).delete().eq(column, val);
          }
          if (tableName === 'projects' && column === 'id') {
            const current = getStoredProjects();
            const filtered = current.filter(p => p.id !== val);
            saveStoredProjects(filtered);
            return { data: filtered, error: null };
          }
          return { data: null, error: null };
        },
      }),
    };
  },
};
