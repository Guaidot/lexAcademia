
import React, { useState } from 'react';
import { Course } from '../types';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onConfirm: (receiptData: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onConfirm }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleFinish = () => {
    if (receipt) onConfirm(receipt);
  };

  const paymentData = {
    phone: "04167725601",
    id: "16403863",
    banks: [
      { name: "Banco de Venezuela", code: "0102", icon: "fa-building-columns" },
      { name: "Banco Provincial", code: "0108", icon: "fa-building" }
    ]
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 bg-slate-900/95 backdrop-blur-xl animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-[2rem] sm:rounded-[4rem] shadow-3xl overflow-hidden border border-slate-100 flex flex-col max-h-[95vh]">
        
        {/* Header - Compacto para móvil */}
        <div className="bg-slate-900 p-6 sm:p-10 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
              <i className="fa-solid fa-xmark text-sm sm:text-lg"></i>
           </button>
           <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-900 shadow-lg">
                <i className="fa-solid fa-crown text-[10px]"></i>
              </div>
              <p className="text-amber-500 font-black uppercase tracking-widest text-[8px] sm:text-[10px]">Materia Premium</p>
           </div>
           <h3 className="text-lg sm:text-3xl font-black tracking-tighter leading-tight mb-2 sm:mb-4">{course.titulo}</h3>
           <div className="flex items-center gap-3">
              <div className="bg-white/10 px-4 py-1 rounded-lg text-sm sm:text-xl font-black border border-white/10 flex items-center gap-2">
                 <i className="fa-solid fa-tag text-amber-500 text-[10px] sm:text-sm"></i>
                 ${course.price} USD
              </div>
              <span className="text-[7px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasa BCV</span>
           </div>
        </div>

        <div className="p-5 sm:p-10 overflow-y-auto space-y-6">
          {step === 1 ? (
            <div className="space-y-6 animate-slideUp">
               <div className="space-y-1">
                  <p className="font-black text-slate-900 text-base sm:text-xl">Datos de Pago</p>
                  <p className="text-slate-500 text-[10px] sm:text-sm font-medium">
                    Realiza el pago móvil a las siguientes cuentas.
                  </p>
               </div>
               <div className="space-y-2">
                  {paymentData.banks.map((bank, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                          <i className={`fa-solid ${bank.icon} text-xs sm:text-sm`}></i>
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase">{bank.name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">{bank.code}</p>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="bg-slate-900 p-5 rounded-2xl sm:rounded-[2.5rem] space-y-3 relative overflow-hidden">
                  <div className="space-y-3">
                     <button onClick={() => copyToClipboard(paymentData.phone, "Teléfono")} className="w-full flex justify-between items-center group active:scale-95 transition-transform">
                        <span className="text-[8px] text-slate-500 uppercase font-black">Teléfono:</span>
                        <span className="font-black text-white flex items-center gap-2 text-xs sm:text-lg">
                          {paymentData.phone} <i className="fa-solid fa-copy text-[10px]"></i>
                        </span>
                     </button>
                     <div className="h-px bg-white/5"></div>
                     <button onClick={() => copyToClipboard(paymentData.id, "CI")} className="w-full flex justify-between items-center group active:scale-95 transition-transform">
                        <span className="text-[8px] text-slate-500 uppercase font-black">Cédula:</span>
                        <span className="font-black text-white flex items-center gap-2 text-xs sm:text-lg">
                          {paymentData.id} <i className="fa-solid fa-copy text-[10px]"></i>
                        </span>
                     </button>
                  </div>
               </div>
               <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base hover:bg-amber-500 transition-all">
                 Continuar <i className="fa-solid fa-chevron-right ml-2 text-[10px]"></i>
               </button>
            </div>
          ) : (
            <div className="space-y-6 animate-slideUp">
               <div className="space-y-1">
                  <p className="font-black text-slate-900 text-base sm:text-xl">Cargar Comprobante</p>
                  <p className="text-slate-500 text-[10px] sm:text-sm">Sube la captura de pantalla de tu pago móvil.</p>
                  <label className="block mt-4">
                     <div className={`w-full h-40 sm:h-64 border-2 border-dashed rounded-2xl sm:rounded-[3rem] flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden bg-slate-50 ${receipt ? 'border-emerald-500' : 'border-slate-200'}`}>
                        {receipt ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={receipt} alt="Pago" className="w-full h-full object-contain p-2" />
                            <div className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center pointer-events-none">
                               <i className="fa-solid fa-check-circle text-emerald-500 text-3xl"></i>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                             <i className="fa-solid fa-cloud-arrow-up text-2xl text-slate-200 mb-1"></i>
                             <p className="font-black text-slate-400 text-[7px] uppercase tracking-widest">Subir Imagen</p>
                          </div>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                     </div>
                  </label>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-black text-[9px] uppercase">Atrás</button>
                  <button disabled={!receipt} onClick={handleFinish} className={`flex-[2] py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${receipt ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 text-slate-400'}`}>
                    Enviar Pago
                  </button>
               </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100 shrink-0">
           <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">
              Validación en menos de 12 horas.
           </p>
        </div>
      </div>
    </div>
  );
};
