import React from 'react';

export type AdminTab = 'metrics' | 'payments' | 'users' | 'audit';

interface AdminTabsProps {
  activeTab: AdminTab;
  pendingCount: number;
  onChange: (tab: AdminTab) => void;
}

export const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, pendingCount, onChange }) => (
  <div className="flex bg-white p-1.5 rounded-2xl sm:rounded-[2rem] shadow-xl border border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
    <div className="flex gap-1 min-w-full sm:min-w-0">
      {[
        { id: 'metrics', label: 'Dashboard', icon: 'fa-chart-pie' },
        { id: 'payments', label: `Pagos (${pendingCount})`, icon: 'fa-receipt' },
        { id: 'users', label: 'Usuarios', icon: 'fa-users-gear' },
        { id: 'audit', label: 'Auditoría', icon: 'fa-clipboard-list' }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id as AdminTab)}
          className={`flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
            activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <i className={`fa-solid ${tab.icon} text-[10px] sm:text-xs`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);
