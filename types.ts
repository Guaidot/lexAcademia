
export interface Option {
  id: string;
  texto: string;
}

export interface ModuleCaseOption {
  id: string;
  texto: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ModuleCase {
  titulo: string;
  descripcion: string;
  documento: string;
  pregunta: string;
  opciones: ModuleCaseOption[];
}

export interface CourseModule {
  id: string;
  titulo: string;
  tema: string;
  lectura: string;
  caso: ModuleCase;
  questionIds: number[];
  isPremium?: boolean;
}

export interface LastCompletedModule {
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  completedAt: string;
}

export interface Question {
  id: number;
  dificultad: 'Fácil' | 'Media' | 'Alta';
  enunciado: string;
  opciones: Option[];
  respuestaCorrecta: string;
  feedback: string;
  tema: string;
  isSRS?: boolean;
  srsLevel?: number;
}

export interface Course {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  preguntas: Question[];
  modules?: CourseModule[];
  progreso: number;
  isPremium?: boolean;
  price?: number; 
}

export interface Achievement {
  id: string;
  titulo: string;
  icono: string;
  descripcion: string;
  unlockedAt: string;
}

export interface SRSItem {
  questionId: number;
  courseId: string;
  nextReviewDate: string;
  attempts: number;
  level: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  receiptData?: string;
  token?: string;
}

export type UserRole = 'user' | 'admin';

export interface UserProgress {
  userId: string;
  name: string;
  email: string;
  password?: string; // En una app real esto estaría hasheado en el servidor
  role: UserRole;
  isBlocked?: boolean;
  answeredQuestionIds: number[];
  totalAttempts: number;
  correctAnswers: number;
  lastStudyDate: string;
  streakDays?: number;
  weeklyGoal?: number;
  weeklyCount?: number;
  weeklyStartDate?: string;
  studyDays?: string[];
  monthlyStudy?: Record<string, number>;
  lastCompletedModule?: LastCompletedModule | null;
  activeCourseId: string | null;
  srsItems: SRSItem[];
  unlockedCourseIds: string[];
  payments: PaymentRecord[];
  lexCoins: number;
  achievements: Achievement[];
}
