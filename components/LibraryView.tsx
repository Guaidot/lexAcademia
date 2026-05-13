
import React, { useState } from 'react';
import { CRBV_1999 } from '../data/crbv1999';

const LAWS = [
  CRBV_1999,
  { 
    id: 'cc', 
    title: 'Código Civil (C.C.)', 
    category: 'Civil', 
    year: '1982', 
    icon: 'fa-house-user', 
    color: 'bg-blue-500',
    content: {
      summary: "Nucleo del derecho privado: personas, bienes, contratos y sucesiones.",
      preamble: "El Código Civil de 1982 es el eje del derecho privado venezolano. Regula la vida del ciudadano desde antes del nacimiento hasta después de su muerte, abarcando familia, bienes, contratos y sucesiones.",
      titles: [
        {
          name: "Libro Primero: De las Personas",
          articles: [
            {
              num: "Art. 1",
              text: "La Ley es obligatoria desde su publicación en la Gaceta Oficial o desde la fecha posterior que ella misma fije.",
              reflection: "Principio de Publicidad: la ley nace con su publicacion y evita normas secretas.",
              application: "Define la vigencia para contratos y litigios; se usa al discutir que norma aplica en el tiempo.",
              analysis: "Sostiene la seguridad juridica y el principio de confianza legitima."
            },
            {
              num: "Art. 17",
              text: "El feto se tendrá como nacido cuando se trate de su bien; y para que sea reputado como persona, basta que haya nacido vivo.",
              reflection: "Teoria de la vitalidad: protege al concebido para efectos favorables como herencias.",
              application: "Se aplica en sucesiones, donaciones y reconocimiento de derechos patrimoniales del nasciturus.",
              analysis: "Equilibra proteccion prenatal con el requisito de nacimiento vivo para plena personalidad."
            },
            {
              num: "Art. 18",
              text: "Es mayor de edad quien haya cumplido dieciocho (18) años. El mayor de edad es capaz de todos los actos de la vida civil, con las excepciones establecidas por disposiciones especiales.",
              reflection: "Presuncion general de capacidad desde los 18 anos, con excepciones especiales.",
              application: "Clave para validar contratos, mandatos y actuaciones civiles sin representante legal.",
              analysis: "Facilita la autonomia personal, pero admite limites por incapacidad relativa o especial."
            }
          ]
        }
      ]
    }
  },
  { 
    id: 'lottt', 
    title: 'Ley del Trabajo (LOTTT)', 
    category: 'Laboral', 
    year: '2012', 
    icon: 'fa-briefcase', 
    color: 'bg-emerald-600',
    content: {
      summary: "Marco laboral que protege al trabajador como sujeto de especial tutela.",
      preamble: "La Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (2012) rige las situaciones y relaciones jurídicas derivadas del trabajo como hecho social.",
      titles: [
        {
          name: "Título I: Normas Fundamentales",
          articles: [
            {
              num: "Art. 1",
              text: "Esta Ley tiene por objeto proteger al trabajo como hecho social y garantizar los derechos de los trabajadores y de las trabajadoras...",
              reflection: "El trabajo no es mercancia, sino funcion social que el Estado protege activamente.",
              application: "Se usa para interpretar clausulas laborales a favor del trabajador y validar medidas de proteccion.",
              analysis: "Posiciona el trabajo como eje de dignidad y no solo de intercambio economico."
            },
            {
              num: "Art. 18",
              text: "El trabajo es un hecho social y goza de la protección del Estado. La ley dispondrá lo necesario para mejorar las condiciones materiales, morales e intelectuales de los trabajadores y trabajadoras.",
              reflection: "Base del derecho laboral: dignifica a la persona mediante condiciones de trabajo justas.",
              application: "Justifica politicas de seguridad y salud, inspecciones y programas de bienestar laboral.",
              analysis: "Refuerza el rol garantista del Estado en relaciones de trabajo asimetricas."
            }
          ]
        }
      ]
    }
  }
];

