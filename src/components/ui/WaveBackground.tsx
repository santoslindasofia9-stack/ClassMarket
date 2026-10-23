"use client";

import React from "react";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Fondo base suave pastel crema cálido */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F6F4ED] to-[#FAF8F5]" />

      {/* SVG Ondas Orgánicas Suaves y Continuas */}
      <svg
        className="absolute inset-0 w-full h-full preserve-3d pointer-events-none opacity-80"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="celesteGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beigeGrad1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="celesteGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DDF4FF" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="goldAccent" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Onda 1: Superior Izquierda Celeste (Flotante) */}
        <path
          className="animate-wave origin-top-left"
          style={{ animationDuration: "16s" }}
          d="M-100,-50 C300,120 450,-80 850,90 C1200,240 1350,110 1600,-20 L1600,-150 L-100,-150 Z"
          fill="url(#celesteGrad1)"
        />

        {/* Onda 2: Inferior Derecha Beige / Crema Cálido */}
        <path
          className="animate-wave origin-bottom-right"
          style={{ animationDuration: "20s", animationDelay: "2s" }}
          d="M1550,950 C1200,750 1000,980 650,820 C350,680 150,840 -100,780 L-100,1050 L1550,1050 Z"
          fill="url(#beigeGrad1)"
        />

        {/* Onda 3: Transversal Central Celeste Suave */}
        <path
          className="animate-wave"
          style={{ animationDuration: "22s", animationDelay: "5s" }}
          d="M-50,450 C320,380 500,560 900,430 C1250,320 1380,500 1550,420 L1550,650 C1250,720 950,580 600,680 C300,760 100,620 -50,690 Z"
          fill="url(#celesteGrad2)"
        />

        {/* Onda 4: Destello cálido inferior dorado */}
        <path
          className="animate-wave origin-center"
          style={{ animationDuration: "26s", animationDelay: "8s" }}
          d="M200,900 C450,700 800,850 1100,720 C1350,610 1500,780 1600,730 L1600,1000 L200,1000 Z"
          fill="url(#goldAccent)"
        />
      </svg>

      {/* Capas Difusas Atmosféricas para textura suave y continua */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#E0F2FE]/40 blur-[110px] animate-blob pointer-events-none" 
      />
      <div 
        className="absolute -bottom-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#FFFBEB]/60 blur-[120px] animate-blob [animation-delay:4s] pointer-events-none" 
      />
      <div 
        className="absolute top-[30%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-[#C5A059]/8 blur-[90px] animate-blob-slow [animation-delay:7s] pointer-events-none" 
      />
    </div>
  );
}
