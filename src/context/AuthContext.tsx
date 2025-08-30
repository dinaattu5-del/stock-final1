
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
<<<<<<< HEAD
=======
import { showErrorToast } from '../utils/toastUtils';
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

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
<<<<<<< HEAD
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
=======
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting session:", sessionError);
        showErrorToast("Error getting session.");
      }
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
<<<<<<< HEAD
=======
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          showErrorToast("Error fetching user profile.");
        }
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        setProfile(profile);
      }
      setLoading(false);
    };

    getSession();

<<<<<<< HEAD
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const getProfile = async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profile);
        };
        getProfile();
=======
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
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
<<<<<<< HEAD
    if (error) throw error;
=======
    if (error) throw error; // Let the calling component handle this for specific messages
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    return data;
  };

  const loginWithVat = async (vatNumber: string) => {
    // This is a "pretend" login for clients. It does not create a real session.
<<<<<<< HEAD
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('vat_intra', vatNumber)
      .single();

    if (error) throw new Error('Client not found');
    if (client) {
      setProfile({ role: 'client', ...client });
    }
=======
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .eq('vat_intra', vatNumber);

    if (error) {
      console.error("Error fetching client by VAT:", error);
      showErrorToast('An error occurred while searching for the client.');
      return null; // Indicate failure
    }

    if (!clients || clients.length === 0) {
      showErrorToast('No client found with that VAT number.');
      return null; // Indicate no client found
    }

    // If multiple clients have the same VAT, just use the first one.
    // Depending on business logic, you might want to handle this differently.
    const client = clients[0];
    
    setProfile({ role: 'client', ...client });
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    return { client };
  };

  const logout = async () => {
<<<<<<< HEAD
    await supabase.auth.signOut();
=======
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
      showErrorToast("Error logging out.");
    }
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
