
import React, { useState, useEffect, useMemo } from 'react';
import { Course, PaymentRecord, UserProgress } from '../types';
import { fetchAdminProfiles } from '../services/adminProfiles';
import { approveAdminPayment, fetchAdminPayments, rejectAdminPayment } from '../services/adminPayments';
import { assignCourseToUser, resetUserProgress, setUserBlocked, setUserRole } from '../services/adminUsers';
import { AdminHeader } from './admin/AdminHeader';
import { AdminTabs, AdminTab } from './admin/AdminTabs';
import { AdminMetrics } from './admin/AdminMetrics';
import { AdminPayments } from './admin/AdminPayments';
import { AdminUsers } from './admin/AdminUsers';
import { AdminAudit } from './admin/AdminAudit';
import { AdminUserNotesModal } from './admin/AdminUserNotesModal';
import { useAdminPayments } from '../controllers/useAdminPayments';
import { useAdminUsers } from '../controllers/useAdminUsers';
import { COURSES } from '../constants';
import { logAdminAction, fetchRecentAuditLog, AdminAuditEntry } from '../services/adminAudit';
import { AdminNote, addAdminNote, fetchAdminNotesForUser, toggleAdminNoteStatus } from '../services/adminNotes';
import { useOptionalAppContext } from '../context/AppContext';

