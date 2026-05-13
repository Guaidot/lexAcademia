import React from 'react';
import { AdminAuditEntry } from '../../services/adminAudit';

interface AdminAuditProps {
  entries: AdminAuditEntry[];
  loading: boolean;
  onRefresh: () => void;
}

const actionLabel: Record<string, string> = {
  payment_approved: 'Pago aprobado',
  payment_rejected: 'Pago rechazado',
  user_blocked: 'Usuario bloqueado',
  user_unblocked: 'Usuario desbloqueado',
  user_reset_progress: 'Progreso reseteado',
  user_assigned_course: 'Curso asignado',
  user_role_changed: 'Rol de usuario modificado',
};

const actionIcon: Record<string, string> = {
  payment_approved: 'fa-check',
  payment_rejected: 'fa-xmark',
  user_blocked: 'fa-ban',
  user_unblocked: 'fa-unlock',
  user_reset_progress: 'fa-rotate-left',
  user_assigned_course: 'fa-book-open',
  user_role_changed: 'fa-user-shield',
};

export const AdminAudit: React.FC<AdminAuditProps> = ({ entries, loading, onRefresh }) => {
  return (
    <div className="space-y-4 animate-slideUp">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Historial de acciones</p>
          <p className="text-xs text-slate-500">Ultimas operaciones realizadas por administradores.</p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-2 rounded-xl hover:bg-slate-800"
        >
          <i className={`fa-solid fa-rotate-right ${loading ? 'animate-spin' : ''}`}></i>
          <span>Actualizar</span>
        </button>
      </div>

      {entries.length === 0 && !loading && (
        <div className="bg-white p-10 rounded-[2.5rem] border border-dashed border-slate-200 text-center opacity-60">
          <i className="fa-solid fa-clipboard-list text-4xl mb-4"></i>
          <p className="font-black uppercase tracking-widest text-[10px]">Sin registros de auditoria</p>
        </div>
      )}

      {entries.length > 0 && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="max-h-[480px] overflow-auto divide-y divide-slate-100">
            {entries.map((entry) => {
              const created = new Date(entry.created_at);
              const label = actionLabel[entry.action] || entry.action;
              const icon = actionIcon[entry.action] || 'fa-circle';
              return (
                <div key={entry.id} className="px-5 sm:px-6 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${icon} text-xs`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-slate-900 truncate">{label}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {entry.detail || 'Sin descripcion adicional'}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-1">
                      <span className="font-black uppercase tracking-widest">Admin:</span>{' '}
                      <span>{entry.admin_email || entry.admin_id || 'desconocido'}</span>
                      {entry.target_user_id && (
                        <>
                          {' '}
                          · <span className="font-black uppercase tracking-widest">Usuario:</span> {entry.target_user_id}
                        </>
                      )}
                      {entry.target_payment_id && (
                        <>
                          {' '}
                          · <span className="font-black uppercase tracking-widest">Pago:</span> {entry.target_payment_id}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {created.toLocaleDateString()}
                    </p>
                    <p className="text-[9px] text-slate-400">
                      {created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
