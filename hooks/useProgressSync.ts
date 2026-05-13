import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { UserProgress, UserRole } from '../types';
import { fetchProgressFromCloud, syncProgressToCloud } from '../services/supabaseClient';
import { AuthUser } from './useAuthSession';

const PROGRESS_KEY_PREFIX = 'lex_progress_';
const ADMIN_MASTER_EMAIL = 'geiser80@gmail.com';

const isMasterAdmin = (email: string) => email.toLowerCase().trim() === ADMIN_MASTER_EMAIL;

function getDefaultProgress(id: string, name: string, email: string, role: UserRole): UserProgress {
  const actualRole = isMasterAdmin(email) ? 'admin' : role;
  return {
    userId: id,
    name,
    email,
    role: actualRole,
    answeredQuestionIds: [],
    totalAttempts: 0,
    correctAnswers: 0,
    lastStudyDate: new Date().toISOString(),
    activeCourseId: null,
    srsItems: [],
    streakDays: 0,
    weeklyGoal: 3,
    weeklyCount: 0,
    weeklyStartDate: new Date().toISOString(),
    studyDays: [],
    monthlyStudy: {},
    lastCompletedModule: null,
    unlockedCourseIds: ['civil-1', 'constitucional'],
    payments: [],
    lexCoins: 100,
    achievements: []
  };
}

const getProgressFromStorage = (user: AuthUser | null): UserProgress => {
  if (!user) return getDefaultProgress('', '', '', 'user');
  const saved = localStorage.getItem(PROGRESS_KEY_PREFIX + user.id);
  if (saved) return JSON.parse(saved);
  return getDefaultProgress(user.id, user.name, user.email, user.role);
};

interface UseProgressSyncParams {
  user: AuthUser | null;
  onBlockedUser?: () => Promise<void> | void;
}

interface UseProgressSyncResult {
  progress: UserProgress;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
  isSyncing: boolean;
}

export const useProgressSync = ({ user, onBlockedUser }: UseProgressSyncParams): UseProgressSyncResult => {
  const [progress, setProgress] = useState<UserProgress>(() => getProgressFromStorage(user));
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  useEffect(() => {
    setProgress(getProgressFromStorage(user));
    setHasLoadedInitialData(false);
  }, [user?.id]);

  const loadCloudData = useCallback(async (userId: string) => {
    setIsSyncing(true);
    try {
      const cloudData = await fetchProgressFromCloud(userId);
      if (cloudData) {
        if (cloudData.isBlocked) {
          alert('Tu cuenta ha sido bloqueada. Contacta al administrador.');
          if (onBlockedUser) await onBlockedUser();
          setHasLoadedInitialData(true);
          return;
        }

        if (user?.email && isMasterAdmin(user.email)) {
          cloudData.role = 'admin';
        }

        setProgress(cloudData);
        localStorage.setItem(PROGRESS_KEY_PREFIX + userId, JSON.stringify(cloudData));
      }

      setHasLoadedInitialData(true);
    } catch (err) {
      console.error('Error al cargar datos de nube:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [onBlockedUser, user?.email]);

  useEffect(() => {
    if (user && !hasLoadedInitialData) {
      loadCloudData(user.id);
    }
  }, [user, hasLoadedInitialData, loadCloudData]);

  useEffect(() => {
    if (user && hasLoadedInitialData && progress.userId === user.id) {
      localStorage.setItem(PROGRESS_KEY_PREFIX + user.id, JSON.stringify(progress));
      syncProgressToCloud(user.id, progress);
    }
  }, [progress, user, hasLoadedInitialData]);

  return {
    progress,
    setProgress,
    isSyncing
  };
};
