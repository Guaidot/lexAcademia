import { supabase } from './supabaseClient';

export type AdminActionType =
  | 'payment_approved'
  | 'payment_rejected'
  | 'user_blocked'
  | 'user_unblocked'
  | 'user_reset_progress'
  | 'user_assigned_course'
  | 'user_role_changed';

export interface AdminAuditEntry {
  id: string;
  created_at: string;
  admin_id: string | null;
  admin_email: string | null;
  action: AdminActionType;
  target_user_id?: string | null;
  target_payment_id?: string | null;
  detail?: string | null;
}

export const logAdminAction = async (params: {
  action: AdminActionType;
  adminId?: string | null;
  adminEmail?: string | null;
  targetUserId?: string | null;
  targetPaymentId?: string | null;
  detail?: string | null;
}) => {
  try {
    const { error } = await supabase.from('admin_audit_log').insert({
      admin_id: params.adminId || null,
      admin_email: params.adminEmail || null,
      action: params.action,
      target_user_id: params.targetUserId || null,
      target_payment_id: params.targetPaymentId || null,
      detail: params.detail || null,
    });
    if (error) console.error('Error logging admin action:', error);
  } catch (err) {
    console.error('Unexpected error logging admin action:', err);
  }
};

export const fetchRecentAuditLog = async (limit = 50): Promise<AdminAuditEntry[]> => {
  const { data, error } = await supabase
    .from('admin_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error('Error fetching admin audit log:', error);
    return [];
  }

  return data as AdminAuditEntry[];
};
