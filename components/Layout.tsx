
import React from 'react';
import { UserRole } from '../types';
import { useOptionalAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  globalProgress?: number;
  lexCoins?: number;
  userName?: string;
  userEmail?: string;
  userRole?: UserRole;
  onLogout?: () => void;
  dueCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, lexCoins = 0, userName = '', userEmail = '', userRole = 'user', onLogout, dueCount = 0 }) => {
  const appCtx = useOptionalAppContext();

  const resolvedActiveTab = activeTab ?? appCtx?.activeTab ?? 'dashboard';
  const resolvedSetActiveTab = setActiveTab ?? ((tab: string) => appCtx?.setActiveTab(tab));
  const resolvedLexCoins = lexCoins ?? appCtx?.progress?.lexCoins ?? 0;
  const resolvedUserName = userName || appCtx?.progress?.name || appCtx?.user?.name || '';
  const resolvedUserEmail = userEmail || appCtx?.user?.email || '';
  const resolvedUserRole = userRole || appCtx?.user?.role || 'user';
  const resolvedLogout = onLogout ?? appCtx?.onLogout;

  const avatarSeed = localStorage.getItem(`lex_avatar_${resolvedUserEmail}`) || localStorage.getItem(`lex_avatar_${resolvedUserName}`) || resolvedUserName;
  
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: 'fa-house-chimney' },
    { id: 'courses', label: 'Materias', icon: 'fa-book-bookmark' },
    { id: 'expedientes', label: 'Expedientes', icon: 'fa-file-contract' },
    { id: 'calculator', label: 'Calculadora', icon: 'fa-calculator' },
    { id: 'dictionary', label: 'Diccionario', icon: 'fa-book-atlas' },
    { id: 'latin-practice', label: 'Practica Latin', icon: 'fa-feather-pointed' },
    { id: 'library', label: 'Leyes', icon: 'fa-landmark' },
    { id: 'profile', label: 'Mi Perfil', icon: 'fa-user-tie' },
    { id: 'about', label: 'Nosotros', icon: 'fa-info-circle' }
  ];

  if (resolvedUserRole === 'admin') {
    navItems.splice(4, 0, { id: 'admin', label: 'Admin', icon: 'fa-user-shield' });
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-slate-50 font-['Inter']">
      {/* Top Header Mobile */}
      <header className="md:hidden flex bg-white/90 backdrop-blur-xl border-b h-14 items-center px-4 justify-between sticky top-0 z-[60] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <h1 className="text-[10px] font-black text-slate-900 tracking-tighter uppercase">Lex Academia</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100" title="Progreso">
            <span className="text-[9px] font-black text-slate-900">{resolvedLexCoins}</span>
            <i className="fa-solid fa-chart-line text-amber-500 text-[8px]"></i>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-slate-900 text-white flex-col sticky top-0 h-screen shrink-0 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter">Lex Academia</h1>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => resolvedSetActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                resolvedActiveTab === item.id ? 'bg-amber-500 text-slate-900 shadow-xl' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button onClick={resolvedLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-black text-sm">
            <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
            <span>Salir</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <header className="hidden md:flex bg-white/80 backdrop-blur-xl border-b h-20 items-center px-10 justify-between sticky top-0 z-40">
           <div className="flex items-center gap-3">
              <span className="text-slate-400 font-bold text-sm">Portal Académico</span>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">
                {navItems.find(i => i.id === resolvedActiveTab)?.label || 'Panel'}
              </h2>
           </div>
           <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="font-black text-slate-900 text-sm leading-none">{resolvedUserName}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-widest">{resolvedUserRole}</p>
             </div>
             <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${avatarSeed}`} className="w-12 h-12 rounded-2xl border-2 border-slate-100 bg-white" alt="User" />
           </div>
        </header>

        <div className="p-4 sm:p-6 md:p-12 max-w-[1400px] mx-auto min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white z-[100] px-2 pb-4 pt-2 rounded-t-[2rem] flex justify-around items-center">
        {navItems.filter(i => i.id !== 'about' && i.id !== 'admin').map((item) => (
          <button
            key={item.id}
            onClick={() => resolvedSetActiveTab(item.id)}
            className="flex flex-col items-center gap-0.5 py-1 flex-1"
          >
            <i className={`fa-solid ${item.icon} ${resolvedActiveTab === item.id ? 'text-amber-500' : 'text-slate-500'}`}></i>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${resolvedActiveTab === item.id ? 'text-white' : 'text-slate-600'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};
