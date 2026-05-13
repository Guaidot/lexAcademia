import { useMemo, useState } from 'react';
import { PaymentRecord } from '../types';

export type PaymentStatusFilter = 'all' | 'pending' | 'approved' | 'rejected';
export type PaymentSort = 'recent' | 'amount-high' | 'amount-low';

export const useAdminPayments = (payments: PaymentRecord[]) => {
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<PaymentSort>('recent');

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = payments.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (!query) return true;
      const haystack = `${p.userName} ${p.userId} ${p.courseTitle} ${p.courseId} ${p.id}`.toLowerCase();
      return haystack.includes(query);
    });

    const sorted = [...base].sort((a, b) => {
      if (sortBy === 'amount-high') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'amount-low') return (a.amount || 0) - (b.amount || 0);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted;
  }, [payments, statusFilter, search, sortBy]);

  return {
    filteredPayments,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sortBy,
    setSortBy
  };
};
