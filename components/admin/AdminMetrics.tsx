import React from 'react';

interface AdminMetricsProps {
  revenue: number;
  activeLicences: number;
  totalUsers: number;
  pendingCount: number;
}

export const AdminMetrics: React.FC<AdminMetricsProps> = ({ revenue, activeLicences, totalUsers, pendingCount }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-slideUp">
    <StatCard label="Recaudacion" value={`$${revenue}`} color="text-slate-900" icon="fa-sack-dollar" />
    <StatCard label="Licencias" value={activeLicences} color="text-indigo-600" icon="fa-id-card-clip" />
    <StatCard label="Usuarios" value={totalUsers} color="text-amber-600" icon="fa-users" />
    <StatCard label="Pendientes" value={pendingCount} color="text-rose-600" icon="fa-clock" />
  </div>
);

const StatCard = ({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) => (
  <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-xl border border-slate-50 flex flex-col justify-between group hover:border-amber-200 transition-all">
    <div className="flex justify-between items-start mb-2 sm:mb-4">
      <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-amber-500 transition-all">
        <i className={`fa-solid ${icon} text-[10px] sm:text-base`}></i>
      </div>
    </div>
    <p className={`text-xl sm:text-4xl font-black ${color} tracking-tighter leading-none`}>{value}</p>
  </div>
);
