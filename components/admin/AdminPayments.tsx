import React from 'react';
import { PaymentRecord } from '../../types';

interface AdminPaymentsProps {
  payments: PaymentRecord[];
  onViewReceipt: (receipt: string | null) => void;
  onReject: (payment: PaymentRecord) => void;
  onApprove: (payment: PaymentRecord) => void;
  onCopyToken: (token: string) => void;
  copyFeedback: string | null;
}

export const AdminPayments: React.FC<AdminPaymentsProps> = ({
  payments,
  onViewReceipt,
  onReject,
  onApprove,
  onCopyToken,
  copyFeedback
}) => (
  <div className="grid grid-cols-1 gap-4 sm:gap-8 animate-slideUp">
    {payments.length === 0 ? (
      <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center opacity-40">
        <i className="fa-solid fa-receipt text-4xl mb-4"></i>
        <p className="font-black uppercase tracking-widest text-[10px]">Sin movimientos registrados</p>
      </div>
    ) : (
      payments.map(p => (
        <div key={p.id} className="bg-white rounded-3xl sm:rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row">
          <div className={`w-full md:w-4 ${p.status === 'approved' ? 'bg-emerald-500' : p.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>

          <div className="p-5 sm:p-10 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                  p.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                  p.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {p.status}
                </span>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">ORDEN: {p.id}</span>
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-xl leading-none">{p.userName}</h4>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400">{p.courseTitle}</p>
            </div>

            <div className="flex flex-col sm:items-end w-full sm:w-auto">
              <p className="text-xl sm:text-3xl font-black text-slate-900">${p.amount}</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{new Date(p.date).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              {p.status === 'pending' && (
                <>
                  <button
                    onClick={() => onViewReceipt(p.receiptData || null)}
                    className="flex-1 sm:flex-none w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all"
                  >
                    <i className="fa-solid fa-eye text-sm"></i>
                  </button>
                  <button
                    onClick={() => onReject(p)}
                    className="flex-1 sm:flex-none w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                  <button
                    onClick={() => onApprove(p)}
                    className="flex-[2] sm:flex-none h-12 px-6 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg"
                  >
                    Validar
                  </button>
                </>
              )}

              {p.status === 'approved' && p.token && (
                <div className="flex-1 sm:flex-none flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <div className="text-left">
                    <p className="text-[7px] font-black text-slate-400 uppercase leading-none">Access Token</p>
                    <p className="text-[10px] sm:text-xs font-mono font-black text-amber-600 tracking-widest">{p.token}</p>
                  </div>
                  <button
                    onClick={() => onCopyToken(p.token!)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all"
                  >
                    <i className={`fa-solid ${copyFeedback === p.token ? 'fa-check text-emerald-500' : 'fa-copy'} text-[10px]`}></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
