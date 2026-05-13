
import React, { useState, useRef, useEffect } from 'react';
import { getLegalExplanation } from '../services/geminiService';

export const LegalTutor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'tutor', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const tutorResponse = await getLegalExplanation(userMsg, "Módulo General de Derecho Venezolano");
    setMessages(prev => [...prev, { role: 'tutor', text: tutorResponse || 'No pude procesar la consulta.' }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
          <i className="fa-solid fa-robot text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold">LexTutor AI</h3>
          <p className="text-xs text-slate-400">Consultas legales inmediatas</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
            <i className="fa-solid fa-comments text-6xl text-slate-200 mb-4"></i>
            <h4 className="text-xl font-bold text-slate-400">¿Tienes alguna duda legal?</h4>
            <p className="max-w-xs text-slate-400 mt-2">Pregúntame sobre cualquier artículo del Código Civil, LOTTT o la Constitución.</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' ? 'bg-amber-500 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              <p className="text-sm whitespace-pre-line">{m.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-slate-50 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu consulta legal aquí..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-amber-500 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-amber-600 transition-all active:scale-90 shadow-lg"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};