interface AdminViewProps {
  userId?: string;
  userEmail?: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ userId, userEmail }) => {
  const appCtx = useOptionalAppContext();
  const adminId = userId ?? appCtx?.user?.id;
  const adminEmail = userEmail ?? appCtx?.user?.email;

  const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [auditEntries, setAuditEntries] = useState<AdminAuditEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [notesUserId, setNotesUserId] = useState<string | null>(null);
  const [notesUserName, setNotesUserName] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cloudPayments, profilesData] = await Promise.all([
        fetchAdminPayments(),
        fetchAdminProfiles()
      ]);
      setPayments(cloudPayments);
      setProfiles(profilesData);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const loadAuditLog = async () => {
    setAuditLoading(true);
    try {
      const data = await fetchRecentAuditLog(100);
      setAuditEntries(data);
    } catch (err) {
      console.error('Error loading audit log:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'audit') {
      loadAuditLog();
    }
  }, [activeTab]);

  const openUserNotes = async (user: UserProgress) => {
    setNotesUserId(user.userId);
    setNotesUserName(user.name);
    setNotes([]);
    setNotesLoading(true);
    try {
      const data = await fetchAdminNotesForUser(user.userId);
      setNotes(data);
    } catch (err) {
      console.error('Error loading user notes:', err);
    } finally {
      setNotesLoading(false);
    }
  };

  const reloadUserNotes = async () => {
    if (!notesUserId) return;
    setNotesLoading(true);
    try {
      const data = await fetchAdminNotesForUser(notesUserId);
      setNotes(data);
    } catch (err) {
      console.error('Error reloading user notes:', err);
    } finally {
      setNotesLoading(false);
    }
  };

  const handleAddNote = async (text: string) => {
    if (!notesUserId) return;
    await addAdminNote({
      userId: notesUserId,
      note: text,
      adminId,
      adminEmail,
    });
  };

  const handleToggleNoteStatus = async (note: AdminNote) => {
    const nextStatus = note.status === 'open' ? 'closed' : 'open';
    await toggleAdminNoteStatus(note.id, nextStatus);
  };

  const stats = useMemo(() => {
    const approved = payments.filter(p => p.status === 'approved');
    const revenue = approved.reduce((acc, p) => acc + (p.amount || 0), 0);
    const pendingCount = payments.filter(p => p.status === 'pending').length;
    return { revenue, pendingCount, totalUsers: profiles.length, activeLicences: approved.length };
  }, [payments, profiles]);

  const courseOptions = useMemo<Course[]>(() => COURSES, []);

  const paymentsController = useAdminPayments(payments);
  const usersController = useAdminUsers(profiles);

  const getAvatarSeed = (u: UserProgress) => {
    const key = u.email || u.name || 'User';
    return localStorage.getItem(`lex_avatar_${key}`) || localStorage.getItem(`lex_avatar_${u.name}`) || key;
  };

  const handleApprove = async (payment: PaymentRecord) => {
    await approveAdminPayment(payment);
    await loadData();
    logAdminAction({
      action: 'payment_approved',
      adminId,
      adminEmail,
      targetUserId: payment.userId,
      targetPaymentId: payment.id,
      detail: `Pago aprobado para curso ${payment.courseTitle} (${payment.courseId}) por ${payment.amount}`
    });
  };

  const handleReject = async (payment: PaymentRecord) => {
    if (!window.confirm("¿Rechazar este comprobante de pago?")) return;
    await rejectAdminPayment(payment);
    await loadData();
    logAdminAction({
      action: 'payment_rejected',
      adminId,
      adminEmail,
      targetUserId: payment.userId,
      targetPaymentId: payment.id,
      detail: `Pago rechazado para curso ${payment.courseTitle} (${payment.courseId}) por ${payment.amount}`
    });
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopyFeedback(token);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleToggleBlock = async (targetUserId: string, blocked: boolean) => {
    await setUserBlocked(targetUserId, blocked);
    await loadData();
    logAdminAction({
      action: blocked ? 'user_blocked' : 'user_unblocked',
      adminId,
      adminEmail,
      targetUserId: targetUserId,
      detail: blocked ? 'Usuario bloqueado desde panel admin' : 'Usuario desbloqueado desde panel admin'
    });
  };

  const handleResetProgress = async (targetUserId: string) => {
    if (!window.confirm('¿Resetear el progreso de este usuario?')) return;
    await resetUserProgress(targetUserId);
    await loadData();
    logAdminAction({
      action: 'user_reset_progress',
      adminId,
      adminEmail,
      targetUserId: targetUserId,
      detail: 'Progreso del usuario reseteado desde panel admin'
    });
  };

  const handleAssignCourse = async (targetUserId: string, courseId: string) => {
    if (!courseId) return;
    await assignCourseToUser(targetUserId, courseId);
    await loadData();
    const course = courseOptions.find(c => c.id === courseId);
    logAdminAction({
      action: 'user_assigned_course',
      adminId,
      adminEmail,
      targetUserId: targetUserId,
      detail: `Curso asignado manualmente: ${course?.titulo || courseId}`
    });
  };

  const handleChangeRole = async (targetUserId: string, role: UserRole) => {
    await setUserRole(targetUserId, role);
    await loadData();
    logAdminAction({
      action: 'user_role_changed',
      adminId,
      adminEmail,
      targetUserId: targetUserId,
      detail: `Rol cambiado a ${role}`
    });
  };

  const escapeCsv = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (!/[",\n]/.test(str)) return str;
    return '"' + str.replace(/"/g, '""') + '"';
  };

  const handleExportPaymentsCsv = () => {
    if (!paymentsController.filteredPayments.length) return;
    const headers = [
      'id',
      'date',
      'status',
      'userName',
      'userId',
      'courseTitle',
      'courseId',
      'amount',
      'token'
    ];
    const rows = paymentsController.filteredPayments.map(p => [
      p.id,
      p.date,
      p.status,
      p.userName,
      p.userId,
      p.courseTitle,
      p.courseId,
      p.amount ?? '',
      p.token ?? ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(escapeCsv).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const now = new Date();
    const stamp = now.toISOString().slice(0, 10);
    link.download = `lex-pagos-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="p-10 sm:p-20 text-center space-y-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Accediendo a la Nube...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 animate-fadeIn pb-32">
      {/* Admin Header Responsive */}
      <header className="flex flex-col gap-6">
        <AdminHeader />
        <AdminTabs activeTab={activeTab} pendingCount={stats.pendingCount} onChange={setActiveTab} />
      </header>

      {/* METRICS VIEW */}
      {activeTab === 'metrics' && (
        <AdminMetrics
          revenue={stats.revenue}
          activeLicences={stats.activeLicences}
          totalUsers={stats.totalUsers}
          pendingCount={stats.pendingCount}
        />
      )}

      {/* PAYMENTS VIEW */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Buscar pago por usuario, curso o id..."
                  className="w-full text-sm font-semibold text-slate-700 bg-transparent outline-none"
                  value={paymentsController.search}
                  onChange={(e) => paymentsController.setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={paymentsController.statusFilter}
                onChange={(e) => paymentsController.setStatusFilter(e.target.value as any)}
                className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobados</option>
                <option value="rejected">Rechazados</option>
              </select>
              <select
                value={paymentsController.sortBy}
                onChange={(e) => paymentsController.setSortBy(e.target.value as any)}
                className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="recent">Recientes</option>
                <option value="amount-high">Mayor monto</option>
                <option value="amount-low">Menor monto</option>
              </select>
              <button
                type="button"
                onClick={handleExportPaymentsCsv}
                className="hidden sm:inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-2 rounded-xl hover:bg-slate-800"
              >
                <i className="fa-solid fa-file-csv text-xs"></i>
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          <AdminPayments
            payments={paymentsController.filteredPayments}
            onViewReceipt={setViewingReceipt}
            onReject={handleReject}
            onApprove={handleApprove}
            onCopyToken={copyToken}
            copyFeedback={copyFeedback}
          />
        </div>
      )}

      {/* USERS VIEW */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo..."
                  className="w-full text-sm font-semibold text-slate-700 bg-transparent outline-none"
                  value={usersController.search}
                  onChange={(e) => usersController.setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={usersController.roleFilter}
                onChange={(e) => usersController.setRoleFilter(e.target.value as any)}
                className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="all">Todos</option>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
              </select>
              <select
                value={usersController.sortBy}
                onChange={(e) => usersController.setSortBy(e.target.value as any)}
                className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="recent">Recientes</option>
                <option value="name-asc">Nombre A-Z</option>
                <option value="lexcoins-high">Mayor progreso</option>
              </select>
            </div>
          </div>

          <AdminUsers
            profiles={usersController.filteredUsers}
            getAvatarSeed={getAvatarSeed}
            courses={courseOptions}
            onToggleBlock={handleToggleBlock}
            onResetProgress={handleResetProgress}
            onAssignCourse={handleAssignCourse}
            onOpenNotes={openUserNotes}
            onChangeRole={handleChangeRole}
          />
        </div>
      )}

      {/* AUDIT VIEW */}
      {activeTab === 'audit' && (
        <AdminAudit entries={auditEntries} loading={auditLoading} onRefresh={loadAuditLog} />
      )}

      {notesUserId && (
        <AdminUserNotesModal
          userId={notesUserId}
          userName={notesUserName}
          notes={notes}
          loading={notesLoading}
          onClose={() => setNotesUserId(null)}
          onAddNote={handleAddNote}
          onToggleStatus={handleToggleNoteStatus}
          onRefresh={reloadUserNotes}
        />
      )}

      {/* Receipt Preview Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-[200] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10" onClick={() => setViewingReceipt(null)}>
          <div className="max-w-xl w-full max-h-[90vh] bg-white rounded-[2rem] sm:rounded-[4rem] p-3 sm:p-6 relative shadow-3xl animate-scaleIn" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setViewingReceipt(null)}
              className="absolute -top-4 -right-4 w-10 h-10 sm:w-14 sm:h-14 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-2xl z-20 active:scale-90"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
            <div className="w-full h-full overflow-hidden rounded-[1.5rem] sm:rounded-[3rem] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
              <img src={viewingReceipt} className="max-w-full max-h-full object-contain p-2" alt="Comprobante" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
