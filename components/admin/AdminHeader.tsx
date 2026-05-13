import React from 'react';

interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title = 'Panel de Administracion' }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Servidor Supabase Activo</span>
    </div>
    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">{title}</h2>
  </div>
);
