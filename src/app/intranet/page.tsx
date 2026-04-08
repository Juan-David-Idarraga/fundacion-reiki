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
    <div className="p-6 max-w-7xl mx-auto font-sans pb-16 min-h-screen overflow-y-auto custom-scrollbar" style={{ color: '#E8E4DC' }}>
      
      {/* Header de Bienvenida */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-reiki-green" />
          <p className="text-reiki-green text-[9px] font-black uppercase tracking-[0.3em]">Portal del Alumno</p>
        </div>
        <h2 className="font-serif text-2xl lg:text-3xl font-bold italic tracking-tight" style={{ color: '#E8E4DC' }}>
          Bienvenido a tu formación, {nombreAlumno}
        </h2>
        <p className="text-xs font-medium mt-1" style={{ color: '#9A9589' }}>Continúa tu camino de sanación y aprendizaje.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Avisos y Accesos (8 de 12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tablón de Avisos */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}>
                  <Bell size={14} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#9A9589' }}>Tablón de Avisos</h3>
              </div>
            </div>

            <div className="space-y-3">
              {avisos && avisos.length > 0 ? (
                avisos.map((aviso) => (
                  <div key={aviso.id} className="card-elevated rounded-2xl p-5 transition-all group hover:border-[rgba(74,140,66,0.35)]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#4A8C42' }}></div>
                      <h4 className="font-serif text-base font-bold italic transition-colors group-hover:text-[#7BC274]" style={{ color: '#E8E4DC' }}>
                        {aviso.titulo}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed mb-3 font-medium" style={{ color: '#9A9589' }}>
                      {aviso.mensaje}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#5A5750' }}>
                      <Calendar size={10} style={{ color: '#4A8C42' }} />
                      Publicado: {formatDateLatam(aviso.created_at)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border-dashed p-10 flex flex-col items-center justify-center text-center" style={{ border: '1px dashed #363830', color: '#5A5750' }}>
                  <Bell size={32} className="mb-3 opacity-30" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">No hay avisos nuevos en este momento.</p>
                </div>
              )}
            </div>
          </section>

          {/* Últimas Clases */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8B6B91', color: '#E8E4DC' }}>
                  <MonitorPlay size={14} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#9A9589' }}>Últimas Clases Publicadas</h3>
              </div>
              <Link href="/intranet/clases" className="text-[9px] font-black uppercase tracking-widest hover:underline flex items-center gap-1" style={{ color: '#4A8C42' }}>
                Ver todas <ArrowRight size={10} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clases && clases.length > 0 ? (
                clases.map((clase) => (
                  <Link key={clase.id} href="/intranet/clases" className="card-elevated rounded-2xl overflow-hidden group hover:border-[rgba(139,107,145,0.4)] transition-all">
                    <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: '#1E2019' }}>
                      <img 
                        src={`https://img.youtube.com/vi/${clase.video_url.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ'}/mqdefault.jpg`}
                        alt={clase.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(26,28,24,0.4)' }}>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}>
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4" style={{ backgroundColor: '#272A23' }}>
                      <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: '#8B6B91' }}>{clase.modulos?.nombre || 'Sin módulo'}</p>
                      <h4 className="font-serif text-sm font-bold italic truncate" style={{ color: '#E8E4DC' }}>{clase.titulo}</h4>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 rounded-2xl border-dashed p-10 flex flex-col items-center justify-center text-center" style={{ border: '1px dashed #363830', color: '#5A5750' }}>
                  <MonitorPlay size={32} className="mb-3 opacity-30" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Pronto subiremos nuevas clases.</p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA: Accesos y Estado (4 de 12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Estado de Suscripción */}
          <div className="card-elevated-gold rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-[0.06] pointer-events-none">
              <Sparkles size={80} style={{ color: '#C9A227' }} />
            </div>
            <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A227' }}>Estado de Acceso</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(201,162,39,0.1)', color: '#C9A227' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xl font-bold italic font-serif" style={{ color: '#E8E4DC' }}>Suscripción Activa</p>
                  <p className="text-[10px] font-medium" style={{ color: '#9A9589' }}>Tu camino continúa</p>
                </div>
              </div>
              <Link href="/intranet/perfil" className="w-full py-3 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 hover:opacity-90"
                style={{ backgroundColor: '#C9A227', color: '#1A1C18' }}>
                Ver detalles del perfil <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Accesos Directos */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] px-1" style={{ color: '#9A9589' }}>Accesos Directos</h3>
            
            <Link href="/intranet/materiales" className="card-elevated p-4 rounded-2xl flex items-center justify-between group hover:border-[rgba(74,140,66,0.4)] transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(74,140,66,0.1)', color: '#4A8C42' }}>
                  <FolderOpen size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs" style={{ color: '#E8E4DC' }}>Biblioteca PDF</h4>
                  <p className="text-[9px] font-medium" style={{ color: '#9A9589' }}>Manuales y guías</p>
                </div>
              </div>
              <ArrowRight size={14} className="transition-colors group-hover:text-[#4A8C42]" style={{ color: '#5A5750' }} />
            </Link>

            <Link href="/intranet/sesiones" className="card-elevated p-4 rounded-2xl flex items-center justify-between group hover:border-[rgba(139,107,145,0.4)] transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139,107,145,0.1)', color: '#8B6B91' }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs" style={{ color: '#E8E4DC' }}>Sesiones en Vivo</h4>
                  <p className="text-[9px] font-medium" style={{ color: '#9A9589' }}>Acceso a Zoom</p>
                </div>
              </div>
              <ArrowRight size={14} className="transition-colors group-hover:text-[#8B6B91]" style={{ color: '#5A5750' }} />
            </Link>

            <a href="https://wa.me/56951735495" target="_blank" className="card-elevated p-4 rounded-2xl flex items-center justify-between group hover:border-[rgba(74,140,66,0.4)] transition-all">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(74,140,66,0.1)', color: '#4A8C42' }}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs" style={{ color: '#E8E4DC' }}>Soporte Directo</h4>
                  <p className="text-[9px] font-medium" style={{ color: '#9A9589' }}>Habla con el Maestro</p>
                </div>
              </div>
              <ArrowRight size={14} className="transition-colors group-hover:text-[#4A8C42]" style={{ color: '#5A5750' }} />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
