
import React, { useState } from 'react';
import { UserProgress } from '../types';
import { useOptionalAppContext } from '../context/AppContext';

interface ProfileViewProps {
  progress?: UserProgress;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ progress }) => {
  const appCtx = useOptionalAppContext();
  const resolvedProgress = progress ?? appCtx?.progress;

  if (!resolvedProgress) return null;

  const avatarStorageKey = `lex_avatar_${resolvedProgress.email || resolvedProgress.name}`;
  const [avatarSeed, setAvatarSeed] = useState(() => {
    const saved = localStorage.getItem(avatarStorageKey) || localStorage.getItem(`lex_avatar_${resolvedProgress.name}`);
    return saved || resolvedProgress.name || 'Lex';
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const accuracy = resolvedProgress.totalAttempts > 0 
    ? Math.round((resolvedProgress.correctAnswers / resolvedProgress.totalAttempts) * 100) 
    : 0;

  const unlockedBadges = (resolvedProgress.achievements || []).filter(a => a.unlockedAt);
  const monthlyEntries = Object.entries(resolvedProgress.monthlyStudy || {})
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, 6);

  const avatarOptions = [
    { id: 'lex-1', label: 'Balanza', seed: 'lex-justicia-balanza' },
    { id: 'lex-2', label: 'Juez', seed: 'lex-juez-toga' },
    { id: 'lex-3', label: 'Abogada', seed: 'lex-abogada' },
    { id: 'lex-4', label: 'Fiscal', seed: 'lex-fiscal-ministerio' },
    { id: 'lex-5', label: 'Defensa', seed: 'lex-defensa-penal' },
    { id: 'lex-6', label: 'Academia', seed: 'lex-academia-doctrina' },
    { id: 'lex-7', label: 'Civil', seed: 'lex-civil' },
    { id: 'lex-8', label: 'Laboral', seed: 'lex-laboral' }
  ];

  const handleSelectAvatar = (seed: string) => {
    setAvatarSeed(seed);
    localStorage.setItem(avatarStorageKey, seed);
    if (resolvedProgress.name) localStorage.setItem(`lex_avatar_${resolvedProgress.name}`, seed);
    if (resolvedProgress.email) localStorage.setItem(`lex_avatar_${resolvedProgress.email}`, seed);
    setShowAvatarPicker(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24 px-1">
      {/* Header Perfil */}
      <div className="bg-white p-6 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <img 
          src={`https://api.dicebear.com/7.x/personas/svg?seed=${avatarSeed}`} 
          className="w-24 h-24 sm:w-40 sm:h-40 rounded-[2.5rem] border-4 border-slate-50 bg-slate-100 shadow-2xl relative z-10" 
          alt="Avatar" 
        />
        <div className="space-y-2 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
             <div className="flex flex-wrap items-center gap-3">
               <h2 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tighter">{resolvedProgress.name}</h2>
               <button
                 onClick={() => setShowAvatarPicker(prev => !prev)}
                 className="bg-slate-900 text-white px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest"
               >
                 {showAvatarPicker ? 'Cerrar' : 'Editar avatar'}
               </button>
             </div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nombre completo</span>
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-center md:self-auto ${
               resolvedProgress.role === 'admin' ? 'bg-slate-900 text-amber-500' : 'bg-blue-50 text-blue-600'
             }`}>
               {resolvedProgress.role === 'admin' ? 'Jurista Admin' : 'Estudiante'}
             </span>
          </div>
          <p className="text-slate-400 font-bold text-sm sm:text-xl">{resolvedProgress.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
             <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 flex items-center gap-2" title="Progreso">
                <span className="text-amber-700 font-black text-lg">{resolvedProgress.lexCoins}</span>
                 <i className="fa-solid fa-chart-line text-amber-500"></i>
             </div>
             <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2">
                <span className="text-indigo-700 font-black text-lg">{accuracy}%</span>
                <i className="fa-solid fa-bullseye text-indigo-500"></i>
             </div>
          </div>
        </div>
      </div>

      {showAvatarPicker && (
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
            <i className="fa-solid fa-user-astronaut text-slate-300"></i>
            Elegir Avatar
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {avatarOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAvatar(option.seed)}
                className={`p-4 rounded-2xl border transition-all text-center ${avatarSeed === option.seed ? 'border-amber-400 bg-amber-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${option.seed}`}
                  className="w-16 h-16 mx-auto rounded-xl bg-white border border-slate-100"
                  alt={option.label}
                />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">
                  {option.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estadísticas de Estudio */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <StatItem label="Respuestas" value={resolvedProgress.totalAttempts} icon="fa-comment-dots" color="text-blue-500" />
        <StatItem label="Correctas" value={resolvedProgress.correctAnswers} icon="fa-check-circle" color="text-emerald-500" />
        <StatItem label="Logros" value={resolvedProgress.achievements.length} icon="fa-trophy" color="text-amber-500" />
      </div>

      {/* Última actividad */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
           <i className="fa-solid fa-history text-slate-300"></i>
           Actividad Reciente
        </h3>
        <div className="space-y-4">
           <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase">Última Sesión</span>
                <span className="text-xs font-black text-slate-900">{new Date(resolvedProgress.lastStudyDate).toLocaleDateString()}</span>
           </div>
           <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase">Materias Activas</span>
                <span className="text-xs font-black text-slate-900">{resolvedProgress.unlockedCourseIds.length}</span>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
          <i className="fa-solid fa-award text-slate-300"></i>
          Badges Desbloqueados
        </h3>
        {unlockedBadges.length === 0 ? (
          <p className="text-slate-500 text-sm">Aun no hay badges desbloqueados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unlockedBadges.map(badge => (
              <div key={badge.id} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <i className={`fa-solid ${badge.icono}`}></i>
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{badge.titulo}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{badge.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
          <i className="fa-solid fa-calendar-days text-slate-300"></i>
          Historial Mensual de Estudio
        </h3>
        {monthlyEntries.length === 0 ? (
          <p className="text-slate-500 text-sm">Aun no hay historial mensual.</p>
        ) : (
          <div className="space-y-3">
            {monthlyEntries.map(([month, count]) => (
              <div key={month} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{month}</span>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{count} dias</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg flex flex-col items-center text-center gap-2">
    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${color} text-lg shadow-inner`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <p className="text-2xl sm:text-4xl font-black text-slate-900 leading-none">{value}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);
