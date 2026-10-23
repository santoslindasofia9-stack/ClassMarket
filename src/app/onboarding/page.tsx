"use client";

import { useRouter } from "next/navigation";
import WaveBackground from "@/components/ui/WaveBackground";

export default function OnboardingPagoProtegido() {
  const router = useRouter();

  const handleNext = () => {
    window.location.href = "/onboarding/negociacion";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-plus-jakarta py-10 px-5 sm:px-6">
      {/* Moving Waves in Celestes & Beiges */}
      <WaveBackground />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto my-auto">
        
        {/* Friendly Student Security & Trust Illustration Card */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 mb-6 group">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#C5A059]/20 blur-xl opacity-40 rounded-full scale-110" />
          
          <div className="relative w-full h-full bg-white/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-[30px] overflow-hidden shadow-[0_16px_40px_-10px_rgba(11,37,69,0.12)] flex flex-col items-center justify-center p-5 transition-all duration-500 group-hover:scale-105">
            {/* Central Graphic Composition: Student Certificate & Golden Security Lock */}
            <div className="relative flex items-center justify-center">
              {/* Soft Navy Circular Base */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-[#0B2545] to-[#163864] flex items-center justify-center shadow-md border border-[#C5A059]/40 transform -rotate-3 transition-transform group-hover:rotate-0 duration-500">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#FAF8F5]">menu_book</span>
              </div>

              {/* Floating Golden Shield / Lock Badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#D4AF37] to-[#C5A059] text-[#0B2545] w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg border-2 border-white transform translate-x-1 translate-y-1 animate-float-slow">
                <span className="material-symbols-outlined text-xl font-bold">lock</span>
              </div>

              {/* Graduation Sparkle */}
              <div className="absolute -top-2 -left-2 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-[#C5A059]/40 shadow-xs animate-pulse">
                <span className="material-symbols-outlined text-[#C5A059] text-base">verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section: Harmonious scale */}
        <div className="space-y-2.5 px-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#0B2545] text-[11px] font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-xs text-[#C5A059]">shield</span>
            Custodia Segura Estudiantil
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] leading-snug tracking-tight">
            Tu Intercambio está <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#C5A059]">Protegido</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B73] font-medium leading-relaxed max-w-[290px] mx-auto">
            Usamos tecnología de custodia segura para que el acuerdo o pago solo se libere cuando recibas tu tutoría, material o servicio a satisfacción.
          </p>
        </div>

        {/* Progress Indicator (2 dots for 2 onboarding screens) */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="w-5 h-1.5 rounded-full bg-[#0B2545] shadow-sm" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#0B2545]/20" />
        </div>
      </div>

      {/* Actions Section */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center gap-6 pb-2">
        {/* Botón Siguiente - Primary Navy (#0B2545) with white text */}
        <button
          onClick={handleNext}
          className="group relative w-full bg-[#0B2545] hover:bg-[#12335d] text-white font-bold py-4 px-8 rounded-[28px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2.5 overflow-hidden border border-[#C5A059]/40"
        >
          <span className="relative z-10 text-base">Siguiente</span>
          <span className="material-symbols-outlined relative z-10 text-xl group-hover:translate-x-1 transition-transform text-[#C5A059]">arrow_forward</span>
          <div className="absolute inset-0 bg-[#C5A059]/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </main>


  );
}
