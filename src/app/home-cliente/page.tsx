"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Search, 
  Bell, 
  Star, 
  MapPin, 
import { 
  Search, 
  Bell, 
  Star, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  Palette, 
  Repeat, 
  Laptop, 
  Sparkles,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/dashboard/BottomNav";

const CATEGORIES = [
  { id: "Tutorias", name: "Tutorías & Clases", icon: BookOpen, color: "bg-[#0B2545]/10", textColor: "text-[#0B2545]" },
  { id: "Creatividad", name: "Diseño & Creatividad", icon: Palette, color: "bg-[#C5A059]/15", textColor: "text-[#0B2545]" },
  { id: "Trueque", name: "Trueque Estudiantil", icon: Repeat, color: "bg-[#D4AF37]/20", textColor: "text-[#0B2545]" },
  { id: "Tecnologia", name: "Tecnología & Apoyo", icon: Laptop, color: "bg-[#0B2545]/15", textColor: "text-[#0B2545]" },
];

const ADS = [
  { 
    id: 1, 
    title: "El Marketplace donde los Estudiantes Comparten, Intercambian y Crecen Juntos", 
    company: "ClassMarket Comunidad", 
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200", // Young students collaborating
    link: "#"
  },
  { 
    id: 2, 
    title: "¿Tienes apuntes o libros? Inicia un trueque académico hoy mismo", 
    company: "Trueque Escolar & Universitario", 
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200", // Students studying with laptops
    link: "#"
  }
];

const FALLBACK_PROS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Clases de Matemáticas & Cálculo Universitario",
    categoria: "Tutorias",
    precio: "$12 / h o Trueque",
    distancia_km: 0.8,
    calificacion: 5.0,
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Diseño de Presentaciones Canva, Infografías & Posters",
    categoria: "Creatividad",
    precio: "$8 por trabajo",
    distancia_km: 1.2,
    calificacion: 4.9,
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f3",
    nombre_completo: "Lucía Fernández",
    titulo_profesional: "Trueque de Libros de Medicina & Resúmenes de Anatomía",
    categoria: "Trueque",
    precio: "Trueque / Gratis",
    distancia_km: 0.4,
    calificacion: 5.0,
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Tutoría de Programación Python, JS y Proyectos Web",
    categoria: "Tecnologia",
    precio: "$15 / h",
    distancia_km: 2.1,
    calificacion: 5.0,
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
];

