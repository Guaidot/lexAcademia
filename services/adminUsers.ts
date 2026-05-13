import { UserProgress } from '../types';
import { fetchProgressFromCloud, syncProgressToCloud } from './supabaseClient';

const updateUserProgress = async (userId: string, updater: (p: UserProgress) => UserProgress) => {
  const progress = await fetchProgressFromCloud(userId);
  if (!progress) return;
  const next = updater(progress);
  await syncProgressToCloud(userId, next);
};

export const setUserBlocked = async (userId: string, blocked: boolean) => {
  await updateUserProgress(userId, (p) => ({
    ...p,
    isBlocked: blocked
  }));
};

export const assignCourseToUser = async (userId: string, courseId: string) => {
  await updateUserProgress(userId, (p) => ({
    ...p,
    unlockedCourseIds: Array.from(new Set([...(p.unlockedCourseIds || []), courseId]))
  }));
};

export const resetUserProgress = async (userId: string) => {
  await updateUserProgress(userId, (p) => ({
    ...p,
    answeredQuestionIds: [],
    totalAttempts: 0,
    correctAnswers: 0,
    lastStudyDate: new Date().toISOString(),
    streakDays: 0,
    weeklyCount: 0,
    weeklyStartDate: new Date().toISOString(),
    studyDays: [],
    monthlyStudy: {},
    lastCompletedModule: null,
    activeCourseId: null,
    srsItems: [],
    lexCoins: 0
  }));
};

export const setUserRole = async (userId: string, role: UserProgress['role']) => {
  await updateUserProgress(userId, (p) => ({
    ...p,
    role
  }));
};

