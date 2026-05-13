
import React, { useState, useRef, useMemo } from 'react';
import { Question } from '../types';
import { generateSpeech, decodeBase64, decodeAudioData } from '../services/geminiService';

interface QuizEngineProps {
  questions: Question[];
  onFinish: (score: number) => void;
  onQuestionResult: (questionId: number, isCorrect: boolean, pointsEarned: number) => void;
  courseTitle: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ questions, onFinish, onQuestionResult, courseTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const currentQuestion = questions[currentIndex];
  
  const pointsForCurrent = useMemo(() => {
    switch(currentQuestion?.dificultad) {
      case 'Alta': return 50;
      case 'Media': return 25;
      case 'Fácil': 
      default: return 10;
    }
  }, [currentQuestion]);

  const progressPercentage = useMemo(() => {
    return Math.round(((currentIndex) / questions.length) * 100);
  }, [currentIndex, questions.length]);

  if (questions.length === 0) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-xl text-center border-2 border-dashed border-slate-200 animate-fadeIn">
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <i className="fa-solid fa-folder-open text-xl sm:text-4xl text-slate-300"></i>
        </div>
        <h3 className="text-lg sm:text-2xl font-black text-slate-700">Módulo en Desarrollo</h3>
        <p className="text-slate-500 mt-2 font-medium text-xs sm:text-base">Estamos curando los mejores casos para esta materia.</p>
      </div>
    );
  }

  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleVerify = () => {
    if (!selectedOption || showFeedback) return;
    const isCorrect = selectedOption === currentQuestion.respuestaCorrecta;
    const pointsEarned = isCorrect ? pointsForCurrent : 0;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setTotalPoints(prev => prev + pointsEarned);
    }
    onQuestionResult(currentQuestion.id, isCorrect, pointsEarned);
    setShowFeedback(true);
  };

  const handleNext = () => {
    stopAudio();
    if (!isLastQuestion) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCopied(false);
    } else {
      onFinish(totalPoints);
    }
  };

  const handleShare = () => {
    const textToCopy = `Lex Academia - Caso Práctico\n\nPregunta: ${currentQuestion.enunciado}\n\nExplicación Jurídica: ${currentQuestion.feedback}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const stopAudio = () => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    setIsAudioPlaying(false);
  };

  const handlePlayAudio = async () => {
    if (isAudioPlaying) {
      stopAudio();
      return;
    }
    setIsAudioPlaying(true);
    try {
      const base64 = await generateSpeech(currentQuestion.enunciado);
      if (!base64) { setIsAudioPlaying(false); return; }
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioData = decodeBase64(base64);
      const audioBuffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsAudioPlaying(false);
      currentSourceRef.current = source;
      source.start();
    } catch (err) {
      console.error("Playback failed", err);
      setIsAudioPlaying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6 animate-fadeIn pb-10 px-2 sm:px-1 min-h-[calc(100vh-10rem)]">
      {/* Quiz Header */}
      <div className="bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-100 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="space-y-0.5 sm:space-y-1">
            <span className="inline-block text-[8px] sm:text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-0.5 sm:py-1 rounded-full border border-amber-100 uppercase tracking-widest shadow-sm">
              {courseTitle}
            </span>
            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tighter">Simulador Legal</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between">
            <div className="flex flex-col items-start sm:items-end">
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Progreso</span>
               <div className="bg-amber-500 text-slate-900 px-3 py-1 sm:px-3.5 sm:py-1 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-xs shadow-lg flex items-center gap-2">
                 {totalPoints} <i className="fa-solid fa-chart-line text-[8px] sm:text-[10px]"></i>
               </div>
            </div>
            <div className="bg-slate-900 text-white px-3 py-1 sm:px-3.5 sm:py-1 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-xs shadow-lg">
              {score} / {currentIndex + (showFeedback ? 1 : 0)}
            </div>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-end px-1">
            <p className="text-[8px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Caso: <span className="text-slate-900">{currentIndex + 1} / {questions.length}</span>
            </p>
            <span className="text-sm sm:text-2xl font-black text-slate-900 tracking-tighter">{progressPercentage}%</span>
          </div>
          <div className="relative h-2 sm:h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden shadow-inner flex p-0.5">
            <div 
              className="absolute left-0.5 top-0.5 bottom-0.5 bg-amber-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `calc(${((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100}% - 4px)` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-3xl border border-slate-100 relative overflow-hidden flex-1">
        <div className="flex justify-between items-start gap-3 mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-1.5 sm:gap-3">
            <span className={`text-[8px] sm:text-[11px] px-3 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-2xl font-black uppercase tracking-widest border shadow-sm ${
              currentQuestion.dificultad === 'Fácil' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
              currentQuestion.dificultad === 'Media' ? 'bg-amber-50 text-amber-600 border-amber-100' :
              'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {currentQuestion.dificultad}
            </span>
            <span className="text-[8px] sm:text-[11px] px-3 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest shadow-lg">
              {currentQuestion.tema}
            </span>
          </div>
          <button 
            onClick={handlePlayAudio}
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all shadow-xl border shrink-0 ${
              isAudioPlaying ? 'bg-amber-500 text-white border-amber-400' : 'bg-white text-slate-400 border-slate-100'
            }`}
          >
            <i className={`fa-solid ${isAudioPlaying ? 'fa-square-stop' : 'fa-volume-high'} text-xs sm:text-lg`}></i>
          </button>
        </div>

        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-xl md:text-2xl font-black leading-tight text-slate-900 tracking-tight break-words">
            {currentQuestion.enunciado}
          </h3>
        </div>

        {/* Options Area Refactored */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {currentQuestion.opciones.map((opt) => {
            let containerStyles = "bg-white border-slate-100 shadow-md hover:shadow-xl hover:border-amber-300 hover:-translate-y-1";
            let indicatorStyles = "bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-amber-100 group-hover:text-amber-600 group-hover:border-amber-200";
            
            if (selectedOption === opt.id) {
              containerStyles = "bg-amber-50 border-amber-500 shadow-xl ring-4 ring-amber-500/5 z-10";
              indicatorStyles = "bg-amber-500 text-white border-amber-500 shadow-lg";
            }
            
            if (showFeedback) {
              if (opt.id === currentQuestion.respuestaCorrecta) {
                containerStyles = "bg-emerald-50 border-emerald-500 shadow-2xl ring-8 ring-emerald-500/5 z-20 scale-[1.02]";
                indicatorStyles = "bg-emerald-500 text-white border-emerald-500";
              } else if (selectedOption === opt.id) {
                containerStyles = "bg-rose-50 border-rose-500 shadow-xl opacity-90";
                indicatorStyles = "bg-rose-500 text-white border-rose-500";
              } else {
                containerStyles = "bg-white border-slate-50 opacity-30 pointer-events-none grayscale scale-[0.98]";
                indicatorStyles = "bg-slate-50 text-slate-200 border-slate-50";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={showFeedback}
                className={`w-full text-left p-3.5 sm:p-5 rounded-[1.25rem] sm:rounded-[2rem] border-2 transition-all duration-300 flex items-center gap-3 sm:gap-4 group relative ${containerStyles}`}
              >
                <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center font-black border-2 shrink-0 text-base sm:text-xl transition-all duration-300 ${indicatorStyles}`}>
                  {opt.id.toUpperCase()}
                </div>
                <div className="flex-1 pr-3">
                  <p className="font-bold text-sm sm:text-base md:text-lg tracking-tight leading-snug text-slate-800">
                    {opt.texto}
                  </p>
                </div>
                {showFeedback && (
                   <div className="absolute right-4 sm:right-10">
                      {opt.id === currentQuestion.respuestaCorrecta ? (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                          <i className="fa-solid fa-check text-[10px] sm:text-base"></i>
                        </div>
                      ) : selectedOption === opt.id ? (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-xmark text-[10px] sm:text-base"></i>
                        </div>
                      ) : null}
                   </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <div className="space-y-4">
          {showFeedback && (
            <div className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-4 animate-slideUp shadow-3xl overflow-hidden relative ${
              selectedOption === currentQuestion.respuestaCorrecta ? 'bg-emerald-50 border-emerald-500/20' : 'bg-rose-50 border-rose-500/20'
            }`}>
              <div className={`absolute top-0 left-0 w-full h-1.5 sm:h-2 ${selectedOption === currentQuestion.respuestaCorrecta ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl ${
                  selectedOption === currentQuestion.respuestaCorrecta ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  <i className={`fa-solid ${selectedOption === currentQuestion.respuestaCorrecta ? 'fa-building-shield' : 'fa-triangle-exclamation'} text-lg sm:text-2xl`}></i>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className={`font-black text-[9px] sm:text-xs uppercase tracking-widest ${
                      selectedOption === currentQuestion.respuestaCorrecta ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {selectedOption === currentQuestion.respuestaCorrecta ? 'Fundamento Correcto' : 'Análisis Técnico'}
                    </h4>
                    <button onClick={handleShare} className="text-[8px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600 transition-all">
                      <i className={`fa-solid ${isCopied ? 'fa-check text-emerald-500' : 'fa-share-nodes'} mr-2`}></i>
                      {isCopied ? 'Copiado' : 'Compartir'}
                    </button>
                  </div>
                  <p className="text-slate-900 font-bold leading-relaxed text-xs sm:text-sm md:text-base tracking-tight italic">
                    {currentQuestion.feedback}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Actions */}
      <div className="sticky bottom-0 z-20 bg-slate-50/95 backdrop-blur border-t border-slate-200 rounded-2xl p-3 sm:p-4">
        {!showFeedback ? (
          <button
            onClick={handleVerify}
            disabled={!selectedOption}
            className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-lg transition-all shadow-2xl flex items-center justify-center gap-2.5 border-4 ${
              selectedOption ? 'bg-slate-900 text-white border-slate-800 hover:bg-amber-500 hover:text-slate-900 active:scale-95' : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            }`}
          >
            <i className="fa-solid fa-gavel text-amber-500"></i>
            Dictar Veredicto
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black text-sm sm:text-lg hover:bg-amber-500 hover:text-slate-900 transition-all shadow-3xl flex items-center justify-center gap-2.5 border-4 border-slate-800 active:scale-95"
          >
            {isLastQuestion ? 'Finalizar' : 'Siguiente Caso'}
            <i className={`fa-solid ${isLastQuestion ? 'fa-graduation-cap' : 'fa-arrow-right-long'}`}></i>
          </button>
        )}
      </div>
    </div>
  );
};
