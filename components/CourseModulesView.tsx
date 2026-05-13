import React, { useMemo, useState } from 'react';
import { Course, Question } from '../types';

interface CourseModulesViewProps {
  course: Course;
  onBack: () => void;
  onStartQuiz: (questions: Question[], courseTitle: string, moduleId?: string, moduleTitle?: string) => void;
  isCourseUnlocked: boolean;
  onRequestAccess: () => void;
}

export const CourseModulesView: React.FC<CourseModulesViewProps> = ({ course, onBack, onStartQuiz, isCourseUnlocked, onRequestAccess }) => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const modules = course.modules || [];
  const activeModule = modules.find((m) => m.id === activeModuleId) || null;

  const moduleQuestions = useMemo(() => {
    if (!activeModule) return [];
    return activeModule.questionIds
      .map((id) => course.preguntas.find((q) => q.id === id))
      .filter(Boolean) as Question[];
  }, [activeModule, course.preguntas]);

  const handleSelectOption = (id: string) => {
    if (showFeedback) return;
    setSelectedOptionId(id);
    setShowFeedback(true);
  };

  const resetCase = () => {
    setSelectedOptionId(null);
    setShowFeedback(false);
  };

  if (!activeModule) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Materia</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">{course.titulo}</h2>
          </div>
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:underline">
            Volver a Materias
          </button>
        </div>

        {modules.length === 0 ? (
          <div className="bg-white p-8 rounded-[2rem] border border-dashed border-slate-200 text-center">
            <p className="text-slate-500 text-sm font-medium mb-4">Esta materia aun no tiene modulos estructurados.</p>
            <button
              onClick={() => onStartQuiz(course.preguntas, course.titulo)}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
            >
              Iniciar Quiz Completo
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((mod) => {
                const isModulePremium = mod.isPremium === true;
                const isLocked = isModulePremium && !isCourseUnlocked;

                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      if (isLocked) return;
                      setActiveModuleId(mod.id);
                      resetCase();
                    }}
                    className={`bg-white p-6 sm:p-8 rounded-[2rem] border shadow-xl transition-all text-left ${isLocked ? 'border-slate-100 opacity-70' : 'border-slate-100 hover:shadow-2xl'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Modulo</span>
                      <div className="flex items-center gap-2">
                        {isModulePremium && (
                          <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isLocked ? 'bg-amber-100 text-amber-700' : 'bg-amber-500 text-slate-900'}`}>
                            Premium
                          </span>
                        )}
                        <span className="text-[8px] font-black uppercase tracking-widest text-amber-600">{mod.tema}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{mod.titulo}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">{mod.lectura.slice(0, 160)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{mod.questionIds.length} preguntas</span>
                      {isLocked ? (
                        <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Bloqueado</span>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Ver modulo</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {!isCourseUnlocked && modules.some((m) => m.isPremium) && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
                <p className="text-slate-700 text-sm font-medium mb-3">Los modulos practicos estan disponibles con acceso premium.</p>
                <button
                  onClick={onRequestAccess}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  Comprar Acceso
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  const selectedOption = activeModule.caso.opciones.find((o) => o.id === selectedOptionId);
  const correctOption = activeModule.caso.opciones.find((o) => o.isCorrect);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modulo</p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">{activeModule.titulo}</h2>
        </div>
        <button onClick={() => { setActiveModuleId(null); resetCase(); }} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:underline">
          Volver a Modulos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lectura guiada</p>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">{activeModule.tema}</h3>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {activeModule.lectura}
          </p>
          <div className="bg-slate-50 border border-slate-100 p-4 sm:p-6 rounded-2xl">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Caso</p>
            <h4 className="text-base sm:text-xl font-black text-slate-900 mb-2">{activeModule.caso.titulo}</h4>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mb-4">{activeModule.caso.descripcion}</p>
            <div className="bg-white border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700 whitespace-pre-wrap">
              {activeModule.caso.documento}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pregunta del caso</p>
            <h4 className="text-base sm:text-xl font-black text-slate-900">{activeModule.caso.pregunta}</h4>
          </div>

          <div className="space-y-3">
            {activeModule.caso.opciones.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'bg-slate-50 border-2 border-slate-100 text-slate-700 hover:border-amber-400';
              if (showFeedback) {
                if (opt.isCorrect) btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800';
                else if (isSelected) btnClass = 'bg-rose-50 border-rose-500 text-rose-800 opacity-80';
                else btnClass = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
              } else if (isSelected) {
                btnClass = 'bg-slate-900 border-slate-900 text-white';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl text-left font-bold text-sm transition-all ${btnClass}`}
                >
                  <span className="uppercase text-[10px] opacity-70 mr-3">{opt.id}.</span>
                  {opt.texto}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`p-5 rounded-2xl border-l-4 ${selectedOption?.isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Fundamento</p>
              <p className="text-sm text-slate-700 font-medium">
                {selectedOption?.isCorrect ? correctOption?.feedback : selectedOption?.feedback}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => onStartQuiz(moduleQuestions, course.titulo, activeModule.id, activeModule.titulo)}
              className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all"
            >
              Iniciar Quiz del Modulo
            </button>
            <button
              onClick={resetCase}
              className="px-5 py-4 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
