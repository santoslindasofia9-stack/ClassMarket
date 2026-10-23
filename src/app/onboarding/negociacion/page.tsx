"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import WaveBackground from "@/components/ui/WaveBackground";

export default function OnboardingNegociacion() {
  const router = useRouter();

  const handleStart = () => {
    // Redirigir directamente al inicio de sesión (Login)
    window.location.href = "/auth/login";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-plus-jakarta py-10 px-5 sm:px-6">
      {/* Moving Waves in Celestes & Beiges */}
      <WaveBackground />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto my-auto">
        
        {/* Contenedor Visual Superior: Glassmorphism Student Card */}
        <div className="relative w-full max-w-[300px] mb-6 group">
          <div className="relative bg-white/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-[30px] p-4.5 shadow-[0_16px_40px_-10px_rgba(11,37,69,0.12)] transition-all duration-500 hover:scale-[1.02]">
            
            {/* Header: Mateo R. • Tutoría de Álgebra */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 shadow-xs flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
                  alt="Mateo R."
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left min-w-0">
                <h3 className="text-sm font-extrabold text-[#0B2545] truncate">Mateo R. • Tutoría de Álgebra</h3>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0B2545] rounded-full mt-0.5 border border-[#C5A059]/40">
                  <span className="material-symbols-outlined text-[10px] text-[#C5A059]">school</span>
                  <span className="text-[8px] font-extrabold text-[#C5A059] uppercase tracking-wider">ESTUDIANTE DESTACADO</span>
                </div>
              </div>
            </div>

            {/* Trade Info & Chat Button */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-3 py-2 bg-[#FAF8F5] rounded-xl border border-[#C5A059]/20">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-[#5C6B73]">Modalidad</span>
                </div>
                <span className="text-[11px] font-extrabold text-[#0B2545]">Intercambio / $15.000 COP</span>
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 bg-[#0B2545] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm hover:bg-[#12335d] transition-colors border border-[#C5A059]/30">
                <span className="material-symbols-outlined text-sm text-[#C5A059]">lock</span>
                <span>Chat Encriptado</span>
              </button>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute -top-2 -right-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-[#C5A059]/40 flex items-center gap-1 animate-float-slow">
            <span className="material-symbols-outlined text-[#C5A059] text-sm">verified</span>
            <span className="text-[9px] font-extrabold text-[#0B2545]">100% Seguro</span>
          </div>
        </div>

        {/* Text Section: Harmonious scale */}
        <div className="space-y-2.5 px-2 mb-5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] leading-snug tracking-tight">
            Acuerda e Intercambia con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#C5A059]">Confianza Total</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B73] font-medium leading-relaxed max-w-[290px] mx-auto">
            Tu privacidad y seguridad son lo primero. Negocia tutorías, apuntes y trabajos con compañeros de forma transparente.
          </p>
        </div>

        {/* Technical Details: Security Filters */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0B2545]/5 rounded-full border border-[#C5A059]/30 mb-5">
          <span className="material-symbols-outlined text-[#C5A059] text-xs">verified_user</span>
          <span className="text-[9px] font-extrabold text-[#0B2545] uppercase tracking-widest">FILTROS DE SEGURIDAD ESTUDIANTIL</span>
        </div>

        {/* Progress Indicator (2 dots for 2 onboarding screens) */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0B2545]/20" />
          <div className="w-5 h-1.5 rounded-full bg-[#0B2545] shadow-sm" />
        </div>
      </div>

      {/* Actions Section */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center gap-6 pb-2">
        {/* Botón Comenzar - Primary Navy (#0B2545) */}
        <button
          onClick={handleStart}
          className="group relative w-full bg-[#0B2545] hover:bg-[#12335d] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2.5 overflow-hidden border border-[#C5A059]/40 cursor-pointer"
        >
          <span className="relative z-10 text-base">Comenzar</span>
          <span className="material-symbols-outlined relative z-10 text-xl group-hover:translate-x-1 transition-transform text-[#C5A059]">arrow_forward</span>
          <div className="absolute inset-0 bg-[#C5A059]/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </main>
  );
}
