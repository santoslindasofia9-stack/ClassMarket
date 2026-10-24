import { supabase } from "@/lib/supabase";
import ProfessionalCard from "@/components/resultados/ProfessionalCard";
import Link from "next/link";
import BottomNav from "@/components/dashboard/BottomNav";

export const dynamic = 'force-dynamic';

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres (17 años)",
    titulo_profesional: "Tutorías de Matemáticas, Álgebra y Física 10°-11° con ejercicios resueltos paso a paso.",
    categoria: "MatematicasCiencias",
    calificacion: 5,
    tarifa: "$10 / h o Trueque",
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela (18 años)",
    titulo_profesional: "Apoyo en guías y talleres de Química Orgánica, Biología y Ciencias Naturales escolares.",
    categoria: "TareasGuias",
    calificacion: 4.9,
    tarifa: "$7 por guía",
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f3",
    nombre_completo: "Sofía Salazar (16 años)",
    titulo_profesional: "Clases de Inglés conversacional, gramática y preparación intensiva para Pruebas Saber 11.",
    categoria: "TutoriasClases",
    calificacion: 5,
    tarifa: "$12 / h",
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales (19 años)",
    titulo_profesional: "Proyectos en Python, JavaScript, páginas HTML y videojuegos básicos en Scratch.",
    categoria: "ProgramacionTecnologias",
    calificacion: 5,
    tarifa: "$14 / h",
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f5",
    nombre_completo: "Valentina Gómez (17 años)",
    titulo_profesional: "Intercambio y trueque de libros de Cálculo, apuntes de Filosofía y resúmenes de Historia.",
    categoria: "TareasGuias",
    calificacion: 4.8,
    tarifa: "Trueque de Libros",
    foto_perfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f6",
    nombre_completo: "Sebastián Rincón (18 años)",
    titulo_profesional: "Preparación para parciales de Trigonometría, Geometría Analítica y Álgebra Lineal.",
    categoria: "MatematicasCiencias",
    calificacion: 5,
    tarifa: "$9 / h",
    foto_perfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f7",
    nombre_completo: "Lucía Ortiz (17 años)",
    titulo_profesional: "Tutorías de Lenguaje, comprensión lectora y redacción de ensayos académicos.",
    categoria: "TutoriasClases",
    calificacion: 4.9,
    tarifa: "$8 / h o Trueque",
    foto_perfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f8",
    nombre_completo: "Andrés Silva (18 años)",
    titulo_profesional: "Asesorías en diseño de diapositivas en Canva y pósters para exposiciones escolares.",
    categoria: "TareasGuias",
    calificacion: 4.8,
    tarifa: "$6 por trabajo",
    foto_perfil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&crop=face"
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
              <img 
                src="/classmarket-logo.png" 
                alt="ClassMarket Logo" 
                className="w-full h-full object-contain"
              />
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
            <span className="text-[12px] text-[#C5A059] mb-3 block uppercase tracking-[0.2em] font-bold">
              Comunidad Escolar & Universitaria
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B2545] leading-tight">
              Tutorías y Habilidades Estudiantiles
            </h2>
            <p className="text-base md:text-lg text-[#5C6B73] mt-3 max-w-lg leading-relaxed">
              Encuentra compañeros de colegio y universidad verificados para tutorías, guías resueltas, proyectos e intercambio de libros.
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
                reseñas={Math.floor(Math.random() * 50) + 12}
                tarifa={expert.tarifa || "$10 / h"}
                foto_perfil={expert.foto_perfil}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#5C6B73]">
              <span className="material-symbols-outlined text-[32px]">search</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2">No se encontraron servicios escolares</h3>
            <p className="text-[#5C6B73]">Intenta buscar con otros términos como cálculo, inglés, guías o programación.</p>
            <Link 
              href="/home-cliente"
              className="mt-6 inline-block text-[#0B2545] font-bold underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Botón de Carga */}
        {displayedExperts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-[#0B2545] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#13335c] hover:shadow-lg transition-all duration-300 active:scale-95 border border-[#C5A059]/40">
              Cargar más compañeros
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
