import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { logoutAction } from "./actions"; 
import { 
  Activity, Users, Video, BookOpen, Bell, Settings, LogOut 
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Si no hay usuario logueado, patada al login
  if (!user) {
    redirect("/login");
  }

  // 2. EL GUARDIA DE SEGURIDAD EXTREMA 🛡️
  // Vamos a la base de datos y exigimos ver la credencial de este usuario
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single();

  // Si su rol NO es 'admin', lo devolvemos inmediatamente a la zona de alumnos
  if (!perfil || perfil.rol !== 'admin') {
    redirect("/intranet");
  }

  // --- SI PASA DE AQUÍ, ES PORQUE ES EL ADMINISTRADOR OFICIAL ---

  // Datos del administrador (Puedes hacerlos dinámicos después si quieres)
  const avatarInitials = "DR";
  const nombreAdmin = "Daniel Riquelme";

  return (
    <div className="h-screen bg-stone-50 flex font-sans text-stone-800 overflow-hidden text-sm">
      
      {/* SIDEBAR UNIFICADO DE ADMINISTRADOR */}
      <aside className="hidden lg:flex flex-col w-64 bg-stone-950 text-stone-400 shrink-0 z-50 shadow-2xl">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-stone-800 shrink-0 bg-stone-900">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-[10px] shadow-sm">
            {avatarInitials}
          </div>
          <span className="font-serif text-base font-bold text-white tracking-widest uppercase italic leading-none mt-0.5">Admin Panel</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-stone-600 uppercase tracking-[0.2em] mb-4">Gestión Principal</p>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Activity size={18} className="group-hover:text-amber-500" /> Vista General
          </Link>
          <Link href="/admin/alumnos" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Users size={18} className="group-hover:text-amber-500" /> Alumnos
          </Link>
          
          <p className="px-4 text-[10px] font-black text-stone-600 uppercase tracking-[0.2em] mb-4 mt-8">Contenido y Clases</p>
          <Link href="/admin/clases" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Video size={18} className="group-hover:text-amber-500" /> Unidades Grabadas
          </Link>
          <Link href="/admin/materiales" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <BookOpen size={18} className="group-hover:text-amber-500" /> Biblioteca PDF
          </Link>
          <Link href="/admin/avisos" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Bell size={18} className="group-hover:text-amber-500" /> Tablón de Avisos
          </Link>

          <p className="px-4 text-[10px] font-black text-stone-600 uppercase tracking-[0.2em] mb-4 mt-8">Sistema</p>
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Settings size={18} className="group-hover:text-amber-500" /> Configuración
          </Link>
        </nav>

        <div className="p-4 border-t border-stone-800 shrink-0 bg-stone-900/50">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-stone-50 relative">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <h1 className="font-serif text-xl font-bold text-stone-900 italic tracking-tight">Fundación Reiki Usui</h1>
          <div className="flex items-center gap-3 bg-stone-50 p-1.5 px-3 rounded-xl border border-stone-100">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] text-amber-600 uppercase font-black tracking-widest leading-none mb-1">Profesor Maestro</p>
              <p className="text-xs font-bold text-stone-900 leading-tight">{nombreAdmin}</p>
            </div>
            <div className="h-8 w-8 rounded-[10px] bg-stone-900 flex items-center justify-center text-white font-bold text-[11px] shadow-inner">
              {avatarInitials}
            </div>
          </div>
        </header>

        {/* Aquí se inyectan las páginas limpias */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}