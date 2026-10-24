'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NegotiationView from '@/components/chat/NegotiationView';
import { supabase } from '@/lib/supabase';

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Tutoría de Matemáticas & Física",
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Guías de Química Orgánica",
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f3",
    nombre_completo: "Sofía Salazar",
    titulo_profesional: "Clases de Inglés Saber 11",
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Proyectos de Programación e Informática",
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f5",
    nombre_completo: "Valentina Gómez",
    titulo_profesional: "Trueque de Libros y Filosofía",
    foto_perfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f6",
    nombre_completo: "Sebastián Rincón",
    titulo_profesional: "Geometría y Trigonometría",
    foto_perfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&crop=face"
  }
];

export default function NegotiationPage() {
  const params = useParams();
  const id = params.id as string;
  const [expert, setExpert] = useState<any>(null);

  useEffect(() => {
    async function fetchExpert() {
      const { data, error } = await supabase
        .from('perfiles_profesionales')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setExpert(data);
      } else {
        const fallback = FALLBACK_EXPERTS.find(e => e.id === id) || FALLBACK_EXPERTS[0];
        setExpert(fallback);
      }
    }
    
    if (id) fetchExpert();
  }, [id]);

  if (!expert) return null;

  return (
    <NegotiationView 
      expertData={expert} 
      negotiationId={`neg_${id}`}
    />
  );
}
