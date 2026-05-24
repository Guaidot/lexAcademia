import { UserProgress, PaymentRecord } from '../types';

export interface IUserRepository {
  fetchProgress(userId: string): Promise<UserProgress | null>;
  syncProgress(userId: string, progress: UserProgress): Promise<void>;
  updateRole(userId: string, role: string): Promise<void>;
  setBlockedStatus(userId: string, blocked: boolean): Promise<void>;
}

export interface IPaymentRepository {
  getAllPayments(): Promise<PaymentRecord[]>;
  updateStatus(paymentId: string, status: string, token?: string): Promise<void>;
  savePayment(payment: Partial<PaymentRecord>): Promise<void>;
}

export interface IAIService {
  getExplanation(prompt: string, context: string): Promise<string>;
  generateQuestions(subject: string): Promise<any[]>;
  generateSpeech(text: string): Promise<string | null>;
  generateCrimeSceneData(): Promise<any>;
}