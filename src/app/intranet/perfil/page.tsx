import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions"; 
import { 
  User as UserIcon, Mail, Calendar, 
  ShieldCheck, LogOut, Sparkles, Clock,
  MessageCircle, BookOpen, FileText, Shield
} from 'lucide-react';
import { formatDateLatam } from '@/utils/date-format';

export default async function PerfilAlumnoPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Obtenemos los datos del perfil
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0];
  const avatarInitials = nombreAlumno?.substring(0, 2).toUpperCase();
  
  // Cálculo de días restantes
  const fechaVencimiento = perfil?.vencimiento ? new Date(perfil.vencimiento) : null;
  const hoy = new Date();
  const diasRestantes = fechaVencimiento 
    ? Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;

  const isActive = diasRestantes > 0;

  return (
    <div className="min-h-screen bg-[#F9F6F0] font-sans overflow-y-auto custom-scrollbar">
      
      {/* Header con gradiente */}
      <div className="bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950"></div>
        <div className="absolute top-0 right-0 p-6 opacity-[0.02]">
          <Sparkles size={200} />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-serif font-bold text-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0">
            {avatarInitials}
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold text-white italic mb-1">{nombreAlumno}</h2>
            <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em]">Alumno Oficial del Centro de Reiki</p>
          </div>

          <div className="md:ml-auto">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${isActive ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`}></div>
              {isActive ? `Activo | ${diasRestantes} días restantes` : 'Acceso Vencido'}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tarjeta: Correo Electrónico */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                <Mail size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Correo Electrónico</p>
            </div>
            <p className="text-sm font-bold text-stone-800 truncate">{user.email}</p>
          </div>

          {/* Tarjeta: Estado de Suscripción */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'}`}>
                <Clock size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Estado de Acceso</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-stone-800">
                {isActive ? 'Suscripción Activa' : 'Acceso Vencido'}
              </p>
              {isActive && (
                <span className="bg-stone-900 text-amber-500 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shrink-0">
                  {diasRestantes} días
                </span>
              )}
            </div>
          </div>

          {/* Tarjeta: Fecha de Vencimiento */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                <Calendar size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Fecha de Vencimiento</p>
            </div>
            <p className="text-sm font-bold text-stone-800">
              {fechaVencimiento ? formatDateLatam(fechaVencimiento.toISOString()) : 'Sin definir'}
            </p>
          </div>

          {/* Tarjeta: Rol */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Shield size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Rol en la Academia</p>
            </div>
            <p className="text-sm font-bold text-stone-800 capitalize">{perfil?.rol || 'Alumno'}</p>
          </div>

          {/* Tarjeta: Nombre Público */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                <UserIcon size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Nombre Público</p>
            </div>
            <p className="text-sm font-bold text-stone-800">{nombreAlumno}</p>
          </div>

          {/* Tarjeta: Soporte */}
          <a 
            href="https://wa.me/56951735495" 
            target="_blank"
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                <MessageCircle size={16} />
              </div>
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Soporte</p>
            </div>
            <p className="text-sm font-bold text-stone-800 group-hover:text-amber-700 transition-colors">Contactar al Maestro</p>
          </a>

        </div>

        {/* Acciones */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-amber-500" />
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Para dudas sobre tu acceso, contacta a la administración.</p>
          </div>
          <form action={logoutAction}>
            <button 
              type="submit" 
              className="group bg-white border border-stone-200 text-stone-400 px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-[0.98]"
            >
              <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
