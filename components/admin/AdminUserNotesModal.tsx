import React, { useState } from 'react';
import { AdminNote } from '../../services/adminNotes';

interface AdminUserNotesModalProps {
  userId: string;
  userName?: string;
  notes: AdminNote[];
  loading: boolean;
  onClose: () => void;
  onAddNote: (text: string) => Promise<void>;
  onToggleStatus: (note: AdminNote) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export const AdminUserNotesModal: React.FC<AdminUserNotesModalProps> = ({
  userId,
  userName,
  notes,
  loading,
  onClose,
  onAddNote,
  onToggleStatus,
  onRefresh,
}) => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await onAddNote(text);
      setText('');
      await onRefresh();
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (note: AdminNote) => {
    await onToggleStatus(note);
    await onRefresh();
  };

  return (
    <div className="fixed inset-0 z-[220] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="max-w-lg w-full bg-white rounded-[2rem] sm:rounded-[3rem] shadow-3xl p-5 sm:p-7 relative animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Notas internas</p>
            <h3 className="text-base sm:text-lg font-black text-slate-900 truncate">{userName || userId}</h3>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-slate-900 text-white"
          >
            <i className={`fa-solid fa-rotate-right ${loading ? 'animate-spin' : ''}`}></i>
            <span>Actualizar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Agregar nota interna para este usuario..."
            className="w-full h-20 text-[11px] rounded-xl border border-slate-200 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-slate-400">Solo visible para administradores.</p>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-amber-500 text-slate-900 disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane text-[10px]"></i>
              <span>Guardar</span>
            </button>
          </div>
        </form>

        <div className="max-h-72 overflow-auto space-y-2">
          {loading && (
            <p className="text-[10px] text-slate-400">Cargando notas...</p>
          )}
          {!loading && notes.length === 0 && (
            <p className="text-[10px] text-slate-400">No hay notas registradas para este usuario.</p>
          )}
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-xl border text-[11px] flex items-start justify-between gap-3 ${
                note.status === 'open'
                  ? 'border-amber-100 bg-amber-50/60'
                  : 'border-emerald-100 bg-emerald-50/60'
              }`}
            >
              <div className="flex-1">
                <p className="text-slate-800 whitespace-pre-line">{note.note}</p>
                <p className="text-[9px] text-slate-500 mt-1">
                  <span className="font-black uppercase tracking-widest">{note.status === 'open' ? 'Abierto' : 'Cerrado'}</span>
                  {' · '}
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(note)}
                className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white text-slate-600 border border-slate-200 flex-shrink-0"
              >
                {note.status === 'open' ? 'Cerrar' : 'Reabrir'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