export default function HomeCliente() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Usuario");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  // States for data
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Profile Dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editName, setEditName] = useState("");

  // Notifications state
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, read: false, icon: "🎉", title: "¡Bienvenido a Tool Link!", body: "Explora cientos de profesionales verificados cerca de ti.", time: "Ahora" },
    { id: 2, read: false, icon: "⭐", title: "Profesional recomendado", body: "Sarah Jenkins está disponible esta semana. ¡Contáctala ahora!", time: "Hace 5 min" },
    { id: 3, read: true, icon: "🔒", title: "Pago protegido activo", body: "Tu saldo en garantía está asegurado y listo para usar.", time: "Hace 1 hora" },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Ads carousel state
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    // ── MODO DEMO: carga inmediata sin Supabase ──
    const currentRole = localStorage.getItem("userRole");
    if (currentRole === "pro") {
      const isVerified = localStorage.getItem("isProVerified") === "true";
      window.location.replace(isVerified ? "/dashboard-pro" : "/auth/verificacion-pro");
      return;
    }

    const savedName = localStorage.getItem("userName") || "Usuario";
    const savedAvatar = localStorage.getItem("userAvatar") || null;
    setUserName(savedName);
    if (savedAvatar) setUserAvatar(savedAvatar);

    // Usar datos de demostración directamente
    setProfessionals(FALLBACK_PROS);
    setLoading(false);
  }, []);

  // Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ADS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filtering Logic
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch = 
      (pro.nombre_completo || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (pro.titulo_profesional || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory ? pro.categoria === activeCategory : true;

    return matchesSearch && matchesCategory;
  });

  // Notification Handlers
  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    setIsProfileOpen(false);
  };
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // Profile Handlers
  const toggleProfile = () => {
    setEditName(userName);
    setIsProfileOpen(!isProfileOpen);
    setIsNotifOpen(false);
  };

  const handleSaveProfile = () => {
    setUserName(editName);
    localStorage.setItem("userName", editName);
    setIsProfileOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUserAvatar(base64String);
        localStorage.setItem("userAvatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9ff]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#0d1c2e]/10 border-t-[#0d1c2e] rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] font-sans pb-24 selection:bg-[#C5A059]/20 overflow-x-hidden">
      
      {/* 1. Header (ClassMarket Navbar) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#0B2545]/10 h-16 md:h-20 flex items-center">
        <div className="max-w-[1280px] mx-auto w-full px-3 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[#0B2545] p-2">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/home-cliente')}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-white flex items-center justify-center p-1 shadow-sm">
                <img 
                  src="/classmarket-logo.png" 
                  alt="ClassMarket Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to stylized CM badge if file isn't loaded
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-[#0B2545] font-extrabold text-xs hidden">CM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-[#0B2545] tracking-tight leading-none flex items-center gap-1.5">
                  ClassMarket
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#0B2545] border border-[#C5A059]/30">Estudiantil</span>
                </span>
                <span className="text-[10px] font-semibold text-[#5C6B73]">Educación e Intercambio Real</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home-cliente" className="text-[#0B2545] font-bold border-b-2 border-[#C5A059] pb-1">Inicio</Link>
            <Link href="/resultados?categoria=Tutorias" className="text-[#5C6B73] hover:text-[#0B2545] font-semibold transition-colors">Tutorías</Link>
            <Link href="/resultados?categoria=Trueque" className="text-[#5C6B73] hover:text-[#0B2545] font-semibold transition-colors">Trueque</Link>
            <Link href="/resultados?categoria=Creatividad" className="text-[#5C6B73] hover:text-[#0B2545] font-semibold transition-colors">Creatividad</Link>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4 relative">
            {/* Bell / Notifications */}
            <div className="relative hidden md:block">
              <button
                onClick={toggleNotif}
                className="p-2 text-[#5e6f79] hover:text-[#0d1c2e] transition-colors relative"
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FCE4EC] border-2 border-white rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-12 right-0 w-80 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#0d1c2e]">Notificaciones</span>
                          {unreadCount > 0 && (
                            <span className="bg-[#FCE4EC] text-[#0d1c2e] text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-xs font-bold text-[#5e6f79] hover:text-[#0d1c2e] transition-colors">
                            Marcar todo leído
                          </button>
                        )}
                      </div>

                      {/* Notification list */}
                      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                            className={`flex gap-3 px-5 py-4 cursor-pointer transition-colors ${
                              !notif.read ? 'bg-[#f8f9ff] hover:bg-[#E0F2FE]/30' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                              {notif.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm leading-tight ${!notif.read ? 'font-bold text-[#0d1c2e]' : 'font-medium text-[#5e6f79]'}`}>
                                  {notif.title}
                                </p>
                                {!notif.read && <span className="w-2 h-2 bg-[#D81B60] rounded-full flex-shrink-0 mt-1" />}
                              </div>
                              <p className="text-xs text-[#5e6f79] mt-0.5 line-clamp-2">{notif.body}</p>
                              <p className="text-[10px] text-gray-400 font-medium mt-1">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 border-t border-gray-100 text-center">
                        <button className="text-xs font-bold text-[#5e6f79] hover:text-[#0d1c2e] transition-colors">
                          Ver todas las notificaciones
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end mr-1">
                <span className="text-sm font-bold text-[#0d1c2e] leading-none">{userName}</span>
                <span className="text-[10px] font-medium text-[#5e6f79]">Cliente</span>
              </div>
              <div 
                onClick={toggleProfile}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e6eeff] cursor-pointer bg-white flex items-center justify-center relative z-50 hover:border-[#FCE4EC] transition-colors"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#0d1c2e] font-bold text-sm uppercase">{userName.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  {/* Invisible overlay to close dropdown when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-14 right-0 w-80 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-6 z-50 origin-top-right"
                  >
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative group cursor-pointer mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f8f9ff] bg-gray-100 flex items-center justify-center shadow-sm">
                          {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[#0d1c2e] font-bold text-2xl uppercase">{userName.charAt(0)}</span>
                          )}
                        </div>
                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                          <span className="text-xs font-bold">Cambiar</span>
                          <span className="text-[10px]">foto</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      <p className="text-xs font-bold text-[#5e6f79] uppercase tracking-wider mb-1">Perfil de Usuario</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-[#0d1c2e] ml-1">Nombre de Usuario</label>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full mt-1 px-4 py-3 bg-[#f8f9ff] border border-gray-200 rounded-xl focus:outline-none focus:border-[#FCE4EC] focus:ring-2 focus:ring-[#FCE4EC] transition-all text-[#0d1c2e] font-medium"
                        />
                      </div>
                      <button 
                        onClick={handleSaveProfile}
                        className="w-full py-3 bg-[#FCE4EC] hover:bg-[#fbd1de] text-[#0d1c2e] font-bold rounded-xl transition-all shadow-sm"
                      >
                        Guardar Cambios
                      </button>

                      <button 
                        onClick={() => router.push('/perfil')}
                        className="w-full py-3 bg-slate-100 hover:bg-[#E0F2FE] hover:text-[#0288D1] text-[#0d1c2e] font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">person</span>
                        <span>Ver Perfil y Actividad</span>
                      </button>

                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <button 
                          onClick={() => {
                            localStorage.removeItem("userRole");
                            localStorage.removeItem("isLoggedIn");
                            window.location.replace("/auth/login");
                          }}
                          className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="pt-20 md:pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          
          {/* 2. Hero Section - ClassMarket */}
          <section className="mb-8 md:mb-16 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#0B2545] text-xs md:text-sm font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              Educación e Intercambio Real
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-[54px] font-extrabold text-[#0B2545] mb-4 md:mb-6 max-w-4xl leading-tight tracking-tight px-2">
              El Marketplace donde los Estudiantes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] via-[#C5A059] to-[#0B2545]">Comparten, Intercambian y Crecen</span> Juntos
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#5C6B73] font-medium mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Aprende tutorías, intercambia libros, ofrece tus talentos digitales y conecta con tus compañeros de clase en un entorno seguro.
            </p>

            {/* Quick Action Badges / CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link 
                href="/resultados"
                className="px-5 py-2.5 rounded-full bg-[#0B2545] text-white font-bold text-sm hover:bg-[#13335c] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Explorar Servicios Escolares</span>
                <span className="material-symbols-outlined text-sm text-[#C5A059]">school</span>
              </Link>
              <Link 
                href="/perfil-y-editor-de-servicios-2"
                className="px-5 py-2.5 rounded-full bg-white text-[#0B2545] border border-[#C5A059]/40 font-bold text-sm hover:bg-[#FAF8F5] transition-all shadow-sm flex items-center gap-2"
              >
                <span>Publicar mi Habilidad</span>
                <span className="material-symbols-outlined text-sm text-[#C5A059]">add_circle</span>
              </Link>
              <Link 
                href="/resultados?categoria=Trueque"
                className="px-5 py-2.5 rounded-full bg-[#C5A059]/20 text-[#0B2545] border border-[#C5A059]/30 font-bold text-sm hover:bg-[#C5A059]/30 transition-all flex items-center gap-2"
              >
                <span>Iniciar Trueque</span>
                <span className="material-symbols-outlined text-sm text-[#0B2545]">swap_horiz</span>
              </Link>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/resultados${searchTerm.trim() ? `?q=${encodeURIComponent(searchTerm)}` : ''}`);
              }}
              className="relative w-full max-w-2xl mx-auto"
            >
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca clases de cálculo, edición de video, libros, programación..." 
                className="w-full h-12 md:h-16 pl-11 md:pl-14 pr-24 md:pr-32 rounded-full border border-[#C5A059]/30 bg-white shadow-sm focus:ring-4 focus:ring-[#C5A059]/20 focus:border-[#0B2545] transition-all text-sm md:text-base font-medium text-[#0B2545] placeholder:text-[#5C6B73]/70 outline-none"
              />
              <Search className="absolute left-3.5 md:left-5 top-1/2 -translate-y-1/2 text-[#5C6B73]" size={20} />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0B2545] text-white px-5 md:px-7 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm hover:bg-[#13335c] transition-all flex items-center justify-center border border-[#C5A059]/30 cursor-pointer shadow-sm"
              >
                Buscar
              </button>
            </form>
          </section>

          {/* 3. Categories (Horizontal scroll) */}
          <section className="mb-12 md:mb-16">
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <Link
                    key={cat.id}
                    href={`/resultados?categoria=${cat.id}`}
                    className="flex-none flex flex-col items-center gap-3 cursor-pointer group min-w-[80px]"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[20px] flex items-center justify-center transition-all duration-300 ${isActive ? cat.color + ' shadow-md scale-105' : 'bg-white shadow-sm border border-gray-100 group-hover:' + cat.color}`}>
                      <Icon className={`w-8 h-8 ${isActive ? cat.textColor : 'text-[#5e6f79] group-hover:' + cat.textColor}`} />
                    </div>
                    <span className={`text-sm font-bold ${isActive ? '#0d1c2e' : 'text-[#5e6f79]'}`}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 4. Featured Highlights Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Hero Card (2 columns) */}
              <div className="lg:col-span-2 relative aspect-[16/10] md:aspect-[21/9] lg:aspect-auto lg:h-[400px] rounded-[24px] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAdIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={ADS[currentAdIndex].image} 
                      alt={ADS[currentAdIndex].title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c2e]/90 via-[#0d1c2e]/30 to-transparent p-6 md:p-10 flex flex-col justify-end">
                      <span className="text-xs font-bold text-[#E0F2FE] mb-2 uppercase tracking-widest">
                        {ADS[currentAdIndex].company}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 max-w-xl leading-tight">
                        {ADS[currentAdIndex].title}
                      </h2>
                      <Link 
                        href="/resultados"
                        className="bg-white text-[#0d1c2e] px-8 py-3.5 rounded-full font-bold w-fit hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Explorar Catálogo
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
                {/* Ad Indicators */}
                <div className="absolute bottom-6 right-8 flex gap-2">
                  {ADS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentAdIndex ? 'bg-white w-6' : 'bg-white/50'}`} />
                  ))}
                </div>
              </div>

              {/* Secondary Info Card (1 column) */}
              <div className="bg-[#FAF8F5] border border-[#C5A059]/30 rounded-[24px] p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-sm">
                <div className="w-20 h-20 bg-[#0B2545] rounded-full flex items-center justify-center mb-6 shadow-md border-2 border-[#C5A059]">
                  <ShieldCheck className="text-[#C5A059] w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2545] mb-3">Comunidad Estudiantil Confiable</h3>
                <p className="text-[#5C6B73] text-sm md:text-base font-medium mb-6">
                  Perfiles estudiantiles validados, reseñas de compañeros reales e intercambios bajo custodia segura.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] bg-[#C5A059]/20 px-4 py-2 rounded-full border border-[#C5A059]/30">
                  <Sparkles size={14} className="text-[#C5A059]" />
                  <span>100% Sin Comisiones Ocultas</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Student Skills & Exchange Feed */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2545] mb-2">
                  {activeCategory ? `Estudiantes en ${activeCategory}` : "Habilidades y Trueques Disponibles"}
                </h2>
                <p className="text-[#5C6B73] font-medium text-sm md:text-base">Conecta con compañeros de tu colegio o universidad.</p>
              </div>
              <button className="text-[#0B2545] font-bold hover:text-[#C5A059] transition-colors hidden md:block">Ver Todos</button>
            </div>

            {filteredProfessionals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProfessionals.map((pro: any) => (
                  <Link 
                    key={pro.id} 
                    href={`/expertos/${pro.id}`}
                    className="group bg-white rounded-[24px] p-4 border border-[#C5A059]/20 hover:border-[#C5A059] hover:shadow-xl hover:shadow-[#0B2545]/5 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-[18px] overflow-hidden mb-4 bg-gray-50">
                      <img 
                        src={pro.foto_perfil || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"} 
                        alt={pro.nombre_completo || "Estudiante"} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-[#C5A059]/30">
                        <Star size={14} className="fill-[#C5A059] text-[#C5A059]" />
                        <span className="text-xs font-bold text-[#0B2545]">{pro.calificacion || "5.0"}</span>
                      </div>
                      {/* Price / Trueque Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#0B2545]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-[#C5A059]/40">
                        <span className="text-[11px] font-bold text-white tracking-wide">
                          {pro.precio || "Trueque / Gratis"}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="text-base font-bold text-[#0B2545] line-clamp-1">{pro.nombre_completo}</h4>
                    <p className="text-[#5C6B73] font-medium text-xs mb-3 line-clamp-2 h-8">{pro.titulo_profesional}</p>
                    
                    <div className="flex items-center justify-between text-[#5C6B73] text-xs mb-4 mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-[#C5A059]" />
                        <span>{pro.distancia_km ? `A ${pro.distancia_km} km` : 'Campus'}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0B2545]">Responde rápido</span>
                    </div>
                    
                    <button className="w-full py-2.5 rounded-full bg-[#FAF8F5] text-[#0B2545] font-bold text-xs group-hover:bg-[#0B2545] group-hover:text-white transition-all border border-[#C5A059]/30 group-hover:border-transparent flex items-center justify-center gap-1.5">
                      <span>Conectar / Chatear</span>
                      <span className="material-symbols-outlined text-sm">chat</span>
                    </button>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-[#f8f9ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#5e6f79]">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#0d1c2e] mb-2">No se encontraron profesionales</h3>
                <p className="text-[#5e6f79]">Intenta buscar con otros términos o cambia la categoría.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setActiveCategory(null); }}
                  className="mt-6 text-[#0d1c2e] font-bold underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
            
            <button className="w-full mt-8 py-4 bg-white border border-gray-200 rounded-full font-bold text-[#0d1c2e] md:hidden">
              Ver Todos los Profesionales
            </button>
          </section>

          {/* 6. Map CTA - Encuentra compañeros en tu campus o vecindario */}
          <section className="relative rounded-[24px] overflow-hidden h-[300px] md:h-[380px] shadow-sm mb-10 border border-[#C5A059]/20">
            <div className="absolute inset-0 bg-[#FAF8F5] flex items-center justify-center">
              <div className="w-full h-full opacity-20" style={{ backgroundImage: "radial-gradient(#0B2545 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[24px] shadow-xl text-center max-w-xl w-full border border-[#C5A059]/30">
                <div className="w-16 h-16 bg-[#0B2545]/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#C5A059]/40">
                  <MapPin className="text-[#0B2545] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Explora en tu Campus o Colegio</h3>
                <p className="text-[#5C6B73] font-medium text-sm md:text-base mb-6">
                  Descubre qué estudiantes ofrecen tutorías, apuntes y trueques cerca de tu ubicación o centro de estudios.
                </p>
                <button
                  onClick={() => router.push('/mapa-expertos')}
                  className="bg-[#0B2545] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#12335d] transition-all shadow-md w-full sm:w-auto active:scale-95 border border-[#C5A059]/40 flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Abrir Mapa de Estudiantes</span>
                  <span className="material-symbols-outlined text-sm text-[#C5A059]">near_me</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <BottomNav />

      {/* Global Styles for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

