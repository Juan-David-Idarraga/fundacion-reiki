import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { 
  Users, PlusCircle, BookOpen, FileText, Bell, 
  Settings, AlertTriangle, CheckCircle, Clock, 
  TrendingUp, Video, FolderOpen, ArrowRight,
  ShieldAlert, MessageCircle, Calendar
} from 'lucide-react';
import { formatDateLatam } from '@/utils/date-format';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Consultas paralelas para estadísticas
  const [
    { count: countAlumnos },
    { count: countClases },
    { count: countModulos },
    { count: countMateriales },
    { count: countAvisos },
    { data: alumnos },
    { data: ultimosAvisos },
    { data: perfil }
  ] = await Promise.all([
    supabase.from('perfiles').select('*', { count: 'exact', head: true }),
    supabase.from('clases_grabadas').select('*', { count: 'exact', head: true }),
    supabase.from('modulos').select('*', { count: 'exact', head: true }),
    supabase.from('materiales').select('*', { count: 'exact', head: true }),
    supabase.from('avisos').select('*', { count: 'exact', head: true }),
    supabase.from('perfiles').select('id, nombre, vencimiento, estado').eq('rol', 'alumno').order('vencimiento', { ascending: true }),
    supabase.from('avisos').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('perfiles').select('nombre').eq('id', user.id).single()
  ]);

  // Calcular alumnos por vencer (menos de 7 días)
  const hoy = new Date();
  const alumnosPorVencer = (alumnos || []).filter(a => {
    if (!a.vencimiento) return false;
    const venc = new Date(a.vencimiento);
    const dias = Math.ceil((venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return dias >= 0 && dias <= 7;
  });

  const alumnosVencidos = (alumnos || []).filter(a => {
    if (!a.vencimiento) return true;
    return new Date(a.vencimiento) < hoy;
  });

  const alumnosActivos = (alumnos || []).filter(a => {
    if (!a.vencimiento) return false;
    return new Date(a.vencimiento) >= hoy;
  });

  const nombreMaestro = perfil?.nombre || 'Maestro';

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans pb-16 min-h-screen overflow-y-auto custom-scrollbar" style={{ color: '#E8E4DC' }}>
      
      {/* Header con saludo */}
      <header className="mb-8">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: '#C9A227' }}>Panel de Administración</p>
        <h2 className="font-serif text-2xl lg:text-3xl font-bold italic tracking-tight" style={{ color: '#E8E4DC' }}>
          Bienvenido, {nombreMaestro}
        </h2>
        <p className="text-xs font-medium mt-1" style={{ color: '#9A9589' }}>Resumen general de tu academia y accesos rápidos.</p>
      </header>

      {/* Alerta de vencimientos próximos */}
      {alumnosPorVencer.length > 0 && (
        <div className="rounded-2xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)' }}>
          <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#C9A227', color: '#1A1C18' }}>
            <AlertTriangle size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold mb-1" style={{ color: '#D4AF37' }}>Atención: {alumnosPorVencer.length} alumno{alumnosPorVencer.length > 1 ? 's' : ''} por vencer en los próximos 7 días</h4>
            <div className="flex flex-wrap gap-2">
              {alumnosPorVencer.slice(0, 5).map(a => {
                const dias = Math.ceil((new Date(a.vencimiento).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <span key={a.id} className="text-[9px] font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(201,162,39,0.12)', color: '#D4AF37', border: '1px solid rgba(201,162,39,0.2)' }}>
                    {a.nombre || 'Sin nombre'} — {dias === 0 ? 'Hoy' : `${dias}d`}
                  </span>
                );
              })}
              {alumnosPorVencer.length > 5 && (
                <span className="text-[9px] font-bold px-2 py-1" style={{ color: '#C9A227' }}>+{alumnosPorVencer.length - 5} más</span>
              )}
            </div>
          </div>
          <Link href="/admin/alumnos" className="transition-colors shrink-0 hover:opacity-70" style={{ color: '#C9A227' }}>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { icon: Users,      count: countAlumnos,    label: 'Alumnos Total',    badge: `${alumnosActivos.length} activos`, badgeColor: '#4A8C42', iconColor: '#C9A227', iconBg: 'rgba(201,162,39,0.1)' },
          { icon: Video,      count: countClases,     label: 'Clases Grabadas',  badge: null,                              iconColor: '#8B6B91', iconBg: 'rgba(139,107,145,0.1)' },
          { icon: FolderOpen, count: countModulos,    label: 'Módulos',          badge: null,                              iconColor: '#4A8C42', iconBg: 'rgba(74,140,66,0.1)' },
          { icon: FileText,   count: countMateriales, label: 'Materiales PDF',   badge: null,                              iconColor: '#8B6B91', iconBg: 'rgba(139,107,145,0.1)' },
          { icon: Bell,       count: countAvisos,     label: 'Avisos',           badge: null,                              iconColor: '#C9A227', iconBg: 'rgba(201,162,39,0.1)' },
        ].map(({ icon: Icon, count, label, badge, badgeColor, iconColor, iconBg }) => (
          <div key={label} className="card-elevated p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg, color: iconColor }}>
                <Icon size={16} />
              </div>
              {badge && (
                <span className="text-[8px] font-black uppercase tracking-widest flex items-center gap-0.5" style={{ color: badgeColor }}>
                  <CheckCircle size={10} /> {badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-black leading-none mb-1" style={{ color: '#E8E4DC' }}>{count || 0}</p>
            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#9A9589' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Sección inferior: Accesos rápidos + Últimos avisos + Alumnos vencidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Accesos Rápidos */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] px-1" style={{ color: '#9A9589' }}>Accesos Rápidos</h3>
          
          <Link href="/admin/clases" className="card-elevated-gold p-5 rounded-2xl flex items-center justify-between group transition-all hover:border-[rgba(201,162,39,0.5)]">
            <div>
              <h4 className="font-bold text-sm mb-0.5" style={{ color: '#E8E4DC' }}>Gestionar Contenido</h4>
              <p className="text-[10px] font-medium" style={{ color: '#9A9589' }}>Videos y módulos</p>
            </div>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: '#C9A227', color: '#1A1C18' }}>
              <PlusCircle size={20} />
            </div>
          </Link>

          {[
            { href: '/admin/alumnos',      icon: Users,    label: 'Gestionar Alumnos',  sub: 'Registrar y administrar', color: '#C9A227', bg: 'rgba(201,162,39,0.1)' },
            { href: '/admin/avisos',       icon: Bell,     label: 'Publicar Aviso',     sub: 'Comunicados para alumnos', color: '#4A8C42', bg: 'rgba(74,140,66,0.1)' },
            { href: '/admin/configuracion',icon: Settings, label: 'Configuración',      sub: 'Perfil y enlaces',         color: '#8B6B91', bg: 'rgba(139,107,145,0.1)' },
          ].map(({ href, icon: Icon, label, sub, color, bg }) => (
            <Link key={href} href={href} className="card-elevated p-5 rounded-2xl flex items-center justify-between group transition-all hover:border-[rgba(74,140,66,0.35)]">
              <div>
                <h4 className="font-bold text-sm mb-0.5" style={{ color: '#E8E4DC' }}>{label}</h4>
                <p className="text-[10px] font-medium" style={{ color: '#9A9589' }}>{sub}</p>
              </div>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: bg, color }}>
                <Icon size={20} />
              </div>
            </Link>
          ))}
        </div>

        {/* Últimos Avisos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#9A9589' }}>Últimos Avisos</h3>
            <Link href="/admin/avisos" className="text-[9px] font-black uppercase tracking-widest hover:underline" style={{ color: '#C9A227' }}>Ver todos</Link>
          </div>
          
          {(ultimosAvisos && ultimosAvisos.length > 0) ? (
            ultimosAvisos.map(aviso => (
              <div key={aviso.id} className="card-elevated p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(201,162,39,0.1)', color: '#C9A227' }}>
                    <Bell size={12} />
                  </div>
                  <h4 className="text-xs font-bold truncate flex-1" style={{ color: '#E8E4DC' }}>{aviso.titulo}</h4>
                </div>
                <p className="text-[11px] line-clamp-2 leading-relaxed mb-2" style={{ color: '#9A9589' }}>{aviso.mensaje}</p>
                <div className="flex items-center gap-2 text-[9px] font-medium" style={{ color: '#5A5750' }}>
                  <Calendar size={10} />
                  {aviso.created_at ? formatDateLatam(aviso.created_at) : 'Reciente'}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border-dashed p-8 text-center" style={{ border: '1px dashed #363830', color: '#5A5750' }}>
              <Bell size={24} className="mx-auto mb-2 opacity-30" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Sin avisos publicados</p>
            </div>
          )}
        </div>

        {/* Alumnos que requieren atención */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#9A9589' }}>Requieren Atención</h3>
            <Link href="/admin/alumnos" className="text-[9px] font-black uppercase tracking-widest hover:underline" style={{ color: '#C9A227' }}>Ver todos</Link>
          </div>
          
          {([...alumnosPorVencer, ...alumnosVencidos.slice(0, 3)].length > 0) ? (
            [...alumnosPorVencer, ...alumnosVencidos.slice(0, 3)].slice(0, 6).map(alumno => {
              const venc = alumno.vencimiento ? new Date(alumno.vencimiento) : null;
              const dias = venc ? Math.ceil((venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)) : -999;
              const isVencido = dias < 0;

              return (
                <div key={alumno.id} className="card-elevated p-4 rounded-2xl flex items-center gap-3"
                  style={{ borderColor: isVencido ? 'rgba(192,57,43,0.2)' : 'rgba(201,162,39,0.15)' }}>
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isVencido ? 'rgba(192,57,43,0.1)' : 'rgba(201,162,39,0.1)', color: isVencido ? '#E07060' : '#C9A227' }}>
                    {isVencido ? <ShieldAlert size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: '#E8E4DC' }}>{alumno.nombre || 'Sin nombre'}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: isVencido ? '#E07060' : '#C9A227' }}>
                      {isVencido ? `Vencido hace ${Math.abs(dias)}d` : dias === 0 ? 'Vence hoy' : `Vence en ${dias}d`}
                    </p>
                  </div>
                  {venc && (
                    <span className="text-[9px] font-medium shrink-0" style={{ color: '#5A5750' }}>
                      {formatDateLatam(venc.toISOString())}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border-dashed p-8 text-center" style={{ border: '1px dashed #363830', color: '#5A5750' }}>
              <CheckCircle size={24} className="mx-auto mb-2" style={{ color: '#4A8C42', opacity: 0.5 }} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Todos los alumnos al día</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
