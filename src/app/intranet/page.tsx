import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { 
  Bell, Calendar, MonitorPlay, FolderOpen, 
  Sparkles, ArrowRight, Clock, MessageCircle,
  BookOpen, Play
} from 'lucide-react';
import { formatDateLatam } from '@/utils/date-format';

export default async function IntranetDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Traer datos del perfil
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 2. Traer avisos ACTIVOS (que no hayan expirado)
  const hoy = new Date().toISOString();
  const { data: avisos } = await supabase
    .from('avisos')
    .select('*')
    .gte('fecha_expiracion', hoy)
    .order('created_at', { ascending: false })
    .limit(3);

  // 3. Traer últimas clases publicadas
  const { data: clases } = await supabase
    .from('clases_grabadas')
    .select('*, modulos(nombre)')
    .order('created_at', { ascending: false })
    .limit(2);

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0];

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans text-stone-800 pb-16 min-h-screen overflow-y-auto custom-scrollbar">
      
      {/* Header de Bienvenida */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-reiki-green" />
          <p className="text-reiki-green text-[9px] font-black uppercase tracking-[0.3em]">Portal del Alumno</p>
        </div>
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 italic tracking-tight">
          Bienvenido a tu formación, {nombreAlumno}
        </h2>
        <p className="text-stone-400 text-xs font-medium mt-1">Continúa tu camino de sanación y aprendizaje.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Avisos y Accesos (8 de 12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tablón de Avisos */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-reiki-green flex items-center justify-center text-reiki-white">
                  <Bell size={14} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Tablón de Avisos</h3>
              </div>
            </div>

            <div className="space-y-3">
              {avisos && avisos.length > 0 ? (
                avisos.map((aviso) => (
                  <div key={aviso.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-reiki-green/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-reiki-green animate-pulse"></div>
                      <h4 className="font-serif text-base font-bold text-stone-900 italic group-hover:text-reiki-green transition-colors">
                        {aviso.titulo}
                      </h4>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed mb-3 font-medium">
                      {aviso.mensaje}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                      <Calendar size={10} className="text-reiki-green" />
                      Publicado: {formatDateLatam(aviso.created_at)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-10 flex flex-col items-center justify-center text-center text-stone-400">
                  <Bell size={32} className="mb-3 opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">No hay avisos nuevos en este momento.</p>
                </div>
              )}
            </div>
          </section>

          {/* Últimas Clases */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-reiki-violet flex items-center justify-center text-reiki-white">
                  <MonitorPlay size={14} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Últimas Clases Publicadas</h3>
              </div>
              <Link href="/intranet/clases" className="text-[9px] font-black text-reiki-green uppercase tracking-widest hover:underline flex items-center gap-1">
                Ver todas <ArrowRight size={10} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clases && clases.length > 0 ? (
                clases.map((clase) => (
                  <Link key={clase.id} href="/intranet/clases" className="bg-white rounded-2xl border border-stone-200 overflow-hidden group hover:border-reiki-violet/30 hover:shadow-md transition-all">
                    <div className="aspect-video bg-stone-100 relative overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${clase.video_url.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ'}/mqdefault.jpg`}
                        alt={clase.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-10 w-10 rounded-full bg-reiki-white/20 backdrop-blur-md flex items-center justify-center text-reiki-white">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[8px] font-black text-reiki-violet uppercase tracking-widest mb-1">{clase.modulos?.nombre || 'Sin módulo'}</p>
                      <h4 className="font-serif text-sm font-bold text-stone-900 italic truncate">{clase.titulo}</h4>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 bg-white rounded-2xl border border-stone-200 border-dashed p-10 flex flex-col items-center justify-center text-center text-stone-400">
                  <MonitorPlay size={32} className="mb-3 opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Pronto subiremos nuevas clases.</p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA: Accesos y Estado (4 de 12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Estado de Suscripción */}
          <div className="bg-stone-900 rounded-3xl p-6 text-reiki-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-reiki-gold mb-4">Estado de Acceso</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-reiki-white/10 flex items-center justify-center text-reiki-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xl font-bold italic font-serif">Suscripción Activa</p>
                  <p className="text-[10px] text-stone-400 font-medium">Tu camino continúa</p>
                </div>
              </div>
              <Link href="/intranet/perfil" className="w-full bg-reiki-gold text-stone-900 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95">
                Ver detalles del perfil <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Accesos Directos */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">Accesos Directos</h3>
            
            <Link href="/intranet/materiales" className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between group hover:border-reiki-green/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-reiki-green/5 rounded-xl flex items-center justify-center text-reiki-green">
                  <FolderOpen size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Biblioteca PDF</h4>
                  <p className="text-stone-400 text-[9px] font-medium">Manuales y guías</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-stone-300 group-hover:text-reiki-green transition-colors" />
            </Link>

            <Link href="/intranet/sesiones" className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between group hover:border-reiki-violet/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-reiki-violet/5 rounded-xl flex items-center justify-center text-reiki-violet">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Sesiones en Vivo</h4>
                  <p className="text-stone-400 text-[9px] font-medium">Acceso a Zoom</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-stone-300 group-hover:text-reiki-violet transition-colors" />
            </Link>

            <a href="https://wa.me/56951735495" target="_blank" className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between group hover:border-green-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Soporte Directo</h4>
                  <p className="text-stone-400 text-[9px] font-medium">Habla con el Maestro</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-stone-300 group-hover:text-green-600 transition-colors" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
