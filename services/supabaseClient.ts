import { createClient } from '@supabase/supabase-js';
import { IUserRepository, IPaymentRepository } from './ports';

// Credenciales proporcionadas por el usuario
const supabaseUrl = 'https://tcrlgheeglwxdmslvxlc.supabase.co';
const supabaseAnonKey = 'sb_publishable_kPOVHSH5gB1GEnX6yYSUlA_TOOOQE8Z';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Implementación de Repositorios (Adapters)
export class SupabaseUserAdapter implements IUserRepository {
  async fetchProgress(userId: string) {
    const { data } = await supabase.from('profiles').select('progress_data').eq('user_id', userId).single();
    return data?.progress_data || null;
  }

  async syncProgress(userId: string, progress: any) {
    await supabase.from('profiles').upsert({ 
      user_id: userId, progress_data: progress, updated_at: new Date().toISOString() 
    }, { onConflict: 'user_id' });
  }

  async getAllProfiles() {
    const { data } = await supabase.from('profiles').select('*');
    return data || [];
  }

  async updateRole(userId: string, role: string) {
    const progress = await this.fetchProgress(userId);
    if (progress) await this.syncProgress(userId, { ...progress, role });
  }

  async setBlockedStatus(userId: string, blocked: boolean) {
    const progress = await this.fetchProgress(userId);
    if (progress) await this.syncProgress(userId, { ...progress, isBlocked: blocked });
  }
}

export class SupabasePaymentAdapter implements IPaymentRepository {
  async savePayment(payment: any) {
    await supabase.from('payments').insert([{
      id: payment.id, user_id: payment.userId, user_name: payment.userName,
      course_id: payment.courseId, course_title: payment.courseTitle,
      amount: payment.amount, status: payment.status, 
      receipt_data: payment.receiptData, created_at: payment.date
    }]);
  }

  async getAllPayments() {
    const { data } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
    return (data || []).map(p => ({
      id: p.id, userId: p.user_id, userName: p.user_name,
      courseId: p.course_id, courseTitle: p.course_title,
      amount: p.amount, status: p.status, receiptData: p.receipt_data,
      token: p.token, date: p.created_at
    }));
  }

  async updateStatus(paymentId: string, status: string, token?: string) {
    await supabase.from('payments').update({ status, token }).eq('id', paymentId);
  }
}
