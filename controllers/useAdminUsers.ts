import { useMemo, useState } from 'react';
import { UserProgress } from '../types';

export type UserRoleFilter = 'all' | 'admin' | 'user';
export type UserSort = 'recent' | 'name-asc' | 'lexcoins-high';

export const useAdminUsers = (profiles: any[]) => {
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<UserSort>('recent');

  const users = useMemo(() => profiles.map(p => p.progress_data).filter(Boolean) as UserProgress[], [profiles]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = users.filter(u => {
      if (roleFilter !== 'all' && (u.role || 'user') !== roleFilter) return false;
      if (!query) return true;
      const haystack = `${u.name} ${u.email}`.toLowerCase();
      return haystack.includes(query);
    });

    const sorted = [...base].sort((a, b) => {
      if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'lexcoins-high') return (b.lexCoins || 0) - (a.lexCoins || 0);
      const aDate = a.lastStudyDate ? new Date(a.lastStudyDate).getTime() : 0;
      const bDate = b.lastStudyDate ? new Date(b.lastStudyDate).getTime() : 0;
      return bDate - aDate;
    });

    return sorted;
  }, [users, roleFilter, search, sortBy]);

  return {
    filteredUsers,
    roleFilter,
    setRoleFilter,
    search,
    setSearch,
    sortBy,
    setSortBy
  };
};
