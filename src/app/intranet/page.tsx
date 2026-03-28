import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { 
  BookOpen, MonitorPlay, Calendar, User, 
  Bell, Pin, Sparkles, ShieldCheck, ChevronRight
} from 'lucide-react';

export default async function IntranetHomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Traer datos del usuario
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre')
    .eq('id', user.id)
    .single();
  
  const nombreAlumno = perfil?.nombre?.split(' ')[0] || 'Estudiante';

  // Traer Avisos Activos
  const hoy = new Date().toISOString();
  const { data: avisos } = await supabase
    .from('avisos')
    .select('*')
    .gte('fecha_expiracion', hoy) 
    .order('created_at', { ascending: false });

  return (
    // min-h asegura que ocupe la pantalla, pero permite scroll solo si haces mucho zoom
    <div className="min-h-[calc(100vh-64px)] bg-stone-50 p-6 lg:p-10 font-sans text-stone-800">
      
      {/* CONTENEDOR GRID: Esqueleto rígido de 12 columnas */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

        {/* --- COLUMNA IZQUIERDA: Banner y Botones (7 de 12 espacios) --- */}
        <div className="xl:col-span-7 flex flex-col gap-8 w-full">
          
          {/* BANNER RÍGIDO COMPACTO */}
          <div className="w-full bg-stone-950 rounded-[32px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[200px] shadow-xl shadow-stone-200/50 group">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[3000ms]"
              alt="Fondo Reiki"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-amber-500" />
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">Tu Espacio de Sanación</p>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white italic tracking-tight leading-none mb-2">
                Hola, {nombreAlumno}
              </h2>
              <p className="text-stone-400 text-xs max-w-sm mt-3 leading-relaxed">Formación oficial Usui Shiki Ryoho. Continúa tu camino de autoconocimiento.</p>
            </div>
          </div>

          {/* MICRO-BOTONES */}
          <div className="w-full">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 px-2">Accesos Rápidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link href="/intranet/clases" className="bg-white rounded-[24px] p-4 border border-stone-200 flex items-center justify-between group hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 bg-stone-50 rounded-[16px] flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                    <MonitorPlay size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm mb-0.5">Clases Grabadas</h4>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Ver Videos</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/intranet/materiales" className="bg-white rounded-[24px] p-4 border border-stone-200 flex items-center justify-between group hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 bg-stone-50 rounded-[16px] flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm mb-0.5">Material PDF</h4>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Leer Manuales</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/intranet/sesiones" className="bg-stone-900 rounded-[24px] p-4 border border-stone-800 flex items-center justify-between group hover:border-amber-500 hover:shadow-lg transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 bg-stone-800 rounded-[16px] flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">Encuentros Vivo</h4>
                    <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Sala Zoom</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/intranet/perfil" className="bg-white rounded-[24px] p-4 border border-stone-200 flex items-center justify-between group hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 bg-stone-50 rounded-[16px] flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm mb-0.5">Mi Perfil</h4>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Suscripción</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: Tablón de Avisos (5 de 12 espacios) --- */}
        <div className="xl:col-span-5 w-full flex flex-col bg-white rounded-[32px] border border-stone-200 shadow-sm overflow-hidden min-h-[500px]">
          
          <div className="bg-stone-100/50 p-6 flex items-center gap-4 border-b border-stone-200 shrink-0">
            <div className="h-12 w-12 shrink-0 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 italic leading-none mb-1">Avisos del Profesor</h3>
              <p className="text-amber-600 text-[10px] font-black uppercase tracking-widest">Tablón Oficial</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/30 custom-scrollbar">
            
            {avisos && avisos.length > 0 ? (
              avisos.map((aviso) => (
                <div key={aviso.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-5">
                    <Pin size={32} className="text-stone-900 -rotate-45" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[8px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-md mb-3 inline-block">
                      Válido hasta: {new Date(aviso.fecha_expiracion).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                    </span>
                    <h4 className="font-bold text-stone-900 mb-2 leading-tight text-sm">{aviso.titulo}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{aviso.mensaje}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-10">
                <ShieldCheck size={48} className="text-stone-400 mb-4" />
                <p className="font-serif text-lg font-bold text-stone-800 italic leading-none">Todo al día</p>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-2 max-w-[200px]">No hay comunicados activos</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}