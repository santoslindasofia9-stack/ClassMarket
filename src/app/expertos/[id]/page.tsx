"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/dashboard/BottomNav";

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Tutorías de Matemáticas, Álgebra y Física para 10° y 11°.",
    categoria: "Matemáticas & Ciencias",
    calificacion: 5,
    tarifa: 10,
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Guías resueltas, talleres de Química Orgánica y Biología escolar.",
    categoria: "Tareas & Guías",
    calificacion: 5,
    tarifa: 7,
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f3",
    nombre_completo: "Sofía Salazar",
    titulo_profesional: "Clases de Inglés conversacional, vocabulario y preparación Saber 11.",
    categoria: "Tutorías & Clases",
    calificacion: 5,
    tarifa: 12,
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Proyectos en Python, JavaScript, HTML y apoyo en informática colegial.",
    categoria: "Programación & Tecnologías",
    calificacion: 5,
    tarifa: 14,
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f5",
    nombre_completo: "Valentina Gómez",
    titulo_profesional: "Trueque de Libros de Cálculo, resúmenes de Historia y Filosofía.",
    categoria: "Tareas & Guías",
    calificacion: 5,
    tarifa: 5,
    foto_perfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f6",
    nombre_completo: "Sebastián Rincón",
    titulo_profesional: "Preparación de exámenes de Trigonometría, Geometría y Aritmética.",
    categoria: "Matemáticas & Ciencias",
    calificacion: 5,
    tarifa: 9,
    foto_perfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&crop=face"
  }
];

