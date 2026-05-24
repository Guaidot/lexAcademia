import { IUserRepository, IPaymentRepository } from './ports';
import { DomainEvents, APP_EVENTS } from './observer';
import { PaymentRecord, UserProgress } from '../types';

export interface ICommand {
  execute(): Promise<void>;
}

/**
 * Identidad del Administrador Maestro
 */
export const MASTER_ADMIN_EMAIL = "geiser80@gmail.com";

export const isMasterAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  // Validación robusta: minúsculas y sin espacios
  return email.toLowerCase().trim() === MASTER_ADMIN_EMAIL;
};

/**
 * Comando para cambiar el estado de bloqueo de un usuario
 */
export class UpdateUserBlockStatusCommand implements ICommand {
  constructor(
    private repository: IUserRepository,
    private userId: string,
    private blocked: boolean,
    private adminEmail: string
  ) {}

  async execute() {
    await this.repository.setBlockedStatus(this.userId, this.blocked);
    
    DomainEvents.dispatch(APP_EVENTS.USER_BLOCKED, {
      userId: this.userId,
      blocked: this.blocked,
      adminEmail: this.adminEmail
    });
  }
}

/**
 * Comando para resetear el progreso de un usuario
 */
export class ResetUserProgressCommand implements ICommand {
  constructor(
    private repository: IUserRepository,
    private userId: string
  ) {}

  async execute() {
    const progress = await this.repository.fetchProgress(this.userId);
    if (!progress) return;

    const resetData: UserProgress = {
      ...progress,
      answeredQuestionIds: [],
      totalAttempts: 0,
      correctAnswers: 0,
      lexCoins: 0,
      streakDays: 0,
      studyDays: [],
      lastCompletedModule: null
    };

    await this.repository.syncProgress(this.userId, resetData);
  }
}

/**
 * Comando para procesar (Aprobar/Rechazar) un pago
 */
export class ProcessPaymentCommand implements ICommand {
  constructor(
    private paymentRepo: IPaymentRepository,
    private userRepo: IUserRepository,
    private payment: PaymentRecord,
    private status: 'approved' | 'rejected',
    private adminId: string
  ) {}

  private generateToken(courseId: string) {
    return `LEX-${courseId.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }

  async execute() {
    const token = this.status === 'approved' ? this.generateToken(this.payment.courseId) : undefined;
    
    // 1. Actualizar tabla de pagos
    await this.paymentRepo.updateStatus(this.payment.id, this.status, token);

    // 2. Actualizar progreso del usuario
    const progress = await this.userRepo.fetchProgress(this.payment.userId);
    if (progress) {
      const nextProgress: UserProgress = {
        ...progress,
        unlockedCourseIds: this.status === 'approved' 
          ? Array.from(new Set([...(progress.unlockedCourseIds || []), this.payment.courseId]))
          : (progress.unlockedCourseIds || [])
      };
      await this.userRepo.syncProgress(this.payment.userId, nextProgress);
    }

    // 3. Notificar al sistema
    DomainEvents.dispatch(APP_EVENTS.PAYMENT_APPROVED, { ...this.payment, adminId: this.adminId, status: this.status });
  }
}

/**
 * Comando para cambiar el rol de un usuario
 */
export class ChangeUserRoleCommand implements ICommand {
  constructor(
    private repository: IUserRepository,
    private userId: string,
    private role: UserProgress['role'],
    private adminEmail: string
  ) {}

  async execute() {
    await this.repository.updateRole(this.userId, this.role);

    DomainEvents.dispatch(APP_EVENTS.USER_ROLE_CHANGED, {
      userId: this.userId,
      role: this.role,
      adminEmail: this.adminEmail
    });
  }
}