import { UserProgress } from '../types';
import { SupabaseUserAdapter } from './supabaseClient';
import { UpdateUserBlockStatusCommand, ResetUserProgressCommand, ChangeUserRoleCommand } from './commands';

// Instanciamos el adaptador (infraestructura)
const userRepo = new SupabaseUserAdapter();

export const setUserBlocked = async (userId: string, blocked: boolean) => {
  const command = new UpdateUserBlockStatusCommand(userRepo, userId, blocked, 'system-admin');
  await command.execute();
};

export const assignCourseToUser = async (userId: string, courseId: string) => {
  // Podrías crear un AssignCourseCommand similar
  const progress = await userRepo.fetchProgress(userId);
  if (progress) {
    await userRepo.syncProgress(userId, {
      ...progress,
      unlockedCourseIds: Array.from(new Set([...(progress.unlockedCourseIds || []), courseId]))
    });
  }
};

export const resetUserProgress = async (userId: string) => {
  const command = new ResetUserProgressCommand(userRepo, userId);
  await command.execute();
};

export const setUserRole = async (userId: string, role: UserProgress['role']) => {
  const command = new ChangeUserRoleCommand(userRepo, userId, role, 'system-admin');
  await command.execute();
};
