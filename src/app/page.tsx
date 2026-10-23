"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/ui/AmbientBackground";

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
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-plus-jakarta py-12 px-6">
      {/* Shared Ambient Animated Background */}
      <AmbientBackground />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl px-4">
        
        {/* Logo Container with Navy & Gold Accent Frame (Well-proportioned, doesn't clip) */}
        <div className="relative mb-6 sm:mb-8 group">
          {/* Ambient Glow in Gold */}
          <div className="absolute inset-0 bg-[#C5A059]/20 blur-2xl opacity-40 rounded-full scale-125 animate-soft-pulse" />
          
          {/* Scaled & balanced card frame */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-white/95 backdrop-blur-md border border-[#C5A059]/30 rounded-[32px] overflow-hidden shadow-[0_16px_40px_-10px_rgba(11,37,69,0.12)] flex items-center justify-center transform transition-transform group-hover:scale-105 duration-500">
            {/* Subtle Gold Shimmer Effect */}
            <div className="absolute inset-0 shimmer-effect opacity-20 pointer-events-none" />
            
            <div className="relative w-full h-full p-3.5 flex items-center justify-center">
              <Image
                src="/classmarket-logo.png"
                alt="ClassMarket Logo"
                fill
                className="object-contain p-2 drop-shadow-sm"
                sizes="(max-width: 640px) 144px, 176px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Branding Text with Breathing Room */}
        <div className="space-y-4 mb-8 sm:mb-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#C5A059]/35 text-[#0B2545] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            CLASSMARKET • Educación e Intercambio Real
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-[#0B2545] tracking-tight leading-[1.25]">
            El Marketplace donde los estudiantes comparten, intercambian y crecen juntos.
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-[#5C6B73] font-medium leading-relaxed max-w-lg mx-auto pt-1">
            Aprende con tutorías, intercambia libros, ofrece tus talentos digitales y conecta con tus compañeros de clase en un entorno seguro.
          </p>
        </div>

        {/* Loading Indicator & Action Button */}
        <div className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center mb-8">
          <div className="w-full h-1.5 bg-[#0B2545]/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-[#0B2545] to-[#C5A059] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Action Button: Primary Navy (#0B2545), well-proportioned */}
          <button
            onClick={handleContinue}
            className="group relative w-full bg-[#0B2545] hover:bg-[#12335d] text-white font-bold py-3.5 sm:py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 border border-[#C5A059]/40"
          >
            <span className="relative z-10 text-base sm:text-lg">Continuar →</span>
            <div className="absolute inset-0 bg-[#C5A059]/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </button>
        </div>

        {/* Security Footer */}
        <div className="flex items-center gap-2 text-[#5C6B73] opacity-75">
          <span className="material-symbols-outlined text-base text-[#C5A059]">verified_user</span>
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#0B2545]">Comunidad Estudiantil Protegida</span>
        </div>
      </div>

    </main>
  );
}
