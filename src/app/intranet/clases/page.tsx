import { createClient } from "@/supabase/server";
import { 
  ShieldAlert, MessageCircle, Lock 
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import ClasesAlumnoClient from "./ClasesAlumnoClient";

export default async function ClasesAlumnoPage() {
  const supabase = await createClient();
  
  // 1. Verificación de Autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. LÓGICA DEL GUARDIÁN: Verificamos el estado del perfil
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('estado, vencimiento, nombre')
    .eq('id', user.id)
    .single();

  const ahora = new Date();
  const fechaVencimiento = perfil?.vencimiento ? new Date(perfil.vencimiento) : null;
  const estaVencido = fechaVencimiento ? fechaVencimiento < ahora : true;

  // 3. BLOQUEO DE ACCESO: Si está suspendido o vencido, mostramos el muro
  if (perfil?.estado === 'suspendido' || estaVencido) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-red-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
             <ShieldAlert size={40} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4 tracking-tight">Acceso Restringido</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            {estaVencido 
              ? "Tu periodo de formación ha finalizado. Para renovar tu acceso y continuar con tus clases, por favor contacta con tu maestro." 
              : "Tu cuenta ha sido pausada temporalmente por el administrador del Centro de Reiki."}
          </p>
          
          <div className="space-y-3">
            <a 
              href="https://wa.me/56951735495" 
              target="_blank"
              className="flex items-center justify-center gap-2 w-full bg-stone-900 text-amber-500 py-4 rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
            >
              <MessageCircle size={18} /> Hablar con Daniel
            </a>
            <Link href="/login" className="block text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors pt-2">
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. CARGA DE DATOS: Si pasó el guardián, traemos el contenido
  const { data: modulos } = await supabase.from('modulos').select('*').order('orden', { ascending: true });
  const { data: clases } = await supabase.from('clases_grabadas').select('*').order('created_at', { ascending: true });

  return (
    <ClasesAlumnoClient 
      modulos={modulos || []} 
      clases={clases || []} 
      fechaVencimiento={fechaVencimiento} 
    />
  );
}
