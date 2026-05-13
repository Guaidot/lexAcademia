
import React from 'react';

interface AboutProps {
  onExplore: () => void;
}

export const About: React.FC<AboutProps> = ({ onExplore }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-16 animate-fadeIn pb-20">
      <section className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-8">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-5xl mx-auto shadow-2xl rotate-3">
          <i className="fa-solid fa-scale-balanced"></i>
        </div>
        <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Entrenamiento Jurídico de <span className="text-amber-600">Élite</span>.
        </h2>
        <p className="text-slate-500 text-base sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
          Academia Lex es una plataforma diseñada para el dominio práctico del derecho venezolano, enfocada en la resolución de casos reales y el análisis de leyes vigentes.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-100 shadow-xl">
          <h3 className="text-lg sm:text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
            <i className="fa-solid fa-flag text-blue-600"></i>
            Misión
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-lg font-medium">
            Proveer herramientas tecnológicas para que estudiantes y profesionales dominen la jurisprudencia venezolana (LOTTT, Código Civil, Constitución) mediante simuladores de casos de alta complejidad.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-100 shadow-xl">
          <h3 className="text-lg sm:text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
            <i className="fa-solid fa-compass text-amber-600"></i>
            Visión
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-lg font-medium">
            Ser el centro de entrenamiento digital líder en Venezuela, cerrando la brecha entre la teoría académica y el ejercicio profesional real ante tribunales.
          </p>
        </div>
      </section>

      <div className="text-center py-10">
         <button 
           onClick={onExplore}
           className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-base hover:bg-amber-500 transition-all shadow-2xl"
         >
           Explorar Materias
         </button>
      </div>
    </div>
  );
};
