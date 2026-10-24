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
    <article className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-[#C5A059]/20 hover:border-[#C5A059]">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-5 ring-4 ring-[#C5A059]/30 transition-transform duration-300 group-hover:scale-105 relative bg-[#FAF8F5]">
        <img 
          src={foto_perfil || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} 
          alt={nombre_completo} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="font-extrabold text-lg text-[#0B2545] mb-1.5 transition-colors line-clamp-1">
        {nombre_completo}
      </h3>
      
      <p className="text-xs text-[#5C6B73] font-medium mb-4 line-clamp-2 px-2 h-9 leading-relaxed">
        {titulo_profesional}
      </p>
      
      <div className="flex items-center gap-1 mb-6 text-[#C5A059]">
        {estrellas.map((llena, index) => (
          <span 
            key={index} 
            className="material-symbols-outlined text-sm" 
            style={{ fontVariationSettings: llena ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        ))}
        <span className="text-[#5C6B73] text-xs font-semibold ml-1">
          ({reseñas})
        </span>
      </div>
      
      <div className="mt-auto w-full pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <div className="text-left">
          <span className="text-[9px] uppercase tracking-[0.05em] font-bold text-[#5C6B73] block mb-0.5">
            TARIFA / INTERCAMBIO
          </span>
          <span className="font-extrabold text-sm text-[#0B2545] tracking-tight line-clamp-1">
            {precio}
          </span>
        </div>
        <div className="flex gap-2">
          <Link 
            href={`/chat/${id}?nombre=${encodeURIComponent(nombre_completo)}&servicio=${encodeURIComponent(titulo_profesional)}`}
            className="px-3.5 py-2 bg-[#C5A059] text-[#0B2545] rounded-full font-bold text-xs hover:bg-[#b08d47] transition-all duration-300 active:scale-95 inline-flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-xs">chat</span>
            <span>Chatear</span>
          </Link>
          <Link 
            href={`/expertos/${id}`}
            className="px-3.5 py-2 bg-[#FAF8F5] border border-[#0B2545]/20 text-[#0B2545] rounded-full font-bold text-xs hover:bg-[#0B2545] hover:text-white transition-all duration-300 active:scale-95 inline-block text-center"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
