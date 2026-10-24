'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Pencil, 
  Send, 
  ChevronRight,
  ShieldCheck,
  MoreVertical,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NegotiationViewProps {
  expertData: any;
  negotiationId: string;
}

export default function NegotiationView({ expertData, negotiationId }: NegotiationViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(15.00);
  const [totalAgreed, setTotalAgreed] = useState(18.00);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola! ¿Podemos acordar 1 hora de tutoría y la guía de 10 ejercicios resueltos paso a paso?", sender: 'client', time: '10:45 AM' },
    { id: 2, text: "¡Hola! Claro que sí, por $18 USD te incluyo la hora de clase en vivo y el documento con los ejercicios explicados.", sender: 'expert', time: '10:50 AM' },
  ]);
  const [events, setEvents] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, events]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'client',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-[#0d1c2e]">
      
      {/* ── Columna Izquierda: Panel de Control (30%) ───────────────────────── */}
      <aside className="w-[30%] min-w-[320px] bg-white border-r border-sky-50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        {/* Header de Perfil */}
        <div className="p-6 border-b border-sky-50 flex items-center gap-4">
          <Link href={`/chat/${expertData.id}`} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-[#5e6f79]">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={expertData.foto_perfil} 
                alt={expertData.nombre_completo} 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-[#0B2545]">{expertData.nombre_completo}</h2>
              <p className="text-[11px] text-[#5C6B73] font-semibold uppercase tracking-wider">Tutoría & Apoyo Académico</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Tarjeta de Presupuesto Propuesto */}
          <div className="bg-white rounded-2xl border border-[#C5A059]/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#5C6B73]">
                <Wallet size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B2545]">Tarifa de Tutoría</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#5C6B73]">
                <Clock size={12} />
                <span>En vivo</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              {isEditing ? (
                <div className="flex items-center gap-1 w-full bg-gray-50 p-2 rounded-lg border border-[#C5A059]/40">
                  <span className="text-2xl font-black text-[#0B2545]">$</span>
                  <input 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="bg-transparent text-2xl font-black text-[#0B2545] focus:outline-none w-full"
                    autoFocus
                  />
                </div>
              ) : (
                <h3 className="text-3xl font-black text-[#0B2545] tracking-tight">
                  ${budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  <span className="text-sm font-bold text-[#5C6B73] ml-1">USD</span>
                </h3>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#C5A059]/15 text-[#0B2545] text-[10px] font-extrabold px-3 py-1 rounded-full border border-[#C5A059]/30">
                EN ACUERDO
              </span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto p-2 text-[#5C6B73] hover:text-[#0B2545] hover:bg-slate-50 rounded-lg transition-all"
              >
                <Pencil size={14} />
              </button>
            </div>
          </div>

          {/* Sección Detalles del Contrato */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-[#5C6B73] uppercase tracking-widest px-1">Detalles de la Sesión</h4>
            
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:border-[#C5A059]/40 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B2545]">Materia Principal</span>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-[#C5A059] transition-colors" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C5A059]/15 rounded-lg flex items-center justify-center text-[#0B2545]">
                  <FileText size={16} />
                </div>
                <span className="text-sm font-semibold text-[#0B2545]">Matemáticas, Álgebra & Física</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <span className="text-xs font-bold text-[#0B2545] block mb-3">Compromisos Acordados</span>
              <ul className="space-y-3">
                {[
                  "Sesión virtual de 1 hora en vivo",
                  "Guía de 10 ejercicios resueltos paso a paso",
                  "Resumen en PDF con fórmulas clave",
                  "Revisión de dudas previas al examen"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#5C6B73] leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta de Total Acordado (Fixed Bottom) */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#C5A059]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/10 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-110"></div>
            <span className="text-[10px] font-bold text-[#5C6B73] uppercase tracking-widest block mb-1">Total Acordado</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#0B2545] tracking-tight">
                ${totalAgreed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-[#5C6B73]">USD</span>
            </div>
            <p className="text-[10px] text-[#0B2545] mt-2 font-medium flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#C5A059]" />
              Protegido con Custodia Escrow Estudiantil
            </p>
          </div>
        </div>
      </aside>

      {/* ── Columna Derecha: Chat y Acciones (70%) ─────────────────────────── */}
      <main className="flex-1 flex flex-col relative bg-[#F8FAFC]">
        
        {/* Área de Mensajes */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-8 md:px-16 pt-10 pb-32 space-y-8 custom-scrollbar scroll-smooth"
        >
          {/* Separador de Fecha */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] font-bold text-[#5e6f79] tracking-[0.2em] uppercase">Hoy</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Mensajes */}
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'} group`}
            >
              <div className={`max-w-[80%] space-y-1 relative`}>
                <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'client' 
                    ? 'bg-[#E0F2FE]/60 border border-sky-100 text-[#0d1c2e] rounded-tl-none' 
                    : 'bg-white border border-pink-100 text-[#0d1c2e] rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-2 text-[10px] font-bold text-gray-400 ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
                  <span>{msg.time}</span>
                  {msg.sender === 'client' && <CheckCircle2 size={10} className="text-[#38bdf8]" />}
                </div>

                {/* Botón de eliminar */}
                <button 
                  onClick={() => setMessages(messages.filter(m => m.id !== msg.id))}
                  className={`absolute top-0 ${msg.sender === 'client' ? '-right-10' : '-left-10'} opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Eventos de Negociación */}
          {events.map((event) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={event.id}
              className="flex justify-center py-6"
            >
              <div className="bg-white/70 backdrop-blur-md border border-sky-100 rounded-3xl p-8 max-w-lg w-full shadow-xl shadow-[#0d1c2e]/5 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-full tracking-widest mb-2">
                  <Clock size={12} />
                  {event.title}
                </div>
                <h3 className="text-sm font-medium text-[#5e6f79] leading-relaxed">
                  {event.subtitle}
                </h3>
                <div className="py-4 border-y border-gray-100 flex items-center justify-center gap-4">
                  <span className="text-4xl font-black text-[#0d1c2e] tracking-tighter">${event.amount}</span>
                  <span className="text-xs font-bold text-[#5e6f79] uppercase tracking-widest mt-3">USD</span>
                </div>
                <p className="text-[10px] text-[#5e6f79] font-medium italic">
                  Propuesta pendiente de aprobación por el profesional
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Barra de Herramientas de Oferta (Flotante) ─────────────────── */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-30">
          <div className="bg-white/95 backdrop-blur-xl border border-[#C5A059]/30 rounded-full p-2.5 shadow-2xl flex items-center gap-3">
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#C5A059]/15 text-[#0B2545] border border-[#C5A059]/30 font-bold text-[11px] rounded-full flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
            >
              <Pencil size={14} className="text-[#C5A059]" />
              AJUSTAR TARIFA
            </button>
            
            <Link 
              href="/confirmacion-contrato"
              className={`flex-1 py-3.5 bg-[#0B2545] hover:bg-[#12335d] text-white font-extrabold text-xs rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 tracking-[0.08em] border border-[#C5A059]/40`}
            >
              <FileText size={16} className="text-[#C5A059]" />
              {isGenerating ? 'GENERANDO ACUERDO...' : 'ENVIAR TÉRMINOS Y CONDICIONES'}
            </Link>

          </div>
        </div>

        {/* Barra de Entrada de Mensaje Fija */}
        <div className="bg-white border-t border-slate-100 px-8 py-5">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe una contraoferta o propuesta de tutoría..."
                className="w-full bg-[#FAF8F5] border border-slate-200 rounded-full px-8 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 transition-all placeholder:text-[#5C6B73]/60 text-[#0B2545]"
              />
            </div>
            <button 
              onClick={handleSendMessage}
              className="w-14 h-14 bg-[#0B2545] hover:bg-[#12335d] text-white rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 shrink-0 border border-[#C5A059]/40"
            >
              <Send size={22} className="ml-0.5 text-[#C5A059]" />
            </button>
          </div>
        </div>

        {/* Overlay de Generación de IA */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-[#E0F2FE] rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-white p-6 rounded-full shadow-xl border border-sky-100 flex items-center justify-center">
                  <div className="material-symbols-outlined text-4xl text-[#38bdf8] animate-spin">hub</div>
                </div>
              </div>
              <h2 className="text-2xl font-black text-[#0d1c2e] mb-4">Redactando Contrato Inteligente...</h2>
              <p className="text-[#5e6f79] max-w-sm font-medium leading-relaxed">
                Nuestra IA legal está analizando los acuerdos de la negociación para generar los términos de cumplimiento automático.
              </p>
              
              <div className="mt-12 flex gap-3">
                 <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
