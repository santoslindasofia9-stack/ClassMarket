import { supabase } from "@/lib/supabase";
import ProfessionalCard from "@/components/resultados/ProfessionalCard";
import Link from "next/link";
import BottomNav from "@/components/dashboard/BottomNav";

export const dynamic = 'force-dynamic';

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Herrera",
    titulo_profesional: "Tutora de Matemáticas y Cálculo para preparación de exámenes universitarios.",
    categoria: "Matemáticas",
    calificacion: 5,
    tarifa: 25,
    foto_perfil: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f2",
    nombre_completo: "Julián Martínez",
    titulo_profesional: "Ayuda con trabajos de Programación en Python, Java y desarrollo web.",
    categoria: "Programación",
    calificacion: 5,
    tarifa: 30,
    foto_perfil: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f3",
    nombre_completo: "Sofía López",
    titulo_profesional: "Redacción de ensayos académicos, tesis y corrección de estilo.",
    categoria: "Redacción",
    calificacion: 5,
    tarifa: 20,
    foto_perfil: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f4",
    nombre_completo: "Carlos Torres",
    titulo_profesional: "Tutor de Física y Química, ejercicios resueltos y preparación ICFES.",
    categoria: "Ciencias",
    calificacion: 5,
    tarifa: 28,
    foto_perfil: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f5",
    nombre_completo: "Marta Valls",
    titulo_profesional: "Diseño de presentaciones en PowerPoint, Canva e infografías académicas.",
    categoria: "Diseño",
    calificacion: 5,
    tarifa: 15,
    foto_perfil: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtczwaCBZDrakoJIvPXavRcfa_YWopKVV-7E7HQr1nuY1tk4Idv_KTZUmHIGTzsIPind-7xfjHamETjNysRRKAQ2ThKrJDlj6a5FhixgOXvC1i6jrRwwX-ysP3e7a9-yOoxp5NBSo4JPs_XDtNyLYRMUdnZsBicPKX-pX_Iv_hg37hGYdoAeMGNiLdo1f6Ed-T0_Ydjpy_b6DDORFaWAIhHLSdMQcDWLI9UOcZw-UVdUucDKpWNB6PVOvoF76-4pbY0nZ0NpBlTQ"
  },
  {
    id: "f6",
    nombre_completo: "David García",
    titulo_profesional: "Tutor de Inglés conversacional, gramática y preparación TOEFL/IELTS.",
    categoria: "Idiomas",
    calificacion: 5,
    tarifa: 22,
    foto_perfil: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8PciBPx8J_AUKCIHBcXBGUlgRG_SmQklphaaOPBS7Io20uuJq9Yqq-LmnM5BE-jHMcSyCpPIvnICQJWKKlKTgI19ULZNR0yb5Zy2WjUz8C9GFMo8ovXVyg3r11ofkBuX3rfH-4GmDWyNrDpT_y2GPaEybrpRNVbFfVCdj5jBUsHDOQlJ4dx1n1IFo4WvjuYtSZiPl6qsw4viIzPKZwxMjTn_4NAFIUWX18Dnqf0EOhnKuC7df6IwgwyT-oAmPAOQZwqp9EHv3YQ"
  },
  {
    id: "f7",
    nombre_completo: "Valeria Gómez",
    titulo_profesional: "Ayuda con tareas de Contabilidad, Estadística y Excel avanzado.",
    categoria: "Contabilidad",
    calificacion: 4.9,
    tarifa: 18,
    foto_perfil: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f8",
    nombre_completo: "Andrés Silva",
    titulo_profesional: "Clases de Biología y Anatomía, mapas conceptuales y resúmenes.",
    categoria: "Ciencias",
    calificacion: 4.8,
    tarifa: 20,
    foto_perfil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f9",
    nombre_completo: "Lucía Ortiz",
    titulo_profesional: "Tutora de Historia y Ciencias Sociales, preparación para ICFES.",
    categoria: "Sociales",
    calificacion: 5,
    tarifa: 15,
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f10",
    nombre_completo: "Roberto Sánchez",
    titulo_profesional: "Tutor de Electrónica y Circuitos para estudiantes de ingeniería.",
    categoria: "Ingeniería",
    calificacion: 4.7,
    tarifa: 25,
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f11",
    nombre_completo: "Carolina Ruiz",
    titulo_profesional: "Diseño gráfico para proyectos escolares, logos y branding estudiantil.",
    categoria: "Diseño",
    calificacion: 4.9,
    tarifa: 20,
    foto_perfil: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f12",
    nombre_completo: "Diego Castro",
    titulo_profesional: "Desarrollo de apps y proyectos finales en React, Node.js y bases de datos.",
    categoria: "Programación",
    calificacion: 5,
    tarifa: 35,
    foto_perfil: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "e1",
    nombre_completo: "Laura Vásquez",
    titulo_profesional: "Tutora de Filosofía y Ética, ayuda con ensayos argumentativos.",
    categoria: "Humanidades",
    calificacion: 4.9,
    tarifa: 15,
    foto_perfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "e2",
    nombre_completo: "Roberto Sánchez",
    titulo_profesional: "Asesoría en proyectos de Mecatrónica y Arduino para estudiantes.",
    categoria: "Ingeniería",
    calificacion: 4.7,
    tarifa: 22,
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] font-sans overflow-x-hidden pb-24">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex justify-between items-center w-full px-4 lg:px-8 py-3 bg-white/90 backdrop-blur-md border-b border-[#e8e0d4]/50 flex-shrink-0"
        style={{ boxShadow: "0 1px 12px rgba(11,37,69,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/home-cliente"
            className="w-9 h-9 rounded-full hover:bg-[#FAF8F5] flex items-center justify-center text-[#5e6f79] hover:text-[#0B2545] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <Link href="/home-cliente" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#0B2545] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#C5A059] text-lg leading-none">school</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2545] tracking-tight hidden sm:block">
              ClassMarket
            </h1>
          </Link>
        </div>

        {/* The read-only search bar was removed per user request */}
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="flex-grow container mx-auto max-w-[1280px] px-4 md:px-10 py-8 md:py-14">
        
        {/* Encabezado de Resultados */}
        <div className="mb-8 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[12px] text-[#C5A059] mb-3 block uppercase tracking-[0.2em] font-bold">
              Encuentra Compañeros
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0B2545] leading-tight">
              Resultados de Búsqueda
            </h2>
            <p className="text-lg text-[#5e6f79] mt-4 max-w-lg">
              Estudiantes verificados listos para ayudarte con tutorías, tareas, proyectos y preparación de exámenes.
            </p>
          </div>
          
          {/* Controles de Filtrado removidos por petición del usuario */}
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
          <div className="py-20 text-center bg-white rounded-3xl border border-[#e8e0d4] border-dashed">
            <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#5e6f79]">
              <span className="material-symbols-outlined text-[32px]">search</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2">No se encontraron estudiantes</h3>
            <p className="text-[#5e6f79]">Intenta buscar con otros términos o cambia la categoría.</p>
            <Link 
              href="/home-cliente"
              className="mt-6 inline-block text-[#C5A059] font-bold underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Botón de Carga */}
        {displayedExperts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-[#0B2545] text-[#C5A059] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#0d2f5c] hover:shadow-lg transition-all duration-300 active:scale-95">
              Cargar más resultados
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
