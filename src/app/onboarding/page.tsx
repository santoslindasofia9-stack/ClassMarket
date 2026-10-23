"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingPagoProtegido() {
  const router = useRouter();

  const handleNext = () => {
    window.location.href = "/onboarding/negociacion";
  };

  return (
    <main className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col bg-[#FAF8F5] font-plus-jakarta px-6 py-8">
      {/* Background aesthetic blobs in soft Cream & Gold */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[110%] h-[110%] bg-[#C5A059]/10 rounded-full blur-[140px] animate-blob" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[120%] h-[120%] bg-[#0B2545]/5 rounded-full blur-[140px] animate-blob [animation-delay:4s]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full max-w-md mx-auto">
        
        {/* Shield Graphic with Navy & Gold Aesthetic */}
        <div className="relative w-full max-w-[200px] md:max-w-[240px] aspect-square mb-8 group">
          <div className="absolute inset-0 border border-[#C5A059]/30 rounded-[48px] rotate-3 scale-105 opacity-40" />
          <div className="relative w-full h-full bg-white/70 backdrop-blur-md border border-[#C5A059]/30 rounded-[44px] overflow-hidden shadow-xl flex items-center justify-center p-6 transition-all duration-700">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/shield-onboarding.png"
                alt="Tu Intercambio está Protegido"
                width={180}
                height={180}
                className="object-contain drop-shadow-md animate-float-slow"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-3 px-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm text-[#C5A059]">shield</span>
            Custodia Segura Estudiantil
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2545] leading-tight tracking-tight">
            Tu Intercambio está <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#C5A059]">Protegido</span>
          </h1>
          <p className="text-[15px] md:text-base text-[#5C6B73] font-medium leading-relaxed max-w-[320px] mx-auto">
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
