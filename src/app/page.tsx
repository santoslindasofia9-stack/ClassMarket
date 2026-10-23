"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Simulación de carga y verificación de sesión
  useEffect(() => {
    // Verificar si ya hay una sesión activa real para saltar el splash
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
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#fffef5] font-plus-jakarta p-6">
      {/* Background Waves (Total Coverage) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Wave Layer 1: Celeste (Large coverage) */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[#E0F2FE]/40 rounded-[45%] animate-wave" />
        
        {/* Wave Layer 2: Rosita (Large coverage) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[130%] h-[130%] bg-[#FCE4EC]/40 rounded-[43%] animate-wave [animation-delay:5s]" />
        
        {/* Wave Layer 3: Beige (Middle fill) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#FFFDD0]/30 rounded-[40%] animate-wave [animation-delay:10s]" />

        {/* Wave Layer 4: Celeste (Bottom Left accent) */}
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#E0F2FE]/30 rounded-[48%] animate-wave [animation-delay:2s]" />
        
        {/* Wave Layer 5: Rosita (Top Right accent) */}
        <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#FCE4EC]/30 rounded-[42%] animate-wave [animation-delay:7s]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl px-4">
        
        {/* Logo Container with Navy & Gold Accent Frame */}
        <div className="relative mb-8 group">
          {/* Ambient Glow in Gold */}
          <div className="absolute inset-0 bg-[#C5A059]/20 blur-3xl opacity-30 rounded-full scale-150 animate-soft-pulse" />
          
          {/* Frame with Navy and subtle Gold border */}
          <div className="relative w-44 h-44 md:w-56 md:h-56 bg-white border-[3px] border-[#0B2545] rounded-[48px] overflow-hidden shadow-2xl flex items-center justify-center transform transition-transform group-hover:scale-105 duration-700">
            {/* Subtle Gold Shimmer Effect */}
            <div className="absolute inset-0 shimmer-effect opacity-15" />
            
            <div className="relative w-full h-full p-3 flex items-center justify-center">
              <Image
                src="/classmarket-logo.png"
                alt="ClassMarket Logo"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 176px, 224px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Branding Text */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2545]/10 border border-[#C5A059]/40 text-[#0B2545] text-xs md:text-sm font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            CLASSMARKET - Educación e Intercambio Real
          </div>
          <h1 className="text-3xl md:text-[46px] font-extrabold text-[#0B2545] tracking-tight leading-tight">
            El Marketplace donde los estudiantes comparten, intercambian y crecen juntos.
          </h1>
          <p className="text-body-lg md:text-xl text-[#5C6B73] font-medium max-w-lg mx-auto">
            Aprende con tutorías, intercambia libros, ofrece tus talentos digitales y conecta con tus compañeros de clase en un entorno seguro.
          </p>
        </div>

        {/* Loading Indicator & Action Button */}
        <div className="w-full max-w-[300px] flex flex-col items-center mb-10">
          <div className="w-full h-2 bg-[#0B2545]/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-[#0B2545] to-[#C5A059] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Action Button: Primary Navy (#0B2545), white text, hover effect, with text 'Continuar →' */}
          <button
            onClick={handleContinue}
            className="group relative w-full bg-[#0B2545] hover:bg-[#12335d] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center gap-3 border border-[#C5A059]/40"
          >
            <span className="relative z-10 text-lg">Continuar →</span>
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
