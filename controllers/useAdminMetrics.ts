import { useMemo } from 'react';
import { PaymentRecord } from '../types';
import { computeAdminMetrics } from '../services/adminMetrics';

export const useAdminMetrics = (profiles: any[], payments: PaymentRecord[]) => {
  const metrics = useMemo(() => computeAdminMetrics(profiles, payments), [profiles, payments]);

  const formatted = {
    ...metrics,
    revenueLabel: `$${metrics.revenue}`,
    revenueCurrentMonthLabel: `$${metrics.revenueCurrentMonth}`,
    revenuePrevMonthLabel: `$${metrics.revenuePrevMonth}`,
    revenueDeltaLabel: `${metrics.revenueDelta >= 0 ? '+' : ''}${metrics.revenueDelta}%`
  };

  return formatted;
};
