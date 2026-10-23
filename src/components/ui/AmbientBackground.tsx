"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base soft warm backdrop */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* Blob 1: Light Soft Pastel Blue - Top Right */}
      <div className="absolute top-[-15%] right-[-10%] w-[85vw] max-w-[700px] h-[85vw] max-h-[700px] bg-[#E0F2FE]/60 rounded-full blur-[120px] animate-blob" />

      {/* Blob 2: Warm Soft Cream / Gold - Bottom Left */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[90vw] max-w-[750px] h-[90vw] max-h-[750px] bg-[#FFFBEB]/70 rounded-full blur-[130px] animate-blob [animation-delay:6s]" />

      {/* Blob 3: Soft Accent Pastel Blue / Beige - Center Drift */}
      <div className="absolute top-[35%] left-[15%] w-[60vw] max-w-[500px] h-[60vw] max-h-[500px] bg-[#F5EFEB]/80 rounded-full blur-[100px] animate-blob-slow [animation-delay:3s]" />

      {/* Blob 4: Subtle Golden Sparkle glow */}
      <div className="absolute bottom-[20%] right-[10%] w-[45vw] max-w-[400px] h-[45vw] max-h-[400px] bg-[#C5A059]/10 rounded-full blur-[90px] animate-blob [animation-delay:9s]" />
    </div>
  );
}
