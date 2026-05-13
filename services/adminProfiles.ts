import { supabase } from './supabaseClient';

export const fetchAdminProfiles = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
      console.error('Error loading profiles:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error loading profiles:', err);
    return [];
  }
};
