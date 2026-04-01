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
    <div className="p-6 max-w-7xl mx-auto font-sans text-stone-800 pb-16 min-h-screen overflow-y-auto custom-scrollbar">
      
      {/* Header con saludo */}
      <header className="mb-8">
        <p className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Panel de Administración</p>
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 italic tracking-tight">
          Bienvenido, {nombreMaestro}
        </h2>
        <p className="text-stone-400 text-xs font-medium mt-1">Resumen general de tu academia y accesos rápidos.</p>
      </header>

      {/* Alerta de vencimientos próximos */}
      {alumnosPorVencer.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <div className="h-8 w-8 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
            <AlertTriangle size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-amber-800 mb-1">Atención: {alumnosPorVencer.length} alumno{alumnosPorVencer.length > 1 ? 's' : ''} por vencer en los próximos 7 días</h4>
            <div className="flex flex-wrap gap-2">
              {alumnosPorVencer.slice(0, 5).map(a => {
                const dias = Math.ceil((new Date(a.vencimiento).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <span key={a.id} className="bg-white text-amber-700 text-[9px] font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                    {a.nombre || 'Sin nombre'} — {dias === 0 ? 'Hoy' : `${dias}d`}
                  </span>
                );
              })}
              {alumnosPorVencer.length > 5 && (
                <span className="text-[9px] font-bold text-amber-600 px-2 py-1">+{alumnosPorVencer.length - 5} más</span>
              )}
            </div>
          </div>
          <Link href="/admin/alumnos" className="text-amber-600 hover:text-amber-800 transition-colors shrink-0">
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Users size={16} />
            </div>
            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest flex items-center gap-0.5">
              <CheckCircle size={10} /> {alumnosActivos.length} activos
            </span>
          </div>
          <p className="text-3xl font-black text-stone-900 leading-none mb-1">{countAlumnos || 0}</p>
          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Alumnos Total</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-500">
              <Video size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900 leading-none mb-1">{countClases || 0}</p>
          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Clases Grabadas</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-500">
              <FolderOpen size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900 leading-none mb-1">{countModulos || 0}</p>
          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Módulos</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-500">
              <FileText size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900 leading-none mb-1">{countMateriales || 0}</p>
          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Materiales PDF</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-500">
              <Bell size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900 leading-none mb-1">{countAvisos || 0}</p>
          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Avisos Publicados</p>
        </div>
      </div>

      {/* Sección inferior: Accesos rápidos + Últimos avisos + Alumnos vencidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Accesos Rápidos */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">Accesos Rápidos</h3>
          
          <Link href="/admin/clases" className="bg-stone-900 text-white p-5 rounded-2xl flex items-center justify-between group hover:shadow-xl hover:shadow-stone-900/10 transition-all">
            <div>
              <h4 className="font-bold text-sm mb-0.5">Gestionar Contenido</h4>
              <p className="text-stone-400 text-[10px] font-medium">Videos y módulos</p>
            </div>
            <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-stone-900 group-hover:scale-105 transition-transform">
              <PlusCircle size={20} />
            </div>
          </Link>

          <Link href="/admin/alumnos" className="bg-white border border-stone-200 p-5 rounded-2xl flex items-center justify-between group hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <h4 className="font-bold text-sm text-stone-900 mb-0.5">Gestionar Alumnos</h4>
              <p className="text-stone-400 text-[10px] font-medium">Registrar y administrar</p>
            </div>
            <div className="h-10 w-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <Users size={20} />
            </div>
          </Link>

          <Link href="/admin/avisos" className="bg-white border border-stone-200 p-5 rounded-2xl flex items-center justify-between group hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <h4 className="font-bold text-sm text-stone-900 mb-0.5">Publicar Aviso</h4>
              <p className="text-stone-400 text-[10px] font-medium">Comunicados para alumnos</p>
            </div>
            <div className="h-10 w-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <Bell size={20} />
            </div>
          </Link>

          <Link href="/admin/configuracion" className="bg-white border border-stone-200 p-5 rounded-2xl flex items-center justify-between group hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <h4 className="font-bold text-sm text-stone-900 mb-0.5">Configuración</h4>
              <p className="text-stone-400 text-[10px] font-medium">Perfil y enlaces</p>
            </div>
            <div className="h-10 w-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <Settings size={20} />
            </div>
          </Link>
        </div>

        {/* Últimos Avisos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Últimos Avisos</h3>
            <Link href="/admin/avisos" className="text-[9px] font-black text-amber-600 uppercase tracking-widest hover:underline">Ver todos</Link>
          </div>
          
          {(ultimosAvisos && ultimosAvisos.length > 0) ? (
            ultimosAvisos.map(aviso => (
              <div key={aviso.id} className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                    <Bell size={12} />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 truncate flex-1">{aviso.titulo}</h4>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed mb-2">{aviso.mensaje}</p>
                <div className="flex items-center gap-2 text-[9px] text-stone-400 font-medium">
                  <Calendar size={10} />
                  {aviso.created_at ? formatDateLatam(aviso.created_at) : 'Reciente'}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-dashed border-stone-200 p-8 rounded-2xl text-center">
              <Bell size={24} className="text-stone-200 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sin avisos publicados</p>
            </div>
          )}
        </div>

        {/* Alumnos que requieren atención */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Requieren Atención</h3>
            <Link href="/admin/alumnos" className="text-[9px] font-black text-amber-600 uppercase tracking-widest hover:underline">Ver todos</Link>
          </div>
          
          {([...alumnosPorVencer, ...alumnosVencidos.slice(0, 3)].length > 0) ? (
            [...alumnosPorVencer, ...alumnosVencidos.slice(0, 3)].slice(0, 6).map(alumno => {
              const venc = alumno.vencimiento ? new Date(alumno.vencimiento) : null;
              const dias = venc ? Math.ceil((venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)) : -999;
              const isVencido = dias < 0;

              return (
                <div key={alumno.id} className={`bg-white border p-4 rounded-2xl shadow-sm flex items-center gap-3 ${isVencido ? 'border-red-100' : 'border-amber-100'}`}>
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${isVencido ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
                    {isVencido ? <ShieldAlert size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate">{alumno.nombre || 'Sin nombre'}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${isVencido ? 'text-red-500' : 'text-amber-600'}`}>
                      {isVencido ? `Vencido hace ${Math.abs(dias)}d` : dias === 0 ? 'Vence hoy' : `Vence en ${dias}d`}
                    </p>
                  </div>
                  {venc && (
                    <span className="text-[9px] text-stone-400 font-medium shrink-0">
                      {formatDateLatam(venc.toISOString())}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-dashed border-stone-200 p-8 rounded-2xl text-center">
              <CheckCircle size={24} className="text-green-300 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Todos los alumnos al día</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
