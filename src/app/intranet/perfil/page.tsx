import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions"; 
import { 
  User as UserIcon, Mail, Calendar, 
  ShieldCheck, LogOut, Sparkles, Clock 
} from 'lucide-react';

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
    // Contenedor centrado y de altura fija para que encaje perfecto sin scroll
    <div className="h-[calc(100vh-64px)] flex flex-col p-6 bg-stone-50 overflow-hidden font-sans items-center justify-center">
      
      {/* TARJETA DE PERFIL COMPACTA */}
      <div className="w-full max-w-4xl bg-white rounded-[40px] border border-stone-200 shadow-2xl shadow-stone-200/40 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* LADO IZQUIERDO: IDENTIDAD */}
        <div className="md:w-5/12 bg-stone-950 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950"></div>
          <div className="absolute top-0 left-0 p-6 opacity-[0.02]">
            <Sparkles size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar Gigante */}
            <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-serif font-bold text-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-6">
              {avatarInitials}
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-white italic mb-1">{nombreAlumno}</h2>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">Alumno Oficial</p>
          </div>
        </div>

        {/* LADO DERECHO: DATOS Y ACCIONES */}
        <div className="md:w-7/12 p-10 lg:p-12 flex flex-col justify-between bg-white relative">
          
          <div>
            <div className="flex items-center gap-2 mb-8">
              <ShieldCheck size={20} className="text-amber-500" />
              <h3 className="font-serif text-xl font-bold text-stone-900 italic leading-none">Datos de la Cuenta</h3>
            </div>

            <div className="space-y-6 mb-10">
              {/* Campo Correo */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-stone-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-0.5">Correo Electrónico</p>
                  <p className="text-xs font-bold text-stone-800 truncate">{user.email}</p>
                </div>
              </div>

              {/* Campo Estado de Suscripción */}
         <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${isActive ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                  <Clock size={18} />
                </div>
                {/* min-w-0 evita que el contenedor se desborde */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Estado de Acceso</p>
                  
                  {/* flex-wrap y gap-2 arreglan el problema de superposición */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-stone-800 truncate">
                      {isActive ? 'Suscripción Activa' : 'Acceso Vencido'}
                    </p>
                    {isActive && (
                      <span className="bg-stone-900 text-amber-500 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shrink-0">
                        {diasRestantes} días restantes
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <form action={logoutAction} className="mt-auto">
            <button 
              type="submit" 
              className="w-full group bg-white border-2 border-stone-200 text-stone-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all active:scale-[0.98]"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              Cerrar Sesión Segura
            </button>
          </form>

        </div>
      </div>
      
      {/* Info extra */}
      <p className="mt-8 text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">
        Para dudas sobre tu acceso, contacta a la administración.
      </p>
    </div>
  );
}