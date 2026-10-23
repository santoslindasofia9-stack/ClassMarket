"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import WaveBackground from "@/components/ui/WaveBackground";

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Simulación de carga y verificación de sesión
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedRole = localStorage.getItem("userRole");

    if (isLoggedIn && savedRole) {
      let target = "/home-cliente";
      if (savedRole === "pro") {
        const isVerified = localStorage.getItem("isProVerified") === "true";
        target = isVerified ? "/dashboard-pro" : "/auth/verificacion-pro";
      }
      router.replace(target);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [router]);

  const handleContinue = () => {
    window.location.href = "/onboarding";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-plus-jakarta py-10 px-5 sm:px-6">
      {/* Moving Waves in Celestes & Beiges */}
      <WaveBackground />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg mx-auto">
        
        {/* Seamless Logo Container without harsh white border */}
        <div className="relative mb-5 group">
          <div className="absolute inset-0 bg-[#C5A059]/20 blur-xl opacity-40 rounded-full scale-110" />
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/classmarket-logo.png"
              alt="ClassMarket Logo"
              fill
              className="object-contain drop-shadow-md"
              sizes="(max-width: 640px) 112px, 128px"
              priority
            />
          </div>
        </div>

        {/* Branding Text: Harmonious, elegant typography scale */}
        <div className="space-y-3 mb-7 max-w-md mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2545]/5 border border-[#C5A059]/30 text-[#0B2545] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            CLASSMARKET • Educación e Intercambio Real
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-[#0B2545] tracking-tight leading-snug">
            El Marketplace donde los estudiantes comparten, intercambian y crecen juntos.
          </h1>
          
          <p className="text-xs sm:text-sm text-[#5C6B73] font-medium leading-relaxed max-w-sm mx-auto">
            Aprende con tutorías, intercambia libros, ofrece tus talentos digitales y conecta con tus compañeros en un entorno seguro.
          </p>
        </div>

        {/* Loading Indicator & Action Button */}
        <div className="w-full max-w-[260px] flex flex-col items-center mb-6">
          <div className="w-full h-1.5 bg-[#0B2545]/10 rounded-full overflow-hidden mb-5">
            <div 
              className="h-full bg-gradient-to-r from-[#0B2545] to-[#C5A059] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <button
            onClick={handleContinue}
            className="group relative w-full bg-[#0B2545] hover:bg-[#12335d] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-[#C5A059]/40"
          >
            <span className="relative z-10 text-sm sm:text-base font-semibold">Continuar →</span>
            <div className="absolute inset-0 bg-[#C5A059]/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </button>
        </div>

        {/* Security Footer */}
        <div className="flex items-center gap-1.5 text-[#5C6B73] opacity-75">
          <span className="material-symbols-outlined text-sm text-[#C5A059]">verified_user</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545]">Comunidad Estudiantil Protegida</span>
        </div>
      </div>

    </main>
  );
}
