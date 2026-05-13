import { PaymentRecord, UserProgress } from '../types';

export interface AdminMetrics {
  totalUsers: number;
  activeToday: number;
  active7d: number;
  recentSessions: UserProgress[];
  revenue: number;
  pendingCount: number;
  approvedCount: number;
  revenueCurrentMonth: number;
  revenuePrevMonth: number;
  revenueDelta: number;
  lastWeeks: Array<{
    start: Date;
    end: Date;
    approvedCount: number;
    pendingCount: number;
  }>;
}

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

const weekStart = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const computeAdminMetrics = (profiles: any[], payments: PaymentRecord[]): AdminMetrics => {
  const items: UserProgress[] = profiles.map(p => p.progress_data).filter(Boolean);
  const totalUsers = items.length;
  const today = new Date();
  const todayKey = today.toDateString();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const activeToday = items.filter(p => p.lastStudyDate && new Date(p.lastStudyDate).toDateString() === todayKey).length;
  const active7d = items.filter(p => p.lastStudyDate && new Date(p.lastStudyDate) >= sevenDaysAgo).length;

  const approved = payments.filter(p => p.status === 'approved');
  const pending = payments.filter(p => p.status === 'pending');
  const revenue = approved.reduce((acc, p) => acc + (p.amount || 0), 0);

  const currentMonthKey = monthKey(today);
  const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthKey = monthKey(prevMonthDate);

  const revenueCurrentMonth = approved
    .filter(p => p.date && monthKey(new Date(p.date)) === currentMonthKey)
    .reduce((acc, p) => acc + (p.amount || 0), 0);
  const revenuePrevMonth = approved
    .filter(p => p.date && monthKey(new Date(p.date)) === prevMonthKey)
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  const revenueDelta = revenuePrevMonth > 0
    ? Math.round(((revenueCurrentMonth - revenuePrevMonth) / revenuePrevMonth) * 100)
    : revenueCurrentMonth > 0 ? 100 : 0;

  const lastWeeks = Array.from({ length: 6 }, (_, i) => {
    const start = weekStart(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i * 7));
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const inWeek = (p: PaymentRecord) => {
      if (!p.date) return false;
      const dt = new Date(p.date);
      return dt >= start && dt <= end;
    };
    const approvedCount = payments.filter(p => p.status === 'approved' && inWeek(p)).length;
    const pendingCount = payments.filter(p => p.status === 'pending' && inWeek(p)).length;
    return { start, end, approvedCount, pendingCount };
  }).reverse();

  const recentSessions = [...items]
    .filter(p => p.lastStudyDate)
    .sort((a, b) => new Date(b.lastStudyDate).getTime() - new Date(a.lastStudyDate).getTime())
    .slice(0, 6);

  return {
    totalUsers,
    activeToday,
    active7d,
    recentSessions,
    revenue,
    pendingCount: pending.length,
    approvedCount: approved.length,
    revenueCurrentMonth,
    revenuePrevMonth,
    revenueDelta,
    lastWeeks
  };
};
