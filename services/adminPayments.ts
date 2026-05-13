import { PaymentRecord, UserProgress } from '../types';
import { fetchProgressFromCloud, getAllPaymentsFromCloud, syncProgressToCloud, updatePaymentStatusInCloud } from './supabaseClient';

export const fetchAdminPayments = async () => {
  return getAllPaymentsFromCloud();
};

const generateToken = (courseId: string) => {
  return `LEX-${courseId.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const updateUserProgressPayment = async (payment: PaymentRecord, status: 'approved' | 'rejected', token?: string) => {
  const progress = await fetchProgressFromCloud(payment.userId);
  if (!progress) return;

  const updatedPayments = Array.isArray(progress.payments) ? [...progress.payments] : [];
  const paymentIndex = updatedPayments.findIndex((p: PaymentRecord) => p.id === payment.id);
  const nextPayment: PaymentRecord = {
    ...payment,
    status,
    token: token || payment.token,
  };

  if (paymentIndex >= 0) {
    updatedPayments[paymentIndex] = nextPayment;
  } else {
    updatedPayments.push(nextPayment);
  }

  const updatedProgress: UserProgress = {
    ...progress,
    payments: updatedPayments,
    unlockedCourseIds: status === 'approved'
      ? Array.from(new Set([...(progress.unlockedCourseIds || []), payment.courseId]))
      : (progress.unlockedCourseIds || [])
  };

  await syncProgressToCloud(payment.userId, updatedProgress);
};

export const approveAdminPayment = async (payment: PaymentRecord) => {
  const token = generateToken(payment.courseId);
  await updatePaymentStatusInCloud(payment.id, 'approved', token);
  await updateUserProgressPayment(payment, 'approved', token);
};

export const rejectAdminPayment = async (payment: PaymentRecord) => {
  await updatePaymentStatusInCloud(payment.id, 'rejected');
  await updateUserProgressPayment(payment, 'rejected');
};
