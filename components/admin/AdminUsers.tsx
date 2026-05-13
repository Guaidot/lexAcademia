import React, { useState } from 'react';
import { Course, UserProgress } from '../../types';

interface AdminUsersProps {
  profiles: UserProgress[];
  getAvatarSeed: (u: UserProgress) => string;
  courses: Course[];
  onToggleBlock: (userId: string, blocked: boolean) => void;
  onResetProgress: (userId: string) => void;
  onAssignCourse: (userId: string, courseId: string) => void;
  onOpenNotes: (user: UserProgress) => void;
  onChangeRole: (userId: string, role: UserProgress['role']) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  profiles,
  getAvatarSeed,
  courses,
  onToggleBlock,
  onResetProgress,
  onAssignCourse,
  onOpenNotes,
  onChangeRole
}) => {
  const [courseSelection, setCourseSelection] = useState<Record<string, string>>({});
  const [roleSelection, setRoleSelection] = useState<Record<string, UserProgress['role']>>({});

  return (
    <div className="grid grid-cols-1 gap-4 animate-slideUp">
      {profiles.map((u, idx) => {
        if (!u) return null;
        const isBlocked = Boolean(u.isBlocked);
        const selectedCourse = courseSelection[u.userId] || '';
        const selectedRole = roleSelection[u.userId] || (u.role || 'user');
        const isSuperAdmin = (u.email || '').toLowerCase().trim() === 'geiser80@gmail.com';
        return (
          <div key={idx} className={`bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border shadow-lg flex flex-col lg:flex-row lg:items-center gap-4 transition-all ${isBlocked ? 'border-rose-200 bg-rose-50/40' : 'border-slate-100 hover:border-amber-200'}`}>
            <div className="flex items-center gap-4 flex-1">
              <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${getAvatarSeed(u)}`} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl border-2 border-slate-50 bg-slate-100" alt="Avatar" />
              <div className="min-w-0">
                <h4 className="font-black text-slate-900 text-sm sm:text-base truncate">{u.name}</h4>
                <p className="text-[9px] sm:text-xs text-slate-400 truncate">{u.email}</p>
                {isBlocked && (
                  <span className="mt-1 inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                    Bloqueado
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <span className="text-[9px] sm:text-[11px] font-black text-amber-700">{u.lexCoins || 0}</span>
                <i className="fa-solid fa-chart-line text-amber-500 text-[8px] sm:text-[10px]"></i>
              </div>
              <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${u.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {isSuperAdmin ? 'super-admin' : (u.role || 'user')}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              {!isSuperAdmin && (
                <>
                  <select
                    value={selectedRole}
                    onChange={(e) => setRoleSelection(prev => ({ ...prev, [u.userId]: e.target.value as UserProgress['role'] }))}
                    className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => onChangeRole(u.userId, selectedRole)}
                    className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-2 rounded-xl"
                    disabled={selectedRole === (u.role || 'user')}
                  >
                    Guardar rol
                  </button>
                </>
              )}
              <select
                value={selectedCourse}
                onChange={(e) => setCourseSelection(prev => ({ ...prev, [u.userId]: e.target.value }))}
                className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="">Asignar curso</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.titulo}</option>
                ))}
              </select>
              <button
                onClick={() => onAssignCourse(u.userId, selectedCourse)}
                className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-2 rounded-xl"
                disabled={!selectedCourse}
              >
                Asignar
              </button>
              <button
                onClick={() => onResetProgress(u.userId)}
                className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 px-3 py-2 rounded-xl border border-slate-200"
              >
                Reset
              </button>
              <button
                onClick={() => onToggleBlock(u.userId, !isBlocked)}
                className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl ${isBlocked ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
              >
                {isBlocked ? 'Desbloquear' : 'Bloquear'}
              </button>
              <button
                onClick={() => onOpenNotes(u)}
                className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 px-3 py-2 rounded-xl border border-slate-200"
              >
                Notas
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
