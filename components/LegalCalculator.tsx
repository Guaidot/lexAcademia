import React, { useState } from 'react';

export const LegalCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');
  const [utilidadesDays, setUtilidadesDays] = useState(30);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!startDate || !endDate || !salary) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      alert("La fecha de egreso no puede ser anterior al ingreso.");
      return;
    }

    const monthlySalary = parseFloat(salary);
    const dailySalary = monthlySalary / 30;

    // Cálculo de tiempo (Años, Meses, Días)
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += 30; // Aproximación comercial estándar
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // 1. Antigüedad (Art. 142, literal c LOTTT - Retroactividad)
    // 30 días por año o fracción superior a 6 meses calculados al último salario
    let yearsForCalc = years;
    if (months >= 6) yearsForCalc += 1;
    // Si tiene menos de 3 meses no aplica (Art 142 a), pero asumimos cálculo general de liquidación
    const diasAntiguedad = yearsForCalc * 30; 
    const totalAntiguedad = diasAntiguedad * dailySalary;

    // 2. Vacaciones Fraccionadas + Bono Vacacional (Art. 190 y 192 LOTTT)
    // Días base: 15 + 1 por año de servicio (max 15 adicionales)
    const additionalDays = Math.min(years, 15);
    const diasDisfrute = 15 + additionalDays;
    const diasBono = 15 + additionalDays;
    const totalDiasVacacionesAnual = diasDisfrute + diasBono;
    
    // Fracción del último año trabajado
    const mesesFraccion = months + (days / 30);
    const factorFraccion = mesesFraccion / 12;
    
    const totalVacaciones = (totalDiasVacacionesAnual * dailySalary) * factorFraccion;

    // 3. Utilidades Fraccionadas (Art. 131 LOTTT)
    const totalUtilidades = (utilidadesDays * dailySalary) * factorFraccion;

    setResult({
      time: `${years} Años, ${months} Meses, ${days} Días`,
      dailySalary,
      antiguedad: { days: diasAntiguedad, amount: totalAntiguedad },
      vacaciones: { days: totalDiasVacacionesAnual * factorFraccion, amount: totalVacaciones },
      utilidades: { days: utilidadesDays * factorFraccion, amount: totalUtilidades },
      total: totalAntiguedad + totalVacaciones + totalUtilidades
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 animate-fadeIn">
      <div className="text-center space-y-4 mb-10 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 text-3xl shadow-xl -rotate-3">
          <i className="fa-solid fa-calculator"></i>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
          Calculadora <span className="text-amber-600">Laboral</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Estimación de prestaciones sociales según la LOTTT (Art. 142).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fecha de Ingreso</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 font-bold text-slate-800 outline-none focus:border-amber-400 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fecha de Egreso</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 font-bold text-slate-800 outline-none focus:border-amber-400 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Último Salario Mensual</label>
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
               <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 pl-8 font-bold text-slate-800 outline-none focus:border-amber-400 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Días de Utilidades (Anual)</label>
            <select value={utilidadesDays} onChange={(e) => setUtilidadesDays(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 font-bold text-slate-800 outline-none focus:border-amber-400 transition-all">
              <option value={30}>30 Días (Mínimo de Ley)</option>
              <option value={60}>60 Días (2 Meses)</option>
              <option value={90}>90 Días (3 Meses)</option>
              <option value={120}>120 Días (Máximo Legal)</option>
            </select>
          </div>

          <button onClick={calculate} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg active:scale-95">
            Calcular Liquidación
          </button>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
           {result ? (
             <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl space-y-8 animate-slideUp relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tiempo de Servicio</p>
                   <h3 className="text-xl sm:text-2xl font-black text-white">{result.time}</h3>
                </div>

                <div className="space-y-4">
                   <ResultRow label="Antigüedad (Art. 142)" amount={result.antiguedad.amount} subtext={`${result.antiguedad.days} días acumulados`} />
                   <ResultRow label="Vacaciones Fraccionadas" amount={result.vacaciones.amount} subtext="Incluye Bono Vacacional" />
                   <ResultRow label="Utilidades Fraccionadas" amount={result.utilidades.amount} subtext={`Base: ${utilidadesDays} días`} />
                </div>

                <div className="pt-6 border-t border-white/10">
                   <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Total Estimado</p>
                   <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">${result.total.toFixed(2)}</h3>
                </div>
             </div>
           ) : (
             <div className="h-full bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-10 opacity-50">
                <i className="fa-solid fa-calculator text-4xl text-slate-300 mb-4"></i>
                <p className="font-bold text-slate-400 text-sm">Ingresa los datos para ver el desglose.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const ResultRow = ({ label, amount, subtext }: any) => (
  <div className="flex justify-between items-center">
     <div>
        <p className="text-sm font-bold text-slate-200">{label}</p>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{subtext}</p>
     </div>
     <p className="text-xl font-black text-white">${amount.toFixed(2)}</p>
  </div>
);