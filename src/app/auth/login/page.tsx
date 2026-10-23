"use client";

import { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Briefcase, Eye, EyeOff, Check, Phone, ArrowLeft, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import WaveBackground from "@/components/ui/WaveBackground";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialMode = (searchParams.get("mode") as "login" | "register") || "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"client" | "pro">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // No necesitamos listener de OAuth aquí — Google redirige directo a /home-cliente

  // Sincronizar modo con query param
  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register" || m === "login") {
      setMode(m);
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        // — REGISTRO con Supabase —
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              nombre_completo: formData.username,
              telefono: formData.phone,
              rol: role,
            },
          },
        });

        if (signUpError) throw signUpError;

        const displayName = formData.username || data.user?.email?.split("@")[0] || "Usuario";
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", displayName);
        localStorage.setItem("isLoggedIn", "true");
        router.push(role === "client" ? "/home-cliente" : "/auth/verificacion-pro");

      } else {
        // — INICIO DE SESIÓN con Supabase —
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        const displayName =
          data.user?.user_metadata?.nombre_completo ||
          data.user?.user_metadata?.full_name ||
          formData.email.split("@")[0] ||
          "Usuario";

        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", displayName);
        localStorage.setItem("isLoggedIn", "true");
        router.push(role === "client" ? "/home-cliente" : "/auth/verificacion-pro");
      }
    } catch (err: any) {
      console.warn("Supabase no disponible, entrando en modo demo:", err.message);

      // ── FALLBACK DEMO: si Supabase falla por red, igual entra ──
      const isFetchError =
        err.message?.includes("fetch") ||
        err.message?.includes("network") ||
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError") ||
        !navigator.onLine;

      if (isFetchError) {
        // Sin conexión a Supabase → modo demo automático
        const displayName = formData.username || formData.email.split("@")[0] || "Usuario";
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", displayName);
        localStorage.setItem("isLoggedIn", "true");
        router.push(role === "client" ? "/home-cliente" : "/auth/verificacion-pro");
        return;
      }

      // Error real de Supabase (credenciales incorrectas, etc.)
      const msg = err.message || "";
      if (msg.includes("Email not confirmed")) {
        setError("Confirma tu correo electrónico antes de iniciar sesión.");
      } else if (msg.includes("Invalid login credentials") || msg.includes("invalid_credentials")) {
        setError("El correo o la contraseña son incorrectos.");
      } else if (msg.includes("User already registered")) {
        setError("Ya existe una cuenta con este correo. Intenta iniciar sesión.");
      } else {
        setError(msg || "Ocurrió un error. Inténtalo de nuevo.");
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      localStorage.setItem("userRole", role);
      localStorage.setItem("isLoggedIn", "true");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `https://trustmarke-qjy2.vercel.app/auth/callback?role=${role}`,
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) throw error;
      // Redirige automáticamente a Google
    } catch (err: any) {
      console.error("Google Auth failed:", err);
      // Fallback demo si Google OAuth no está configurado
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", "Usuario Google");
      localStorage.setItem("isLoggedIn", "true");
      router.push(role === "client" ? "/home-cliente" : "/auth/verificacion-pro");
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FAF8F5] font-plus-jakarta overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Moving Waves Background */}
      <WaveBackground />

      <div className="relative z-10 w-full max-w-5xl min-h-[620px] flex flex-col lg:flex-row rounded-[36px] overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_24px_70px_-15px_rgba(11,37,69,0.12)]">
        {/* Lado Izquierdo: Grupo de jóvenes estudiantes debatiendo en la biblioteca/aula */}
        <div className="hidden lg:flex w-1/2 p-6 items-center justify-center">
          <div className="relative w-full h-full min-h-[560px] rounded-[28px] overflow-hidden shadow-md group border border-[#C5A059]/30">
            <Image
              src="/students-study-group.jpg"
              alt="Grupo de estudiantes en ClassMarket"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Gradient Overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/95 via-[#0B2545]/40 to-transparent" />
            
            {/* Floating Info Pill */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              Comunidad Activa
            </div>

            {/* Bottom Card Copy */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/15 backdrop-blur-xl border border-white/25 rounded-[24px] text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#0B2545] flex items-center justify-center text-[#C5A059] shadow-xs">
                      <User size={12} />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#C5A059] flex items-center justify-center text-[9px] font-extrabold text-[#0B2545] shadow-xs">
                    +1k
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#FFFBEB] tracking-wide uppercase">Estudiantes Conectados</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold mb-1.5 leading-snug">Aprende, colabora y crece con compañeros reales.</h2>
              <p className="text-white/85 text-xs font-medium leading-relaxed">Accede a tutorías, intercambia materiales académicos y desarrolla proyectos escolares juntos.</p>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario integrado en el pastel layout */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-12">
          <div className="w-full max-w-md space-y-7 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-[#C5A059]/15 shadow-sm">

            {/* Botón volver (solo en registro) */}
            {mode === "register" && (
              <button
                onClick={() => setMode("login")}
                className="flex items-center gap-2 text-sm font-bold text-[#5C6B73] hover:text-[#0B2545] transition-colors"
              >
                <ArrowLeft size={16} />
                Volver al inicio de sesión
              </button>
            )}

            {/* Título */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2545]/5 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C5A059]/30">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                ClassMarket
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta estudiantil"}
              </h1>
              <p className="text-[#5C6B73] font-medium text-sm md:text-base">
                {mode === "login" ? "Accede a tu cuenta de ClassMarket para continuar" : "Únete a la comunidad de trueque y tutorías entre estudiantes"}
              </p>
            </div>

            {/* Selector de Rol: Soy Estudiante vs Busco Tutoría/Servicios */}
            <div className="bg-[#FAF8F5] p-1.5 rounded-[24px] flex relative border border-[#C5A059]/20">
              <motion.div
                className="absolute top-1.5 bottom-1.5 bg-[#0B2545] rounded-[20px] shadow-sm"
                initial={false}
                animate={{
                  x: role === "client" ? 0 : "100%",
                  left: role === "client" ? "4px" : "-4px",
                  width: "calc(50% - 0px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-xs md:text-sm font-bold transition-colors duration-300 ${role === "client" ? "text-white" : "text-[#5C6B73]"}`}
              >
                <User size={16} />
                Busco Tutoría/Servicios
              </button>
              <button
                type="button"
                onClick={() => setRole("pro")}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-xs md:text-sm font-bold transition-colors duration-300 ${role === "pro" ? "text-white" : "text-[#5C6B73]"}`}
              >
                <Briefcase size={16} />
                Soy Estudiante
              </button>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* Formulario */}
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleAuth}
                className="space-y-5"
              >
                {/* Campos solo para registro */}
                {mode === "register" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0d1c2e] ml-1">Nombre</label>
                      <div className="relative group">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d1c2e] transition-colors" size={20} />
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre completo"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FCE4EC] focus:ring-4 focus:ring-[#FCE4EC]/30 transition-all text-[#0d1c2e] font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0d1c2e] ml-1">Teléfono</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d1c2e] transition-colors" size={20} />
                        <input
                          type="tel"
                          placeholder="+57 300 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FCE4EC] focus:ring-4 focus:ring-[#FCE4EC]/30 transition-all text-[#0d1c2e] font-medium"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Correo */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#0d1c2e] ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d1c2e] transition-colors" size={20} />
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FCE4EC] focus:ring-4 focus:ring-[#FCE4EC]/30 transition-all text-[#0d1c2e] font-medium"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-[#0d1c2e]">Contraseña</label>
                    {mode === "login" && (
                      <button type="button" className="text-xs font-bold text-[#5e6f79] hover:text-[#0d1c2e] transition-colors">
                        ¿Olvidaste tu clave?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d1c2e] transition-colors" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FCE4EC] focus:ring-4 focus:ring-[#FCE4EC]/30 transition-all text-[#0d1c2e] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0d1c2e] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Recuérdame */}
                {mode === "login" && (
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-[#FCE4EC] peer-checked:border-[#FCE4EC] transition-all" />
                      <Check className="absolute text-[#0d1c2e] opacity-0 peer-checked:opacity-100 transition-opacity" size={14} strokeWidth={4} />
                    </div>
                    <span className="text-sm font-bold text-[#5e6f79] group-hover:text-[#0d1c2e] transition-colors">Recuérdame</span>
                  </label>
                )}

                {/* Botón principal: Primary Navy (#0B2545) with white text */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#0B2545] hover:bg-[#12335d] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-[#C5A059]/40 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {mode === "login" ? "Iniciando sesión..." : "Creando cuenta..."}
                    </>
                  ) : (
                    mode === "login" ? "Iniciar Sesión" : "Registrarme"
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            {/* Divisor */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-[#5e6f79] tracking-wider text-xs font-bold">
                  O CONTINÚA CON
                </span>
              </div>
            </div>

            {/* Google */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
              </button>
            </div>

            {/* Footer toggle */}
            <p className="text-center text-sm font-medium text-[#5e6f79]">
              {mode === "login" ? (
                <>
                  ¿No tienes una cuenta?{" "}
                  <button onClick={() => setMode("register")} className="font-bold text-[#0d1c2e] hover:underline transition-all">
                    Regístrate gratis
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes una cuenta?{" "}
                  <button onClick={() => setMode("login")} className="font-bold text-[#0d1c2e] hover:underline transition-all">
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-4 border-[#FCE4EC] border-t-[#0d1c2e] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
