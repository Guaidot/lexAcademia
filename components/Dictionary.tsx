import React, { useEffect, useMemo, useState } from 'react';

export const TERMS = [
  {
    id: 'avocamiento',
    term: 'Avocamiento',
    definition: 'Facultad excepcional del Tribunal Supremo de Justicia (especialmente Sala Político-Administrativa o Constitucional) para atraer el conocimiento de una causa que cursa en tribunales inferiores, cuando existe un grave desorden procesal o interés público.',
    basis: 'Ley Orgánica del TSJ',
    category: 'Constitucional'
  },
  {
    id: 'perencion',
    term: 'Perención de la Instancia',
    definition: 'Forma de extinción del proceso judicial que ocurre cuando transcurre un lapso de tiempo determinado por la ley (generalmente un año en materia civil) sin que las partes realicen actos de impulso procesal.',
    basis: 'Art. 267 Código de Procedimiento Civil',
    category: 'Procesal'
  },
  {
    id: 'litisconsorcio',
    term: 'Litisconsorcio',
    definition: 'Situación jurídica en la que existe una pluralidad de personas que actúan en juicio como demandantes (activo) o demandados (pasivo), vinculados por una misma pretensión o causa.',
    basis: 'Art. 146 Código de Procedimiento Civil',
    category: 'Procesal'
  },
  {
    id: 'cuestion-previa',
    term: 'Cuestión Previa',
    definition: 'Mecanismo de defensa procesal mediante el cual el demandado, antes de contestar el fondo de la demanda, solicita al juez que subsane vicios formales o decida sobre impedimentos procesales.',
    basis: 'Art. 346 Código de Procedimiento Civil',
    category: 'Procesal'
  },
  {
    id: 'amparo',
    term: 'Amparo Constitucional',
    definition: 'Acción judicial breve, sumaria y eficaz destinada a restablecer inmediatamente la situación jurídica infringida cuando un derecho constitucional es violado o amenazado.',
    basis: 'Art. 27 Constitución (CRBV)',
    category: 'Constitucional'
  },
  {
    id: 'habeas-corpus',
    term: 'Habeas Corpus',
    definition: 'Garantía constitucional dirigida a restituir la libertad de quien ha sido detenido de forma arbitraria o ilegal.',
    basis: 'Art. 27 Constitución (CRBV)',
    category: 'Constitucional',
    isLatin: true,
    synonyms: ['amparo de libertad']
  },
  {
    id: 'exequatur',
    term: 'Exequátur',
    definition: 'Procedimiento judicial mediante el cual el Tribunal Supremo de Justicia otorga fuerza ejecutoria en Venezuela a una sentencia dictada por un tribunal extranjero.',
    basis: 'Art. 850 Código de Procedimiento Civil',
    category: 'Civil'
  },
  {
    id: 'ultra-petita',
    term: 'Ultra Petita',
    definition: 'Vicio de la sentencia que ocurre cuando el juez otorga a las partes más de lo que estas han solicitado en el libelo de demanda.',
    basis: 'Art. 244 Código de Procedimiento Civil',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'fianza',
    term: 'Fianza',
    definition: 'Contrato o garantía personal mediante la cual un tercero se compromete a cumplir una obligación ante el acreedor si el deudor principal no lo hace.',
    basis: 'Art. 1804 Código Civil',
    category: 'Civil'
  },
  {
    id: 'usucapion',
    term: 'Usucapión (Prescripción Adquisitiva)',
    definition: 'Modo de adquirir la propiedad de una cosa mediante la posesión continuada durante el tiempo exigido por la ley.',
    basis: 'Art. 1952 Código Civil',
    category: 'Civil',
    isLatin: true,
    synonyms: ['prescripcion adquisitiva']
  },
  {
    id: 'in-dubio-pro-reo',
    term: 'In dubio pro reo',
    definition: 'Principio segun el cual, ante la duda razonable, debe favorecerse al imputado.',
    basis: 'Principio Penal',
    category: 'Penal',
    isLatin: true
  },
  {
    id: 'ratio-decidendi',
    term: 'Ratio decidendi',
    definition: 'Fundamento esencial de una decision judicial, la razon central que sustenta el fallo.',
    basis: 'Doctrina y jurisprudencia',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'pacta-sunt-servanda',
    term: 'Pacta sunt servanda',
    definition: 'Principio que obliga a las partes a cumplir lo pactado de buena fe.',
    basis: 'Derecho civil y contractual',
    category: 'Civil',
    isLatin: true
  },
  {
    id: 'bona-fide',
    term: 'Bona fide',
    definition: 'Buena fe en el obrar; presuncion de conducta leal y honesta.',
    basis: 'Principio general',
    category: 'Civil',
    isLatin: true
  },
  {
    id: 'audi-alteram-partem',
    term: 'Audi alteram partem',
    definition: 'Regla de debido proceso que exige oir a la otra parte antes de decidir.',
    basis: 'Debido proceso',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'nemo-judex',
    term: 'Nemo judex in causa sua',
    definition: 'Nadie puede ser juez en su propia causa.',
    basis: 'Imparcialidad judicial',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'res-judicata',
    term: 'Res judicata',
    definition: 'Cosa juzgada; inmutabilidad de una decision firme.',
    basis: 'Cosa juzgada',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'lex-specialis',
    term: 'Lex specialis derogat generali',
    definition: 'La norma especial prevalece sobre la general.',
    basis: 'Interpretacion normativa',
    category: 'Constitucional',
    isLatin: true
  },
  {
    id: 'iura-novit-curia',
    term: 'Iura novit curia',
    definition: 'El juez conoce el derecho y puede aplicarlo aun cuando no sea alegado.',
    basis: 'Principio procesal',
    category: 'Procesal',
    isLatin: true
  },
  {
    id: 'pro-homine',
    term: 'Pro homine',
    definition: 'Interpretacion mas favorable a la persona y a la proteccion de derechos.',
    basis: 'Derechos humanos',
    category: 'Constitucional',
    isLatin: true
  },
  {
    id: 'ultima-ratio',
    term: 'Ultima ratio',
    definition: 'El derecho penal es recurso de ultima instancia.',
    basis: 'Principio penal',
    category: 'Penal',
    isLatin: true
  },
  {
    id: 'culpa-in-vigilando',
    term: 'Culpa in vigilando',
    definition: 'Responsabilidad por falta de vigilancia o supervision.',
    basis: 'Responsabilidad civil',
    category: 'Civil',
    isLatin: true
  },
  {
    id: 'ex-tunc',
    term: 'Ex tunc',
    definition: 'Efecto retroactivo desde el origen del acto.',
    basis: 'Efectos juridicos',
    category: 'Procesal',
    isLatin: true
  }
];

