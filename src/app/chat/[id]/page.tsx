import { supabase } from "@/lib/supabase";
import ChatInterface from "@/components/chat/ChatInterface";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

const FALLBACK_EXPERTS = [
  {
    id: "f1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Tutorías de Matemáticas, Álgebra y Física de 10° y 11°",
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Apoyo en Tareas de Química, Biología y Talleres Escolares",
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f3",
    nombre_completo: "Sofía Salazar",
    titulo_profesional: "Clases de Inglés Conversacional & Preparación de Pruebas",
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Proyectos en Python, JavaScript, HTML y Scratch para Colegios",
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "e1",
    nombre_completo: "Camila Torres",
    titulo_profesional: "Tutorías de Matemáticas, Cálculo y Física 10°-11°",
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "e2",
    nombre_completo: "Mateo Valenzuela",
    titulo_profesional: "Guías Resueltas & Apoyo en Química Orgánica y Biología",
    foto_perfil: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "e3",
    nombre_completo: "Sofía Salazar",
    titulo_profesional: "Clases de Inglés Conversacional & Pruebas Saber 11",
    foto_perfil: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "e4",
    nombre_completo: "Diego Morales",
    titulo_profesional: "Proyectos en Python, Algoritmos y Web para Estudiantes",
    foto_perfil: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&crop=face"
  },
  {
    id: "f5",
    nombre_completo: "Marta Valls",
    foto_perfil: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f6",
    nombre_completo: "David García",
    foto_perfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f7",
    nombre_completo: "Valeria Gómez",
    foto_perfil: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "f8",
    nombre_completo: "Andrés Silva",
    foto_perfil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f9",
    nombre_completo: "Lucía Ortiz",
    foto_perfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f10",
    nombre_completo: "Roberto Sánchez",
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f11",
    nombre_completo: "Carolina Ruiz",
    foto_perfil: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "f12",
    nombre_completo: "Diego Castro",
    foto_perfil: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "e1",
    nombre_completo: "Laura Vásquez",
    foto_perfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "e2",
    nombre_completo: "Roberto Sánchez",
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "job1",
    nombre_completo: "Elena Varas",
    foto_perfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "job2",
    nombre_completo: "Carlos Gómez",
    foto_perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "job3",
    nombre_completo: "Sofía Beltrán",
    foto_perfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  }
];

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;

  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Fetch expert data
  const { data: expertData } = await supabase
    .from("perfiles_profesionales")
    .select("*")
    .eq("id", expertId)
    .single();

  // Find fallback if not in DB
  const fallbackExpert = FALLBACK_EXPERTS.find(e => e.id === expertId) || FALLBACK_EXPERTS[0];
  const expert = expertData || fallbackExpert;

  if (!expert) {
    notFound();
  }

  return (
    <ChatInterface 
      expertId={expertId}
      negotiationId={`neg_${expertId}`} // In a real app, this would be a real negotiation UUID
      expertData={expert}
      currentUser={user || { id: 'temp_user_id', email: 'guest@example.com' }}
    />
  );
}
