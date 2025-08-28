
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { showErrorToast } from '../utils/toastUtils';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<any>;
  loginWithVat: (vatNumber: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting session:", sessionError);
        showErrorToast("Error getting session.");
      }
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          showErrorToast("Error fetching user profile.");
        }
        setProfile(profile);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profileError) {
          console.error("Error fetching profile on auth state change:", profileError);
          showErrorToast("Error fetching user profile.");
        }
        setProfile(profile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loginWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error; // Let the calling component handle this for specific messages
    return data;
  };

  const loginWithVat = async (vatNumber: string) => {
    // This is a "pretend" login for clients. It does not create a real session.
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('vat_intra', vatNumber)
      .single();

    if (error) {
      showErrorToast('Client not found or an error occurred.');
      return null; // Indicate failure
    }
    if (client) {
      setProfile({ role: 'client', ...client });
    }
    return { client };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
      showErrorToast("Error logging out.");
    }
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        loginWithPassword,
        loginWithVat,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
