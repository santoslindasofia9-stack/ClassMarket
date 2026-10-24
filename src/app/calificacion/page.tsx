'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Star, ShieldCheck, Lock, CheckCircle2, Award, Camera, X, MessageSquare, Search, Home, User } from 'lucide-react';
import Image from 'next/image';
import BottomNav from '@/components/dashboard/BottomNav';

const quickTags = [
  "Explicó muy bien",
  "Puntual y responsable",
  "Domina el tema",
  "Paciencia al enseñar",
  "Entrega a tiempo"
];

const mockPhotos = [
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=300"
];

export default function CalificacionPage() {
  const router = useRouter();
  
  // State
  const [rating, setRating] = useState<number>(4);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300"
  ]);
  const [comment, setComment] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [expertName, setExpertName] = useState<string>('Alex Rivera');
  const [expertImage, setExpertImage] = useState<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuBr7PKkLTLkZtiZc6R7YN01A70SXNomxN6ykcs-mH7V-Et7rS5d8yUVZx3yoyrBqSMpxKTAkyrY2VbEGwTK22uFPObfQXfUYFY96AVlHZyh5uXL07hecOI0GHHGax9RsF3DbhyAX9WgawyfCvmK6MSsvVnY23Nxsl1SI_mEDl5mhVihCF1kWpizNBEyM4mD-hIX8Z3GrXPyjOy4CQi5BCaOfO87HR6pmsL6dDdrcsLoJpYeNHiokz6v-sJ2mzu72uQD0ToW9MT39g');
  const [expertRole, setExpertRole] = useState<string>('Tutor de Programación');

  useEffect(() => {
    const savedName = localStorage.getItem("currentExpertName");
    const savedImage = localStorage.getItem("currentExpertAvatar") || localStorage.getItem("currentExpertImage");
    const savedRole = localStorage.getItem("currentExpertRole");
    
    const fallbackAvatars: Record<string, string> = {
      "Elena Rodríguez": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400",
      "Julián Martínez": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
      "Sofía López": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      "Carlos Torres": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      "Marta Valls": "https://lh3.googleusercontent.com/aida-public/AB6AXuAtczwaCBZDrakoJIvPXavRcfa_YWopKVV-7E7HQr1nuY1tk4Idv_KTZUmHIGTzsIPind-7xfjHamETjNysRRKAQ2ThKrJDlj6a5FhixgOXvC1i6jrRwwX-ysP3e7a9-yOoxp5NBSo4JPs_XDtNyLYRMUdnZsBicPKX-pX_Iv_hg37hGYdoAeMGNiLdo1f6Ed-T0_Ydjpy_b6DDORFaWAIhHLSdMQcDWLI9UOcZw-UVdUucDKpWNB6PVOvoF76-4pbY0nZ0NpBlTQ",
      "David García": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8PciBPx8J_AUKCIHBcXBGUlgRG_SmQklphaaOPBS7Io20uuJq9Yqq-LmnM5BE-jHMcSyCpPIvnICQJWKKlKTgI19ULZNR0yb5Zy2WjUz8C9GFMo8ovXVyg3r11ofkBuX3rfH-4GmDWyNrDpT_y2GPaEybrpRNVbFfVCdj5jBUsHDOQlJ4dx1n1IFo4WvjuYtSZiPl6qsw4viIzPKZwxMjTn_4NAFIUWX18Dnqf0EOhnKuC7df6IwgwyT-oAmPAOQZwqp9EHv3YQ",
      "Valeria Gómez": "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400",
      "Andrés Silva": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      "Lucía Ortiz": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      "Roberto Sánchez": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      "Carolina Ruiz": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      "Diego Castro": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      "Laura Vásquez": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    };

    if (savedName) setExpertName(savedName);
    
    const finalImage = savedImage || (savedName ? fallbackAvatars[savedName] : null);
    if (finalImage) setExpertImage(finalImage);
    
    if (savedRole) setExpertRole(savedRole);
  }, []);

  const getFeedbackLabel = (stars: number) => {
    switch (stars) {
      case 1: return "No me ayudó";
      case 2: return "Regular / Aceptable";
      case 3: return "Buen tutor";
      case 4: return "Excelente ayuda";
      case 5: return "¡Extraordinario!";
      default: return "SELECCIONA LAS ESTRELLAS";
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddPhoto = () => {
    if (photos.length >= 3) {
      alert("Puedes subir un máximo de 3 imágenes para tu reseña.");
      return;
    }
    const nextPhoto = mockPhotos[photos.length % mockPhotos.length];
    setPhotos([...photos, nextPhoto]);
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos(photos.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#f5f0eb] to-[#FAF8F5] text-[#0B2545] font-sans flex flex-col items-center justify-between pb-24 md:pb-8">
      
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-[#0B2545]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-[#e8e0d4]/50 flex justify-between items-center px-4 md:px-10 py-4 h-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div onClick={() => router.push('/home-cliente')} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-[#0B2545] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#C5A059] text-xl">school</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#0B2545]">ClassMarket</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => router.push('/home-cliente')} className="text-sm font-semibold text-slate-500 hover:text-[#C5A059] transition-colors">Inicio</button>
          <button onClick={() => router.push('/resultados')} className="text-sm font-semibold text-slate-500 hover:text-[#C5A059] transition-colors">Buscar</button>
          <button onClick={() => router.push('/chat/f1')} className="text-sm font-semibold text-slate-500 hover:text-[#C5A059] transition-colors">Mensajes</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative p-2 hover:bg-[#FAF8F5] rounded-full transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[#5e6f79]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5A059] rounded-full"></span>
          </div>
          <div onClick={() => router.push('/perfil')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A059]/20 shadow-md hover:scale-105 transition-transform cursor-pointer">
            <Image width={40} height={40} alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA3c1g9Ip7IcE9UP_nubRYFHvrcaytwDfGkSdXQ96ngfLiN4gYGobLrUbzWRlz6K4NzNVPFSCgMdZGClMNESNWUBF_PJBXgJ2pSnQi_KMdCGU-7W5LRByC5hvMsyuctyTpXEDJWD5bcw-UCth5yM4v5Ar_0ubXSAewjHRYExHj-QGAnZeVZeTbqu2F_rU0eyNxARXTPgLbg75MsXMiwKL6BwXOcdFAEwDnxU3xQEnCW2GNmbcoJA8QymE8cQ-uc2zRIGx21SWMig"/>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-24 pt-6 pb-12 flex flex-col items-center z-10 flex-grow">
        
        {/* Title Section */}
        <div className="text-center mb-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] tracking-tight mb-3">¿Cómo fue la tutoría?</h2>
          <p className="text-[#5e6f79] text-sm md:text-base leading-relaxed">Tu valoración ayuda a otros estudiantes a encontrar los mejores tutores y compañeros de estudio en ClassMarket.</p>
        </div>

        {/* Asymmetric Layout Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
          {/* Left Sidebar: Professional Summary & Guarantee */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              
            {/* Professional Summary Card */}
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2rem] border border-[#e8e0d4]/50 shadow-[0_20px_50px_rgba(11,37,69,0.03)] flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mb-4">TUTORÍA CONTRATADA</span>
              
              {/* Profile Image */}
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 bg-[#C5A059]/20 rounded-full blur-xl"></div>
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image width={96} height={96} alt="Professional Avatar" className="w-full h-full object-cover" src={expertImage} />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#0B2545]">{expertName}</h3>
              <span className="text-xs text-[#C5A059] font-semibold bg-[#C5A059]/10 px-3 py-1 rounded-full mt-1">{expertRole}</span>
              
              <div className="w-full border-t border-[#e8e0d4]/50 my-4"></div>
              
              <div className="grid grid-cols-2 gap-4 w-full text-left">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FECHA</span>
                  <p className="text-xs font-bold text-[#0B2545]">24 May, 2026</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INVERSIÓN</span>
                  <p className="text-xs font-bold text-[#C5A059]">$25.00 USD</p>
                </div>
              </div>
            </div>

            {/* Trust Indicator Card */}
            <div className="bg-gradient-to-br from-[#0B2545]/5 to-white p-6 rounded-[2rem] border border-[#0B2545]/10 flex gap-4 items-start shadow-sm">
              <ShieldCheck className="text-[#0B2545] shrink-0 bg-white p-2 w-11 h-11 rounded-2xl shadow-sm" />
              <div>
                <h4 className="text-sm font-bold text-[#0B2545]">Reseña Verificada</h4>
                <p className="text-xs text-[#5e6f79] mt-1 leading-relaxed">Tu calificación está respaldada por una tutoría real completada en ClassMarket, garantizando honestidad e imparcialidad.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Review Form */}
          <div className="lg:col-span-7 w-full bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-[#e8e0d4]/50 shadow-[0_20px_50px_rgba(11,37,69,0.05)]">
              
            {/* Step 1: Star Selection */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">TOCA PARA CALIFICAR</span>
              
              <div className="flex items-center gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className="p-1 active:scale-95 transition-transform"
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(idx)}
                  >
                    <Star 
                      size={44} 
                      className={`transition-all duration-200 ${
                        idx <= (hoverRating || rating)
                          ? 'text-[#C5A059] fill-[#C5A059] scale-110'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <span className="font-bold text-xs text-[#0B2545] bg-[#C5A059]/10 px-4 py-1.5 rounded-full tracking-wider mt-1 uppercase">
                {getFeedbackLabel(hoverRating || rating)}
              </span>
            </div>

            {/* Step 2: Selectable Quick Tags */}
            <div className="mb-6">
              <label className="block font-bold text-sm text-[#0B2545] uppercase tracking-wider mb-3">¿Qué destacó de la tutoría?</label>
              <div className="flex flex-wrap gap-2.5">
                {quickTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#0B2545] border-[#0B2545] text-[#C5A059] shadow-sm' 
                          : 'bg-[#FAF8F5] border-[#e8e0d4] text-[#5e6f79] hover:bg-[#C5A059]/10 hover:text-[#0B2545]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Detailed Feedback Comment */}
            <div className="mb-6">
              <label className="block font-bold text-sm text-[#0B2545] uppercase tracking-wider mb-3" htmlFor="review-comment">Tu comentario</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-2xl border-[#e8e0d4] bg-[#FAF8F5]/50 p-4 text-sm focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] outline-none transition-all placeholder:text-slate-400 resize-none font-medium text-[#0B2545]" 
                id="review-comment" 
                placeholder="¿Cómo fue la tutoría? ¿Aprendiste lo que necesitabas?" 
                rows={4}
              />
            </div>

            {/* Step 4: Photos Mock Upload */}
            <div className="mb-8">
              <span className="block font-bold text-sm text-[#0B2545] uppercase tracking-wider mb-3">Compartir fotos (Opcional)</span>
              <div className="flex flex-wrap gap-3 items-center">
                <button 
                  type="button" 
                  onClick={handleAddPhoto}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-[#C5A059]/30 hover:border-[#C5A059] flex flex-col items-center justify-center text-slate-400 hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all group"
                >
                  <Camera size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">Añadir</span>
                </button>
                
                {/* Dynamic Preview Container */}
                <div className="flex gap-3">
                  <AnimatePresence>
                    {photos.map((url, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative group shadow-sm border border-[#e8e0d4]"
                      >
                        <Image width={96} height={96} alt="Preview" className="w-full h-full object-cover" src={url} />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePhoto(idx)} 
                          className="absolute top-1.5 right-1.5 bg-white/90 text-slate-500 hover:text-red-600 rounded-full p-1 shadow-sm transition-all"
                        >
                          <X size={12} className="stroke-[3px]" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Publicar Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-5 border-t border-[#e8e0d4]/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <Lock size={14} />
                <span>Envío seguro de opinión</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowSuccessModal(true)}
                className="w-full sm:w-auto bg-[#0B2545] hover:bg-[#0d2f5c] text-[#C5A059] font-bold px-10 py-4 rounded-full text-base transition-all active:scale-95 shadow-sm hover:scale-[1.01]"
              >
                Publicar Reseña
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Confetti/Success Modal Overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Simple Dynamic Confetti Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-sm opacity-80"
                  style={{
                    backgroundColor: ['#0B2545', '#C5A059', '#f59e0b', '#10b981', '#6366f1'][i % 5],
                    left: `${Math.random() * 100}%`,
                    top: `-10px`,
                    animation: `confetti-fall 3.5s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-[#e8e0d4] relative z-10"
            >
              <div className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-[#C5A059] rounded-full blur-lg opacity-25 animate-pulse"></div>
                <CheckCircle2 size={40} className="text-[#C5A059] z-10" />
              </div>
              
              <h3 className="text-2xl font-extrabold text-[#0B2545] tracking-tight mb-2">¡Reseña Publicada!</h3>
              <p className="text-[#5e6f79] text-sm leading-relaxed mb-6">Gracias por ayudar a la comunidad estudiantil. Tu opinión ha sido publicada exitosamente en ClassMarket.</p>
              
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#e8e0d4] text-left mb-6">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Puntos de Reputación</span>
                  <span className="text-[#C5A059] font-bold">+50 XP</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#C5A059] to-[#d4b06a] h-full rounded-full w-4/5"></div>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/home-cliente');
                }}
                className="w-full bg-[#0B2545] hover:bg-[#0d2f5c] text-[#C5A059] font-bold py-4 rounded-full shadow-md active:scale-95 transition-all text-sm uppercase tracking-wider"
              >
                Volver al Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS Inject for Confetti Animation */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Shared Bottom Navigation (Mobile Only) */}
      <BottomNav />
    </div>
  );
}
