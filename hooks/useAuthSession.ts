import { useCallback, useEffect, useState } from 'react';
import { UserRole } from '../types';
import { signOutUser, supabase } from '../services/supabaseClient';

export const STORAGE_KEY = 'lex_academia_v7_auth';
const ADMIN_MASTER_EMAIL = 'geiser80@gmail.com';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const isMasterAdmin = (email: string) => email.toLowerCase().trim() === ADMIN_MASTER_EMAIL;

export const useAuthSession = () => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = useCallback((id: string, name: string, email: string, role: UserRole) => {
    const actualRole = isMasterAdmin(email) ? 'admin' : role;
    const nextUser: AuthUser = { id, name, email, role: actualRole };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const handleLogout = useCallback(async () => {
    await signOutUser();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const email = session.user.email!;
        handleLogin(
          session.user.id,
          session.user.user_metadata.full_name || 'Estudiante',
          email,
          isMasterAdmin(email) ? 'admin' : 'user'
        );
      }
    };

    checkSession();
  }, [handleLogin]);

  return {
    user,
    setUser,
    handleLogin,
    handleLogout,
    isMasterAdmin
  };
};
