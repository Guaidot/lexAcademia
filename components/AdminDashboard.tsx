import React, { useEffect, useState } from 'react';
import { fetchAdminProfiles } from '../services/adminProfiles';
import { fetchAdminPayments } from '../services/adminPayments';
import { PaymentRecord } from '../types';
import { useAdminMetrics } from '../controllers/useAdminMetrics';

export const AdminDashboard: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        const [profilesData, cloudPayments] = await Promise.all([
          fetchAdminProfiles(),
          fetchAdminPayments()
        ]);
        setProfiles(profilesData || []);
        setPayments(cloudPayments || []);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, []);

  const stats = useAdminMetrics(profiles, payments);

  if (loading) {
    return (
      <div className="p-10 sm:p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Cargando actividad...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-10 animate-fadeIn">
      <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Actividad de usuarios</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">Panel Ejecutivo</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Usuarios totales" value={stats.totalUsers} icon="fa-users" color="text-slate-900" />
        <StatCard label="Activos hoy" value={stats.activeToday} icon="fa-bolt" color="text-emerald-600" />
        <StatCard label="Activos 7 dias" value={stats.active7d} icon="fa-calendar-check" color="text-indigo-600" />
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Ingresos" value={stats.revenueLabel} icon="fa-sack-dollar" color="text-slate-900" />
        <StatCard label="Pagos pendientes" value={stats.pendingCount} icon="fa-receipt" color="text-amber-600" />
        <StatCard label="Licencias activas" value={stats.approvedCount} icon="fa-id-card-clip" color="text-emerald-600" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8 lg:col-span-1">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ingresos del mes</p>
          <div className="flex items-baseline gap-3 mt-2">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.revenueCurrentMonthLabel}</p>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${stats.revenueDelta >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {stats.revenueDeltaLabel}
            </span>
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">
            Mes anterior: {stats.revenuePrevMonthLabel}
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-widest">Pagos por semana</h3>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ultimas 6</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {stats.lastWeeks.map((week, idx) => {
              const max = Math.max(...stats.lastWeeks.map(w => w.approvedCount + w.pendingCount), 1);
              const total = week.approvedCount + week.pendingCount;
              const height = Math.round((total / max) * 100);
              const approvedHeight = total > 0 ? Math.round((week.approvedCount / total) * 100) : 0;
              const pendingHeight = total > 0 ? 100 - approvedHeight : 0;
              const label = `${week.start.getDate()}/${week.start.getMonth() + 1}`;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-50 rounded-xl border border-slate-100 h-full flex items-end">
                    <div
                      className="w-full rounded-xl transition-all overflow-hidden"
                      style={{ height: `${height}%` }}
                      title={`${week.approvedCount} aprobados / ${week.pendingCount} pendientes`}
                    >
                      <div className="w-full h-full flex flex-col justify-end">
                        <div className="w-full bg-amber-300" style={{ height: `${pendingHeight}%` }}></div>
                        <div className="w-full bg-emerald-400" style={{ height: `${approvedHeight}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-emerald-400"></span>
              Aprobados
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-amber-300"></span>
              Pendientes
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-8">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
          <i className="fa-solid fa-clock-rotate-left text-slate-300"></i>
          Ultimas sesiones
        </h3>
        {stats.recentSessions.length === 0 ? (
          <p className="text-slate-500 text-sm">Sin actividad reciente.</p>
        ) : (
          <div className="space-y-3">
            {stats.recentSessions.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div>
                  <p className="text-sm font-black text-slate-900">{p.name || 'Usuario'}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{p.email || 'sin correo'}</p>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {new Date(p.lastStudyDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => (
  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-lg">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
        <i className={`fa-solid ${icon}`}></i>
      </div>
    </div>
    <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
  </div>
);
