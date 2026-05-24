
import { createClient } from '@supabase/supabase-js';

// Credenciales proporcionadas por el usuario
const supabaseUrl = 'https://tcrlgheeglwxdmslvxlc.supabase.co';
const supabaseAnonKey = 'sb_publishable_kPOVHSH5gB1GEnX6yYSUlA_TOOOQE8Z';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Autenticación ---

export const signUpUser = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });
  return { data, error };
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });
  return { data, error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });
  return { data, error };
};

export const getRecoverySessionFromUrl = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

export const updateUserPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// --- Gestión de Progreso ---

export const syncProgressToCloud = async (userId: string, progress: any) => {
  if (!supabase || !userId) return;
  const { error } = await supabase
    .from('profiles')
    .upsert({ 
      user_id: userId, 
      progress_data: progress,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  if (error) console.error("Error al sincronizar perfil:", error);
};

export const fetchProgressFromCloud = async (userId: string) => {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('progress_data')
    .eq('user_id', userId)
    .single();
  return error ? null : data.progress_data;
};

// --- Gestión de Pagos ---

export const savePaymentToCloud = async (payment: any) => {
  const { error } = await supabase
    .from('payments')
    .insert([{
      id: payment.id,
      user_id: payment.userId,
      user_name: payment.userName,
      course_id: payment.courseId,
      course_title: payment.courseTitle,
      amount: payment.amount,
      status: payment.status,
      receipt_data: payment.receiptData,
      created_at: payment.date
    }]);
  if (error) console.error("Error al registrar pago en BD:", error);
};

export const getAllPaymentsFromCloud = async () => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data.map(p => ({
    id: p.id,
    userId: p.user_id,
    userName: p.user_name,
    courseId: p.course_id,
    courseTitle: p.course_title,
    amount: p.amount,
    status: p.status,
    receiptData: p.receipt_data,
    token: p.token,
    date: p.created_at
  }));
};

export const updatePaymentStatusInCloud = async (paymentId: string, status: string, token?: string) => {
  const { error } = await supabase
    .from('payments')
    .update({ status, token })
    .eq('id', paymentId);
  if (error) console.error("Error al actualizar estatus de pago:", error);
};
