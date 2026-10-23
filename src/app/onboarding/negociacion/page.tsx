"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AmbientBackground from "@/components/ui/AmbientBackground";

export default function OnboardingNegociacion() {
  const router = useRouter();

  const handleStart = () => {
    // Redirigir directamente al inicio de sesión (Login)
    window.location.href = "/auth/login";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-plus-jakarta py-10 px-6">
      {/* Shared Ambient Animated Background */}
      <AmbientBackground />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-md mx-auto my-auto">
        
        {/* Contenedor Visual Superior: Glassmorphism Student Card */}
        <div className="relative w-full max-w-[320px] mb-8 group">
          <div className="relative bg-white/80 backdrop-blur-xl border border-[#C5A059]/30 rounded-[36px] p-5 shadow-xl transition-all duration-500 hover:scale-[1.02]">
            
            {/* Header: Mateo R. • Tutoría de Álgebra */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 shadow-sm flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
                  alt="Mateo R."
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left min-w-0">
                <h3 className="text-base font-extrabold text-[#0B2545] truncate">Mateo R. • Tutoría de Álgebra</h3>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#0B2545] rounded-full mt-1 border border-[#C5A059]/40">
                  <span className="material-symbols-outlined text-[11px] text-[#C5A059]">school</span>
                  <span className="text-[9px] font-extrabold text-[#C5A059] uppercase tracking-wider">ESTUDIANTE DESTACADO</span>
                </div>
              </div>
            </div>

            {/* Trade Info & Chat Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FAF8F5] rounded-2xl border border-[#C5A059]/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#5C6B73]">Modalidad</span>
                </div>
                <span className="text-xs font-extrabold text-[#0B2545]">Intercambio / $15.000 COP</span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#0B2545] text-white py-3 rounded-2xl font-bold text-xs shadow-md hover:bg-[#12335d] transition-colors border border-[#C5A059]/30">
                <span className="material-symbols-outlined text-base text-[#C5A059]">lock</span>
                <span>Chat Encriptado</span>
              </button>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-[#C5A059]/40 flex items-center gap-1.5 animate-float-slow">
            <span className="material-symbols-outlined text-[#C5A059] text-base">verified</span>
            <span className="text-[10px] font-extrabold text-[#0B2545]">100% Seguro</span>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-3 px-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2545] leading-tight tracking-tight">
            Acuerda e Intercambia con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#C5A059]">Confianza Total</span>
          </h1>
          <p className="text-[14px] md:text-base text-[#5C6B73] font-medium leading-relaxed max-w-[320px] mx-auto">
            Tu privacidad y seguridad son lo primero. Negocia tutorías, apuntes y trabajos con compañeros de forma transparente.
          </p>
        </div>

        {/* Technical Details: Security Filters */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0B2545]/5 rounded-full border border-[#C5A059]/30 mb-6">
          <span className="material-symbols-outlined text-[#C5A059] text-base">verified_user</span>
          <span className="text-[10px] font-extrabold text-[#0B2545] uppercase tracking-widest">FILTROS DE SEGURIDAD ESTUDIANTIL</span>
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
