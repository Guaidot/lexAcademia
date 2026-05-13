import { supabase } from './supabaseClient';

export type AdminNoteStatus = 'open' | 'closed';

export interface AdminNote {
  id: string;
  created_at: string;
  admin_id: string | null;
  admin_email: string | null;
  user_id: string | null;
  payment_id: string | null;
  note: string;
  status: AdminNoteStatus;
}

export const fetchAdminNotesForUser = async (userId: string): Promise<AdminNote[]> => {
  const { data, error } = await supabase
    .from('admin_notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching admin notes:', error);
    return [];
  }

  return data as AdminNote[];
};

export const addAdminNote = async (params: {
  userId?: string | null;
  paymentId?: string | null;
  note: string;
  adminId?: string | null;
  adminEmail?: string | null;
}) => {
  if (!params.note.trim()) return;
  const { error } = await supabase.from('admin_notes').insert({
    admin_id: params.adminId || null,
    admin_email: params.adminEmail || null,
    user_id: params.userId || null,
    payment_id: params.paymentId || null,
    note: params.note.trim(),
    status: 'open',
  });
  if (error) console.error('Error adding admin note:', error);
};

export const toggleAdminNoteStatus = async (id: string, status: AdminNoteStatus) => {
  const { error } = await supabase
    .from('admin_notes')
    .update({ status })
    .eq('id', id);
  if (error) console.error('Error updating admin note status:', error);
};
