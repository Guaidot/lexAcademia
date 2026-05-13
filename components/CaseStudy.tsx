import React, { useMemo, useState } from 'react';
import { CASE_STUDIES } from '../constants';

interface CaseStudyProps {
  onOpenLibrary: () => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ onOpenLibrary }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Basico' | 'Intermedio' | 'Avanzado'>('all');

  const filteredCases = useMemo(() => {
    if (difficultyFilter === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((c: any) => c.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  const currentCase = filteredCases[currentIndex];

  // Validación de seguridad: Si no hay caso, no renderiza nada para evitar errores
  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto pb-20 px-4 animate-fadeIn">
        <div className="bg-white p-8 rounded-[2rem] border border-dashed border-slate-200 text-center">
          <h2 className="text-xl font-black text-slate-900 mb-2">Sin expedientes</h2>
          <p className="text-slate-500 text-sm">No hay casos para este filtro. Ajusta la dificultad.</p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
  };

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    setSelectedOption(id);
    setShowFeedback(true);
  };

  const selectedOptData = currentCase.options.find(o => o.id === selectedOption);
  const correctOptData = currentCase.options.find(o => o.isCorrect);
  const isCorrectSelection = selectedOptData?.isCorrect;

  const steps = useMemo(() => ([
    { id: 'step-1', label: 'Identificar vicio', done: showFeedback },
    { id: 'step-2', label: 'Norma aplicable', done: showFeedback },
    { id: 'step-3', label: 'Consecuencia', done: showFeedback }
  ]), [showFeedback]);

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-4 mb-10 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 text-3xl shadow-xl -rotate-2">
          <i className="fa-solid fa-file-contract"></i>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
          Expediente <span className="text-amber-600">Judicial</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Detecta errores procesales y vicios de nulidad en documentos judiciales simulados.
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-2 shadow-lg flex items-center gap-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Dificultad</span>
          {['all', 'Basico', 'Intermedio', 'Avanzado'].map((level) => (
            <button
              key={level}
              onClick={() => { setDifficultyFilter(level as any); setCurrentIndex(0); setSelectedOption(null); setShowFeedback(false); }}
              className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${difficultyFilter === level ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}
            >
              {level === 'all' ? 'Todos' : level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Document Viewer (PDF Simulator) */}
        <div className="bg-white p-8 sm:p-12 shadow-2xl border border-slate-200 min-h-[600px] relative rotate-1 transform transition-all hover:rotate-0 duration-500">
           {/* Paper Texture/Effect */}
           <div className="absolute inset-0 bg-amber-50/20 pointer-events-none"></div>
           <div className="absolute top-0 left-0 w-full h-2 bg-slate-200/50"></div>
           
           {/* Stamp */}
           <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
              <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center -rotate-12">
                 <span className="text-xs font-black uppercase text-slate-900 text-center">Poder Judicial<br/>Copia Simple</span>
              </div>
           </div>

           <div className="relative z-10 font-serif text-slate-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base text-justify">
              {currentCase.documentText}
           </div>

           <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400">
              Pág. 1 de 1 • Exp. {currentCase.id}
           </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Caso {currentIndex + 1} / {filteredCases.length}
                  </span>
                 <h3 className="font-black text-slate-900 text-lg">{currentCase.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
               {steps.map(step => (
                <div key={step.id} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${step.done ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                  {step.label}
                </div>
               ))}
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-6 flex items-start gap-3">
                <i className="fa-solid fa-magnifying-glass text-amber-500 mt-1"></i>
                {currentCase.question}
              </h4>

              <div className="space-y-3">
                {currentCase.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.isCorrect;
                  let btnClass = "bg-slate-50 border-2 border-slate-100 text-slate-600 hover:border-amber-400 hover:bg-white";
                  
                  if (showFeedback) {
                    if (isCorrect) btnClass = "bg-emerald-100 border-emerald-500 text-emerald-800";
                    else if (isSelected && !isCorrect) btnClass = "bg-rose-100 border-rose-500 text-rose-800 opacity-50";
                    else btnClass = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                  } else if (isSelected) {
                    btnClass = "bg-slate-900 border-slate-900 text-white";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-xl text-left font-bold text-sm transition-all duration-300 ${btnClass}`}
                    >
                      <div className="flex gap-3">
                         <span className="uppercase text-[10px] opacity-70 mt-0.5">{opt.id}.</span>
                         <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`mt-8 p-6 rounded-2xl border-l-4 ${isCorrectSelection ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'} animate-fadeIn space-y-4`}>
                  <div>
                    <h5 className="font-black text-sm uppercase tracking-widest mb-2 opacity-80">Fundamento Legal</h5>
                    <p className="text-slate-800 font-medium italic text-sm">
                      "{correctOptData?.feedback}"
                    </p>
                    {currentCase.legalBasis && (
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{currentCase.legalBasis}</p>
                    )}
                  </div>

                  {currentCase.consequence && (
                    <div className="bg-white/70 border border-slate-200 rounded-xl p-4">
                      <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Consecuencia</h6>
                      <p className="text-slate-700 text-sm font-medium">{currentCase.consequence}</p>
                    </div>
                  )}

                  {Array.isArray(currentCase.takeaways) && currentCase.takeaways.length > 0 && (
                    <div className="bg-white/70 border border-slate-200 rounded-xl p-4">
                      <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Resumen</h6>
                      <ul className="text-slate-700 text-sm font-medium space-y-1 list-disc pl-5">
                        {currentCase.takeaways.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button onClick={onOpenLibrary} className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-400">
                      Ver leyes
                    </button>
                    <button onClick={handleNext} className="text-xs font-black uppercase tracking-widest underline hover:text-amber-600">
                      Siguiente Expediente &rarr;
                    </button>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};