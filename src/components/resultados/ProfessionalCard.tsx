import Link from "next/link";

interface ProfessionalCardProps {
  id: string;
  nombre_completo: string;
  titulo_profesional: string;
  calificacion: number;
  reseñas?: number;
  tarifa: string | number;
  foto_perfil: string;
}

export default function ProfessionalCard({
  id,
  nombre_completo,
  titulo_profesional,
  calificacion,
  reseñas = 0,
  tarifa,
  foto_perfil,
}: ProfessionalCardProps) {
  // Asegurar que la tarifa se muestre bien
  const precio = typeof tarifa === "number" ? `$${tarifa}` : tarifa;
  
  // Arreglo de 5 estrellas
  const estrellas = Array.from({ length: 5 }, (_, i) => i < Math.round(calificacion || 0));

  return (
    <article className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group border border-[#e8e0d4] hover:border-[#C5A059]/40">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 ring-[#C5A059]/20 transition-transform duration-500 group-hover:scale-110 relative">
        <img 
          src={foto_perfil || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} 
          alt={nombre_completo} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="font-bold text-xl text-[#0B2545] mb-2 group-hover:text-[#C5A059] transition-colors line-clamp-1">
        {nombre_completo}
      </h3>
      
      <p className="text-sm text-[#5e6f79] mb-6 line-clamp-2 px-2 h-10">
        {titulo_profesional}
      </p>
      
      <div className="flex items-center gap-1 mb-8 text-[#C5A059]">
        {estrellas.map((llena, index) => (
          <span 
            key={index} 
            className="material-symbols-outlined text-sm" 
            style={{ fontVariationSettings: llena ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        ))}
        <span className="text-slate-400 text-xs font-semibold ml-1">
          ({reseñas})
        </span>
      </div>
      
      <div className="mt-auto w-full pt-6 border-t border-[#FAF8F5] flex items-center justify-between">
        <div className="text-left">
          <span className="text-[10px] uppercase tracking-[0.05em] font-bold text-slate-400 block mb-0.5">
            DESDE
          </span>
          <span className="font-bold text-2xl text-[#0B2545] tracking-tight">
            {precio}
          </span>
        </div>
        <Link 
          href={`/expertos/${id}`}
          className="px-6 py-2.5 bg-[#0B2545] text-[#C5A059] rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#0d2f5c] transition-all duration-300 active:scale-95 inline-block text-center"
        >
          Ver Perfil
        </Link>
      </div>
    </article>
  );
}
