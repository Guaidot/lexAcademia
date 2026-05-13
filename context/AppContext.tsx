import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react';
import { UserProgress } from '../types';
import { AuthUser } from '../hooks/useAuthSession';

export interface AppContextValue {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  progress: UserProgress;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSyncing: boolean;
  onLogout?: () => Promise<void> | void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  value: AppContextValue;
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};

export const useOptionalAppContext = () => {
  return useContext(AppContext);
};