export const Dictionary = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [latinOnly, setLatinOnly] = useState(false);

  const categories = useMemo(() => {
    const list = Array.from(new Set(TERMS.map(t => t.category))).sort();
    return ['Todas', ...list];
  }, []);

  const filteredTerms = useMemo(() => TERMS.filter(t => {
    if (category !== 'Todas' && t.category !== category) return false;
    if (latinOnly && !t.isLatin) return false;
    const haystack = [t.term, t.definition, t.basis, ...(t.synonyms || [])].join(' ').toLowerCase();
    return haystack.includes(search.toLowerCase());
  }), [category, latinOnly, search]);

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 animate-fadeIn">
      <div className="text-center space-y-4 mb-10 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 text-3xl shadow-xl rotate-6">
          <i className="fa-solid fa-book-atlas"></i>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
          Diccionario <span className="text-amber-600">Jurídico</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Glosario de términos procesales y sustantivos de uso frecuente en tribunales venezolanos.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-6">
         <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
         <input 
           type="text" 
           placeholder="Buscar término, base legal o sinonimo..." 
           className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 focus:border-amber-400 transition-all font-bold shadow-xl outline-none text-slate-800"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${category === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setLatinOnly((prev) => !prev)}
          className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${latinOnly ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-white text-slate-500 border-slate-200'}`}
        >
          Latin
        </button>
      </div>
      <div className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">
        Resultados: {filteredTerms.length}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map(term => (
            <div key={term.id} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
               <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {term.term}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="self-start sm:self-auto bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">
                      {term.basis}
                    </span>
                    <span className="self-start sm:self-auto bg-amber-50 text-amber-700 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100">
                      {term.category}
                    </span>
                    {term.isLatin && (
                      <span className="self-start sm:self-auto bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        Latin
                      </span>
                    )}
                  </div>
               </div>
               <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
                 {term.definition}
               </p>
               {term.synonyms && term.synonyms.length > 0 && (
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">
                   Sinonimos: {term.synonyms.join(', ')}
                 </p>
               )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-50">
             <i className="fa-solid fa-file-circle-xmark text-4xl text-slate-300 mb-4"></i>
             <p className="font-bold text-slate-400">No se encontraron términos.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export const LatinPractice = () => {
  const [showMeaning, setShowMeaning] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStreak, setQuizStreak] = useState(0);
  const [mistakeIds, setMistakeIds] = useState<string[]>([]);
  const [reviewMode, setReviewMode] = useState(false);

  const latinTerms = useMemo(() => TERMS.filter(t => t.isLatin), []);
  const quizTerms = useMemo(() => {
    if (!reviewMode) return latinTerms;
    return latinTerms.filter(t => mistakeIds.includes(t.id));
  }, [latinTerms, reviewMode, mistakeIds]);

  const handleNextPractice = () => {
    if (latinTerms.length === 0) return;
    setShowMeaning(false);
    setPracticeIndex((prev) => (prev + 1) % latinTerms.length);
  };

  const buildQuizOptions = (correctDefinition: string) => {
    const pool = latinTerms.map(t => t.definition).filter(def => def !== correctDefinition);
    const options = [correctDefinition];
    const targetSize = Math.min(4, latinTerms.length);
    while (options.length < targetSize && pool.length > 0) {
      const index = Math.floor(Math.random() * pool.length);
      const pick = pool.splice(index, 1)[0];
      if (!options.includes(pick)) options.push(pick);
    }
    for (let i = options.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  useEffect(() => {
    if (quizTerms.length === 0) return;
    const current = quizTerms[quizIndex % quizTerms.length];
    setQuizOptions(buildQuizOptions(current.definition));
    setQuizAnswered(false);
    setQuizCorrect(false);
    setSelectedOption(null);
  }, [quizIndex, quizTerms.length]);

  useEffect(() => {
    if (reviewMode && mistakeIds.length === 0) {
      setReviewMode(false);
      setQuizIndex(0);
    }
  }, [reviewMode, mistakeIds.length]);

  const handleSelectOption = (option: string) => {
    if (quizAnswered) return;
    const current = quizTerms[quizIndex % quizTerms.length];
    const correct = option === current.definition;
    setQuizAnswered(true);
    setQuizCorrect(correct);
    setSelectedOption(option);
    setQuizStreak(prev => (correct ? prev + 1 : 0));
    setQuizScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    if (!correct) {
      setMistakeIds(prev => (prev.includes(current.id) ? prev : [...prev, current.id]));
    } else if (reviewMode) {
      setMistakeIds(prev => prev.filter(id => id !== current.id));
    }
  };

  const handleNextQuiz = () => {
    if (quizTerms.length === 0) return;
    setQuizIndex((prev) => (prev + 1) % quizTerms.length);
  };

  const handleStartReview = () => {
    if (mistakeIds.length === 0) return;
    setReviewMode(true);
    setQuizIndex(0);
  };

  const handleExitReview = () => {
    setReviewMode(false);
    setQuizIndex(0);
  };

  const handleClearMistakes = () => {
    setMistakeIds([]);
    if (reviewMode) setReviewMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 animate-fadeIn">
      <div className="text-center space-y-4 mb-10 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 text-3xl shadow-xl rotate-6">
          <i className="fa-solid fa-feather-pointed"></i>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
          Practica <span className="text-amber-600">Latin</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Memorizacion rapida y mini quiz para dominar frases juridicas.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-5 sm:p-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Practica Latin</p>
            <h3 className="text-xl font-black text-slate-900">{latinTerms[practiceIndex]?.term || 'Sin terminos'}</h3>
          </div>
          <button onClick={handleNextPractice} className="text-[9px] font-black uppercase tracking-widest text-amber-600">Siguiente</button>
        </div>
        {latinTerms.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            {!showMeaning ? (
              <button
                onClick={() => setShowMeaning(true)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest"
              >
                Mostrar significado
              </button>
            ) : (
              <p className="text-slate-700 text-sm font-medium">{latinTerms[practiceIndex]?.definition}</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-5 sm:p-8 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mini quiz Latin</p>
            <h3 className="text-xl font-black text-slate-900">{quizTerms[quizIndex]?.term || 'Sin terminos'}</h3>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Puntuacion</p>
            <p className="text-sm font-black text-slate-700">{quizScore.correct}/{quizScore.total}</p>
            <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-1">Racha: {quizStreak}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Precision: {quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0}%</p>
          </div>
        </div>
        {quizTerms.length > 0 ? (
          <div className="space-y-3">
            {quizOptions.map(option => (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${quizAnswered ? 'cursor-default' : 'hover:border-amber-300'} ${quizAnswered && option === quizTerms[quizIndex]?.definition ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : quizAnswered && option === selectedOption ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-100 text-slate-700'}`}
              >
                {option}
              </button>
            ))}
            {quizAnswered && (
              <div className="flex items-center justify-between pt-2">
                <p className={`text-[10px] font-black uppercase tracking-widest ${quizCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {quizCorrect ? 'Correcto' : 'Incorrecto'}
                </p>
                <button
                  onClick={handleNextQuiz}
                  className="text-[9px] font-black uppercase tracking-widest text-amber-600"
                >
                  Siguiente
                </button>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Errores: {mistakeIds.length}</p>
              <div className="flex items-center gap-2">
                {reviewMode ? (
                  <button onClick={handleExitReview} className="text-[9px] font-black uppercase tracking-widest text-slate-500">Salir repaso</button>
                ) : (
                  <button onClick={handleStartReview} className="text-[9px] font-black uppercase tracking-widest text-amber-600">Repasar errores</button>
                )}
                <button onClick={handleClearMistakes} className="text-[9px] font-black uppercase tracking-widest text-slate-400">Limpiar</button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No hay terminos Latin disponibles.</p>
        )}
      </div>
    </div>
  );
};