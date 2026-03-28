import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { logoutAction } from "./actions"; 
import { 
  BookOpen, Calendar, User, LogOut, 
  FolderOpen, MonitorPlay 
} from 'lucide-react';

export default async function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre, email')
    .eq('id', user.id)
    .single();

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0];
  const avatarInitials = nombreAlumno?.substring(0, 2).toUpperCase();

  // EL ERROR ESTABA AQUÍ: Faltaba el return y las etiquetas de apertura
  return (
    <div className="h-screen bg-stone-50 flex font-sans text-stone-800 overflow-hidden text-sm">
      
      {/* --- SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-stone-950 text-stone-300 shrink-0 z-50">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-stone-800 shrink-0 bg-stone-900">
          <div className="h-7 w-7 rounded-full bg-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-[10px]">
            {avatarInitials}
          </div>
          <span className="font-serif text-sm font-bold text-white tracking-widest uppercase italic leading-none">Portal Alumno</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <Link href="/intranet" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <BookOpen className="w-4 h-4 group-hover:text-amber-500" /> Mi Formación
          </Link>
          
          <Link href="/intranet/clases" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <MonitorPlay className="w-4 h-4 group-hover:text-amber-500" /> Clases Grabadas
          </Link>

          <Link href="/intranet/materiales" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <FolderOpen className="w-4 h-4 group-hover:text-amber-500" /> Materiales PDF
          </Link>

          <Link href="/intranet/sesiones" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <Calendar className="w-4 h-4 group-hover:text-amber-500" /> Mis Sesiones
          </Link>
          
          <Link href="/intranet/perfil" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <User className="w-4 h-4 group-hover:text-amber-500" /> Mi Perfil
          </Link>
        </nav>

        <div className="p-4 border-t border-stone-800 shrink-0">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 text-stone-500 hover:text-red-400 transition-colors w-full px-2 text-[10px] font-black uppercase tracking-widest">
              <LogOut size={14} /> Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* --- CONTENIDO --- */}
<main className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-stone-50">
            <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h1 className="font-serif text-lg font-bold text-stone-900 italic">Fundación Reiki</h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-stone-900 leading-tight">{nombreAlumno}</p>
              <p className="text-[9px] text-amber-600 font-black uppercase tracking-widest">Activo</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-bold text-xs">
              {avatarInitials}
            </div>
          </div>
        </header>

<div className="flex-1 overflow-y-auto custom-scrollbar">          {children}
        </div>
      </main>
    </div>
  );
}