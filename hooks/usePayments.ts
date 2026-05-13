import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Course, PaymentRecord, UserProgress } from '../types';
import { savePaymentToCloud } from '../services/supabaseClient';
import { AuthUser } from './useAuthSession';

interface UsePaymentsParams {
  user: AuthUser | null;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
}

const generatePaymentId = () => crypto.randomUUID().split('-')[0].toUpperCase();

export const usePayments = ({ user, setProgress }: UsePaymentsParams) => {
  const [payingCourse, setPayingCourse] = useState<Course | null>(null);

  const handleConfirmPayment = useCallback(async (receiptData: string) => {
    if (!payingCourse || !user) return;

    const newPayment: PaymentRecord = {
      id: generatePaymentId(),
      userId: user.id,
      userName: user.name,
      courseId: payingCourse.id,
      courseTitle: payingCourse.titulo,
      amount: payingCourse.price || 0,
      date: new Date().toISOString(),
      status: 'pending',
      receiptData
    };

    await savePaymentToCloud(newPayment);
    setProgress(prev => ({ ...prev, payments: [...prev.payments, newPayment] }));
    setPayingCourse(null);
  }, [payingCourse, setProgress, user]);

  return {
    payingCourse,
    setPayingCourse,
    handleConfirmPayment
  };
};
