import { supabase } from "@/lib/supabase";
import ProfessionalCard from "@/components/resultados/ProfessionalCard";
import Link from "next/link";
import BottomNav from "@/components/dashboard/BottomNav";

export const dynamic = 'force-dynamic';

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Tutorías de Matemáticas, Álgebra y Física para 10° y 11°.",
    categoria: "Matemáticas & Ciencias",
    calificacion: 5,
    tarifa: 10,
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Guías resueltas, talleres de Química Orgánica y Biología escolar.",
    categoria: "Tareas & Guías",
    calificacion: 5,
    tarifa: 7,
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f3",
    nombre_completo: "Sofía Salazar",
    titulo_profesional: "Clases de Inglés conversacional, vocabulario y preparación Saber 11.",
    categoria: "Tutorías & Clases",
    calificacion: 5,
    tarifa: 12,
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Proyectos en Python, JavaScript, HTML y apoyo en informática colegial.",
    categoria: "Programación & Tecnologías",
    calificacion: 5,
    tarifa: 14,
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f5",
    nombre_completo: "Valentina Gómez",
    titulo_profesional: "Trueque de Libros de Cálculo, resúmenes de Historia y Filosofía.",
    categoria: "Tareas & Guías",
    calificacion: 5,
    tarifa: 5,
    foto_perfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f6",
    nombre_completo: "Sebastián Rincón",
    titulo_profesional: "Preparación de exámenes de Trigonometría, Geometría y Aritmética.",
    categoria: "Matemáticas & Ciencias",
    calificacion: 5,
    tarifa: 9,
    foto_perfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f7",
    nombre_completo: "Mariana Silva",
    titulo_profesional: "Diseño de diapositivas interactivas en Canva y pósters para exposiciones.",
    categoria: "Tareas & Guías",
    calificacion: 4.9,
    tarifa: 8,
    foto_perfil: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f8",
    nombre_completo: "Andrés Silva",
    titulo_profesional: "Resolución de ejercicios de Física Mecánica y apoyo para bachillerato.",
    categoria: "Matemáticas & Ciencias",
    calificacion: 4.8,
    tarifa: 11,
    foto_perfil: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&crop=face"
  }
];

export default async function ResultadosBusqueda({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const categoria = typeof params.categoria === "string" ? params.categoria : "";

  // ── Fetch Supabase ────────────────────────────────────────────────────────
  let dbQuery = supabase
    .from("perfiles_profesionales")
    .select("id, nombre_completo, titulo_profesional, categoria, calificacion, tarifa, foto_perfil");

  if (query) {
    dbQuery = dbQuery.or(`nombre_completo.ilike.%${query}%,titulo_profesional.ilike.%${query}%`);
  }
  
  if (categoria) {
    dbQuery = dbQuery.ilike("categoria", `%${categoria}%`);
  }

  const { data: experts, error } = await dbQuery;

  // Fallback si no hay data o hay error
  let displayedExperts = (experts && experts.length > 0) ? experts : FALLBACK_EXPERTS;
  
  // If fallback is used, simulate filtering for demo purposes
  if (displayedExperts === FALLBACK_EXPERTS) {
    if (query) {
      const filtered = displayedExperts.filter(e => 
        e.nombre_completo.toLowerCase().includes(query.toLowerCase()) || 
        e.titulo_profesional.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        displayedExperts = filtered;
      }
    }
    if (categoria) {
      const filtered = displayedExperts.filter(e => 
        e.categoria.toLowerCase() === categoria.toLowerCase()
      );
      if (filtered.length > 0) {
        displayedExperts = filtered;
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] font-sans overflow-x-hidden pb-24">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex justify-between items-center w-full px-4 lg:px-8 py-3 bg-white/90 backdrop-blur-md border-b border-sky-50 flex-shrink-0"
        style={{ boxShadow: "0 1px 12px rgba(13,28,46,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/home-cliente"
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#5e6f79] hover:text-[#0d1c2e] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <Link href="/home-cliente" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-white flex items-center justify-center p-1 shadow-sm">
              <img src="/classmarket-logo.png" alt="ClassMarket" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold text-[#0B2545] tracking-tight leading-none flex items-center gap-1.5">
                ClassMarket
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#0B2545] border border-[#C5A059]/30">Estudiantil</span>
              </span>
              <span className="text-[10px] font-semibold text-[#5C6B73]">Educación e Intercambio Real</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="flex-grow container mx-auto max-w-[1280px] px-4 md:px-10 py-8 md:py-14">
        
        {/* Encabezado de Resultados */}
        <div className="mb-8 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[12px] text-[#C5A059] mb-3 block uppercase tracking-[0.2em] font-extrabold">
              Comunidad Escolar & Universitaria
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B2545] leading-tight">
              Tutorías y Guías de Estudiantes
            </h2>
            <p className="text-base sm:text-lg text-[#5C6B73] mt-3 max-w-lg leading-relaxed">
              Encuentra compañeros destacados para recibir clases de apoyo, resolver talleres o intercambiar material académico.
            </p>
          </div>
        </div>

        {/* Grid de Tarjetas */}
        {displayedExperts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayedExperts.map((expert) => (
              <ProfessionalCard
                key={expert.id}
                id={expert.id}
                nombre_completo={expert.nombre_completo}
                titulo_profesional={expert.titulo_profesional}
                calificacion={expert.calificacion}
                reseñas={Math.floor(Math.random() * 200) + 10} // Dummy data for reviews as it's not in DB
                tarifa={expert.tarifa || "$50"}
                foto_perfil={expert.foto_perfil}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-[#f8f9ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#5e6f79]">
              <span className="material-symbols-outlined text-[32px]">search</span>
            </div>
            <h3 className="text-lg font-bold text-[#0d1c2e] mb-2">No se encontraron profesionales</h3>
            <p className="text-[#5e6f79]">Intenta buscar con otros términos o cambia la categoría.</p>
            <Link 
              href="/home-cliente"
              className="mt-6 inline-block text-[#0288D1] font-bold underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Botón de Carga */}
        {displayedExperts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-[#0288D1] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#0277bd] hover:shadow-lg transition-all duration-300 active:scale-95">
              Cargar más resultados
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