export const LibraryView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLaw, setSelectedLaw] = useState<any>(null);
  const [articleSearch, setArticleSearch] = useState('');

  const filtered = LAWS.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase()) || 
    l.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTitles = selectedLaw?.content?.titles?.map((title: any) => {
    if (!articleSearch.trim()) return title;
    const query = articleSearch.toLowerCase();
    const filteredArticles = title.articles.filter((art: any) => (
      `${art.num} ${art.text} ${art.reflection} ${art.application} ${art.analysis}`.toLowerCase().includes(query)
    ));
    return { ...title, articles: filteredArticles };
  }).filter((title: any) => (articleSearch.trim() ? title.articles.length > 0 : true));

  const isSearchingArticles = articleSearch.trim().length > 0;
  const resultsCount = filteredTitles?.reduce((acc: number, title: any) => acc + title.articles.length, 0) || 0;

  return (
    <div className="space-y-6 sm:space-y-12 animate-fadeIn pb-20 px-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-3 w-full">
          <h2 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tighter">Biblioteca Lex</h2>
          <p className="text-slate-500 text-xs sm:text-xl font-medium">Consulta comentada de leyes venezolanas vigentes.</p>
        </div>
        <div className="relative w-full md:w-96">
           <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm"></i>
           <input 
             type="text" 
             placeholder="Buscar ley..." 
             className="w-full bg-white border-2 border-slate-100 rounded-xl sm:rounded-2xl py-3.5 sm:py-5 pl-12 sm:pl-16 pr-6 focus:border-amber-400 transition-all font-bold shadow-xl text-xs sm:text-sm outline-none"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {filtered.map(law => (
          <div key={law.id} className="bg-white rounded-2xl sm:rounded-[3.5rem] p-5 sm:p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative active:scale-[0.98]">
            <div className="flex items-center gap-4 sm:gap-6 relative z-10">
               <div className={`w-10 h-10 sm:w-20 sm:h-20 rounded-xl sm:rounded-[2rem] ${law.color} text-white flex items-center justify-center text-lg sm:text-3xl shadow-lg`}>
                  <i className={`fa-solid ${law.icon}`}></i>
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-xl leading-tight">{law.title}</h4>
                  <p className="text-[7px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">{law.category} • {law.year}</p>
               </div>
            </div>
            
            <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-slate-50 flex justify-between items-center relative z-10">
               <button 
                 onClick={() => setSelectedLaw(law)}
                 className="text-slate-900 font-black text-[9px] sm:text-xs uppercase tracking-widest hover:text-amber-500 transition-colors"
               >
                 Ver Comentarios
               </button>
               <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                 <i className="fa-solid fa-chevron-right text-[8px] sm:text-xs"></i>
               </div>
            </div>
          </div>
        ))}
      </div>

      {selectedLaw && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl animate-fadeIn">
            <div className="bg-white w-full h-full sm:h-[92vh] sm:max-w-5xl sm:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col">
              <div className="bg-slate-900 p-4 sm:p-6 text-white flex justify-between items-center shrink-0 border-b border-white/5">
              <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-[1.25rem] ${selectedLaw.color} flex items-center justify-center text-lg sm:text-2xl shadow-2xl`}>
                  <i className={`fa-solid ${selectedLaw.icon}`}></i>
                </div>
                <div className="min-w-0">
                  <span className="text-amber-500 text-[7px] sm:text-[10px] font-black uppercase tracking-widest">Contenido Lex</span>
                    <h3 className="text-sm sm:text-2xl font-black tracking-tighter truncate">{selectedLaw.title}</h3>
                  <p className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{selectedLaw.category} • {selectedLaw.year}</p>
                </div>
              </div>
                 <button 
                   onClick={() => { setSelectedLaw(null); setArticleSearch(''); }}
                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl"
              >
                  <i className="fa-solid fa-xmark text-sm sm:text-xl"></i>
              </button>
            </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#fffdfa] scroll-smooth">
              {selectedLaw.content ? (
                 <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10">
                      <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-600">Resumen</p>
                    <p className="text-slate-700 text-sm sm:text-base font-semibold mt-2">
                    {selectedLaw.content.summary}
                  </p>
                 </div>

                      <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
                          <input
                            type="text"
                            placeholder="Buscar articulo (ej. Art. 5, soberania, amparo)"
                            className="w-full text-sm font-semibold text-slate-700 outline-none bg-transparent"
                            value={articleSearch}
                            onChange={(e) => setArticleSearch(e.target.value)}
                          />
                          {isSearchingArticles && (
                            <button
                              onClick={() => setArticleSearch('')}
                              className="text-[9px] font-black uppercase tracking-widest text-slate-500"
                            >
                              Limpiar
                            </button>
                          )}
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">
                          {articleSearch.trim() ? 'Resultados filtrados' : 'Busqueda dentro de esta ley'}
                        </p>
                      </div>

                      {isSearchingArticles && (
                        <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4">
                          <p className="text-[9px] font-black uppercase tracking-widest text-amber-300">Resultados</p>
                          <p className="text-sm sm:text-base font-semibold mt-1">
                            {resultsCount} articulo{resultsCount === 1 ? '' : 's'} encontrados
                          </p>
                        </div>
                      )}

                      {filteredTitles?.map((title: any, idx: number) => (
                    <div key={idx} className="space-y-5 sm:space-y-8 pt-5 sm:pt-8 border-t border-slate-100">
                      <h5 className="text-sm sm:text-lg font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-4">
                      {title.name}
                    </h5>
                      <div className="space-y-5 sm:space-y-8">
                      {title.articles.map((art: any, aidx: number) => (
                        <div key={aidx} className="space-y-4">
                            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg">
                              <i className="fa-solid fa-gavel text-amber-500"></i>
                              {art.num}
                            </div>
                              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
                              {art.text}
                            </p>
                          </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                              <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-100">
                             <h6 className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Interpretacion</h6>
                               <p className="text-sm text-slate-700 leading-relaxed mt-2">
                              {art.reflection}
                             </p>
                            </div>
                              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                             <h6 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Aplicacion</h6>
                               <p className="text-sm text-slate-700 leading-relaxed mt-2">
                              {art.application}
                             </p>
                            </div>
                              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                             <h6 className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Clave</h6>
                               <p className="text-sm text-slate-700 leading-relaxed mt-2">
                              {art.analysis}
                             </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                 ))}
                      {filteredTitles?.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm font-semibold text-slate-500">No hay articulos con esa busqueda.</p>
                        </div>
                      )}

                      {!isSearchingArticles && (
                        <div className="space-y-3 sm:space-y-5">
                           <div className="flex items-center justify-between">
                             <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tighter uppercase">Preambulo</h4>
                             <div className="w-8 sm:w-16 h-1 bg-amber-500 rounded-full"></div>
                           </div>
                           <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                              {selectedLaw.content.preamble}
                           </p>
                        </div>
                      )}
               </div>
              ) : (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 opacity-30">
                 <div className="w-16 h-16 sm:w-32 sm:h-32 bg-slate-100 rounded-full flex items-center justify-center text-3xl sm:text-6xl">
                  <i className="fa-solid fa-lock text-slate-300"></i>
                 </div>
                 <h4 className="text-base sm:text-3xl font-black text-slate-900">Modulo en desarrollo</h4>
               </div>
              )}
            </div>

            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex justify-end items-center shrink-0">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[9px] sm:text-xs uppercase tracking-widest shadow-xl">
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