export default function ExpertProfile({
  params,
}: {
  params: any;
}) {
  const router = useRouter();
  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpert = async () => {
      const resolvedParams = await params;
      const expertId = resolvedParams.id;

      // 1. Fetch from Supabase
      const { data: expertData } = await supabase
        .from("perfiles_profesionales")
        .select("*")
        .eq("id", expertId)
        .single();

      // Find fallback matching the ID or use the first one if not found
      const fallbackExpert = FALLBACK_EXPERTS.find(e => e.id === expertId) || FALLBACK_EXPERTS[0];

      // If we can't find them in DB, use fallback data for demo purposes
      setExpert(expertData || fallbackExpert);
      setLoading(false);
    };

    fetchExpert();
  }, [params]);

  if (loading || !expert) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#FCE4EC] border-t-[#0d1c2e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans pb-24 text-[#0d1c2e]">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-50 flex justify-center items-center w-full h-16 px-4 md:px-8">
        <div className="max-w-[1280px] w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/resultados')}
              className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#5e6f79] hover:text-[#0d1c2e] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/home-cliente')}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-white flex items-center justify-center p-1 shadow-sm">
                <img src="/classmarket-logo.png" alt="ClassMarket" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-[#0B2545] tracking-tight leading-none flex items-center gap-1.5">
                  ClassMarket
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#0B2545] border border-[#C5A059]/30">Estudiantil</span>
                </span>
                <span className="text-[10px] font-semibold text-[#5C6B73]">Educación e Intercambio Real</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 hidden md:flex">
             <button className="flex items-center justify-center p-2 text-[#5e6f79] hover:bg-[#eff4ff] rounded-full">
               <span className="material-symbols-outlined">search</span>
             </button>
             <div className="w-10 h-10 rounded-full border-2 border-[#e0f2fe] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-[32px] pt-24 pb-32 space-y-[32px]">
        
        {/* Profile Header Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-[32px] p-[24px] md:p-12 bg-white/70 backdrop-blur-xl border border-sky-50 rounded-[24px] shadow-[0_20px_40px_rgba(224,242,254,0.4)]">
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#e0f2fe] overflow-hidden shadow-xl">
              <img 
                src={expert.foto_perfil} 
                alt={expert.nombre_completo} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-[#f472b6] text-white p-2.5 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B2545] leading-tight tracking-tight">
                  {expert.nombre_completo}
                </h2>
                <span className="inline-flex px-3 py-1 bg-[#C5A059]/20 text-[#0B2545] text-[12px] font-bold tracking-wider rounded-full w-fit mx-auto md:mx-0 uppercase border border-[#C5A059]/40">
                  TUTOR DESTACADO
                </span>
              </div>
              <p className="text-[16px] md:text-[18px] text-[#5C6B73] max-w-2xl leading-relaxed">
                {expert.titulo_profesional}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
              <div className="flex items-center gap-2 text-[#5C6B73]">
                <span className="material-symbols-outlined text-[#C5A059]">location_on</span>
                <span className="text-[16px] font-medium">Bucaramanga, Santander</span>
              </div>
              <div className="flex items-center gap-2 text-[#5C6B73]">
                <span className="material-symbols-outlined text-[#C5A059]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-[16px] font-bold text-[#0B2545]">{expert.calificacion}</span>
                <span className="text-[16px] opacity-75">(48 Calificaciones)</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
              <button className="px-8 py-3.5 bg-[#FAF8F5] text-[#0B2545] font-bold rounded-full hover:bg-slate-100 active:scale-95 transition-all duration-300 shadow-sm border border-[#C5A059]/30">
                Guardar Tutor
              </button>
              <button 
                onClick={() => router.push(`/chat/${expert.id}`)}
                className="px-8 py-3.5 bg-[#0B2545] hover:bg-[#12335d] text-white font-bold rounded-full active:scale-95 transition-all duration-300 shadow-sm border border-[#C5A059]/40 text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-[#C5A059]">chat</span>
                Iniciar Chat
              </button>
            </div>
          </div>
        </section>

        {/* Bio & Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
          <div className="lg:col-span-2 space-y-6 p-[24px] md:p-10 bg-white rounded-[24px] border border-[#C5A059]/20 shadow-sm">
            <h3 className="text-[22px] font-bold text-[#0B2545] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#C5A059]">school</span>
              Perfil Académico & Experiencia
            </h3>
            <div className="text-[15px] text-[#5C6B73] space-y-4 leading-relaxed font-normal">
              <p>Estudiante sobresaliente con dedicación a la enseñanza entre compañeros. Cuento con experiencia resolviendo dudas en matemáticas, álgebra, física y ciencias, aplicando métodos explicativos paso a paso para asegurar que domines los conceptos y apruebes tus parciales o exámenes Saber 11.</p>
              <p>Ofrezco guías resueltas con procedimientos claros, explicaciones virtuales en vivo y sesiones de repaso previas a entregas importantes. ¡Aprender entre estudiantes siempre es más fácil y dinámico!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-[32px]">
            <div className="p-[24px] md:p-8 bg-[#FAF8F5] rounded-[24px] border border-[#C5A059]/30 flex flex-col justify-center items-center text-center">
              <span className="text-[36px] font-black text-[#0B2545]">100%</span>
              <span className="text-[11px] font-bold tracking-wider text-[#5C6B73] mt-1 uppercase">Calificación Positiva</span>
            </div>
            <div className="p-[24px] md:p-8 bg-white rounded-[24px] border border-[#C5A059]/30 flex flex-col justify-center items-center text-center">
              <span className="text-[36px] font-black text-[#0B2545]">&lt; 15m</span>
              <span className="text-[11px] font-bold tracking-wider text-[#5C6B73] mt-1 uppercase">Respuesta Rápida</span>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="space-y-[32px] pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h3 className="text-[28px] font-extrabold text-[#0B2545]">Muestras de Trabajos & Guías</h3>
              <p className="text-[15px] text-[#5C6B73]">Ejemplos de material académico, guías resueltas y talleres explicados.</p>
            </div>
            <button className="flex items-center gap-1.5 text-[#0B2545] font-bold hover:gap-2.5 transition-all duration-300 text-sm">
              Ver más guías <span className="material-symbols-outlined text-[#C5A059]">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {/* Portfolio Item 1 */}
            <div className="group relative overflow-hidden rounded-[24px] shadow-sm bg-white transition-transform duration-500 hover:-translate-y-2 border border-[#C5A059]/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600" 
                  alt="Taller de Álgebra" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold text-[20px]">Taller Resuelto de Álgebra</span>
                <span className="text-white/80 text-[14px]">Ejercicios paso a paso con fórmulas</span>
              </div>
            </div>
            
            {/* Portfolio Item 2 */}
            <div className="group relative overflow-hidden rounded-[24px] shadow-sm bg-white transition-transform duration-500 hover:-translate-y-2 border border-[#C5A059]/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600" 
                  alt="Resumen Saber 11" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold text-[20px]">Resumen Saber 11</span>
                <span className="text-white/80 text-[14px]">Mapas conceptuales y simulacros</span>
              </div>
            </div>
            
            {/* Portfolio Item 3 */}
            <div className="group relative overflow-hidden rounded-[24px] shadow-sm bg-white transition-transform duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1 border border-[#C5A059]/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" 
                  alt="Proyectos Informática" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold text-[20px]">Proyectos de Informática</span>
                <span className="text-white/80 text-[14px]">Algoritmos en Python y diagramas</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => router.push(`/chat/${expert.id}`)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-[#0B2545] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 z-[60] border-2 border-[#C5A059]/50"
      >
        <span className="material-symbols-outlined text-[30px] text-[#C5A059]">chat</span>
      </button>

      {/* Global Bottom Nav for Mobile */}
      <BottomNav />
    </div>
  );
}
