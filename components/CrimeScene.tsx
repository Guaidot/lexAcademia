import React, { useState } from 'react';
import { CRIME_SCENARIOS } from '../constants';

export const CrimeScene = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentCase = CRIME_SCENARIOS[currentIndex];

  if (!currentCase) return null;

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % CRIME_SCENARIOS.length);
  };

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    setSelectedOption(id);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-4 mb-10 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 text-3xl shadow-xl rotate-3">
          <i className="fa-solid fa-magnifying-glass-chart"></i>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
          Laboratorio <span className="text-amber-600">Forense</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Analiza escenarios criminalísticos reales y aplica el COPP para validar la evidencia.
        </p>
      </div>

      {/* Case View */}
      <div className="space-y-8 animate-slideUp">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CASO {currentIndex + 1} DE {CRIME_SCENARIOS.length}</span>
            <div className="flex gap-1">
              {CRIME_SCENARIOS.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-6 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full aspect-video bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 group">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <i className="fa-solid fa-image text-slate-300 text-4xl animate-bounce"></i>
              </div>
            )}
            <img 
              src={`https://image.pollinations.ai/prompt/${encodeURIComponent(currentCase.imagePrompt)}?nologo=true`} 
              alt="Escena del Crimen IA"
              className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 sm:p-10 pt-20">
              <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                Evidencia N° {currentCase.id.split('-')[1]}
              </span>
              <h3 className="text-white text-xl sm:text-3xl font-black leading-tight">{currentCase.title}</h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">{currentCase.description}</p>
            </div>
          </div>

          {/* Question & Options */}
          <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h4 className="text-lg sm:text-2xl font-black text-slate-900 mb-6 flex items-start gap-3">
              <i className="fa-solid fa-circle-question text-amber-500 mt-1"></i>
              {currentCase.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`p-5 rounded-2xl text-left font-bold text-sm transition-all duration-300 ${btnClass}`}
                  >
                    <span className="uppercase text-[10px] opacity-70 block mb-1">Opción {opt.id}</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`mt-8 p-6 rounded-2xl border-l-4 ${currentCase.options.find(o => o.id === selectedOption)?.isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'} animate-fadeIn`}>
                <h5 className="font-black text-sm uppercase tracking-widest mb-2 opacity-80">Análisis Legal</h5>
                <p className="text-slate-800 font-medium italic">
                  "{currentCase.options.find(o => o.isCorrect)?.feedback}"
                </p>
                <button onClick={handleNext} className="mt-4 text-xs font-black uppercase tracking-widest underline hover:text-amber-600">Siguiente Caso &rarr;</button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};