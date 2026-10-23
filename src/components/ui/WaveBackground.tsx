"use client";

import React from "react";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Fondo base suave beige crema */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* Onda Celeste Suave 1 (Capa superior izquierda) */}
      <div 
        className="absolute -top-[25%] -left-[20%] w-[130%] h-[110%] bg-[#E0F2FE]/45 rounded-[43%] animate-wave pointer-events-none"
        style={{ animationDuration: "18s" }}
      />

      {/* Onda Beige Cálida / Crema (Capa inferior derecha) */}
      <div 
        className="absolute -bottom-[25%] -right-[15%] w-[135%] h-[115%] bg-[#FFFBEB]/75 rounded-[41%] animate-wave pointer-events-none"
        style={{ animationDuration: "22s", animationDelay: "3s" }}
      />

      {/* Onda Celeste Menta / Pastel (Capa flotante central) */}
      <div 
        className="absolute top-[25%] -left-[15%] w-[120%] h-[90%] bg-[#E0F2FE]/30 rounded-[45%] animate-wave pointer-events-none"
        style={{ animationDuration: "26s", animationDelay: "7s" }}
      />

      {/* Onda Beige Suave de Acento (Superior derecha) */}
      <div 
        className="absolute -top-[15%] -right-[20%] w-[100%] h-[90%] bg-[#F5EFEB]/70 rounded-[42%] animate-wave pointer-events-none"
        style={{ animationDuration: "20s", animationDelay: "11s" }}
      />

      {/* Destello sutil dorado en el fondo para integrar la paleta ClassMarket */}
      <div 
        className="absolute bottom-[10%] left-[20%] w-[500px] h-[350px] bg-[#C5A059]/8 rounded-full blur-[90px] animate-blob pointer-events-none"
      />
    </div>
  );
}
