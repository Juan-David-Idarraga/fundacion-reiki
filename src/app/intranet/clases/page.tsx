import { createClient } from "@/supabase/server";
import { 
  PlayCircle, Clock, ChevronLeft, FolderOpen, 
  ShieldAlert, Lock, Calendar, MessageCircle 
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-[#F9F6F0] text-stone-800 pb-20 font-sans selection:bg-amber-200">
      
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="p-6 flex items-center justify-between bg-white/70 backdrop-blur-xl sticky top-0 z-40 border-b border-stone-200/50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/intranet" className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
            <ChevronLeft size={20}/>
          </Link>
          <div className="h-6 w-px bg-stone-200 hidden sm:block"></div>
          <h1 className="font-serif font-bold text-xl uppercase tracking-tighter text-stone-900">Formación Reiki Usui</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 shadow-inner">
           <Calendar size={14} className="text-amber-600" />
           <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
             Vence: {fechaVencimiento?.toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })}
           </span>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 mt-12 space-y-20">
        
        {modulos?.map((modulo) => (
          <section key={modulo.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            {/* Header de la Unidad */}
            <div className="flex items-center gap-5 mb-10 group">
              <div className="h-14 w-14 rounded-3xl bg-stone-900 flex items-center justify-center text-amber-500 shadow-xl shadow-stone-200 group-hover:scale-110 transition-transform">
                <FolderOpen size={24}/>
              </div>
              <div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">{modulo.nombre}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
                   <p className="text-[10px] font-black text-stone-400 tracking-[0.2em] uppercase italic">Unidad de formación activa</p>
                </div>
              </div>
            </div>

            {/* Listado de clases de este módulo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {clases?.filter(c => c.modulo_id === modulo.id).map((clase) => (
                <article key={clase.id} className="bg-white rounded-[40px] border border-stone-200/60 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 group">
                  
                  {/* Reproductor con permisos correctos para YouTube */}
                  <div className="aspect-video w-full bg-stone-900 relative overflow-hidden">
                    <iframe 
                      className="absolute inset-0 w-full h-full" 
                      src={clase.url_youtube} 
                      title={clase.titulo}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                      {clase.titulo}
                    </h3>
                    
                    {/* Descripción de la clase */}
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 mb-8 flex-1">
                      {clase.descripcion || "En esta sesión profundizamos en los conceptos de sanación y equilibrio energético para tu crecimiento personal."}
                    </p>

                    {/* Metadatos inferiores */}
                    <div className="pt-6 border-t border-stone-100 flex justify-between items-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
                       <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-full border border-stone-100">
                          <Clock size={14} className="text-amber-600"/> 
                          <span>{clase.duracion || "Clase Completa"}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <PlayCircle size={14} className="text-stone-300" />
                          <span>{clase.fecha}</span>
                       </div>
                    </div>
                  </div>

                </article>
              ))}
              
              {clases?.filter(c => c.modulo_id === modulo.id).length === 0 && (
                <div className="col-span-full py-10 px-8 border-2 border-dashed border-stone-200 rounded-[40px] text-center">
                   <p className="text-sm italic text-stone-400 font-medium">Aún no hay videos publicados en esta unidad.</p>
                </div>
              )}
            </div>
          </section>
        ))}

      </main>

      {/* FOOTER DE PROTECCIÓN */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
         <div className="inline-flex items-center gap-2 text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] opacity-50">
            <Lock size={12} /> Contenido Protegido • Centro de Reiki 2026
         </div>
      </div>

    </div>
  );
}