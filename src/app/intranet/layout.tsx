import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { logoutAction } from "./actions"; 
import { 
  BookOpen, Calendar, User, LogOut, 
  FolderOpen, MonitorPlay, Sparkles
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

  const navLinks = [
    { href: '/intranet',            icon: BookOpen,    label: 'Mi Formación' },
    { href: '/intranet/clases',     icon: MonitorPlay, label: 'Clases Grabadas' },
    { href: '/intranet/materiales', icon: FolderOpen,  label: 'Materiales PDF' },
    { href: '/intranet/sesiones',   icon: Calendar,    label: 'Mis Sesiones' },
    { href: '/intranet/perfil',     icon: User,        label: 'Mi Perfil' },
  ];

  return (
    <div className="h-screen flex font-sans overflow-hidden text-sm" style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 z-50" style={{ backgroundColor: '#141510', borderRight: '1px solid #2A2C24' }}>
        <div className="h-16 flex items-center gap-3 px-6 shrink-0" style={{ borderBottom: '1px solid #2A2C24' }}>
          <div className="h-8 w-8 rounded-xl flex items-center justify-center font-serif font-bold text-[10px] shadow-md"
            style={{ background: 'linear-gradient(135deg, #4A8C42, #3A7035)', color: '#E8E4DC' }}>
            CR
          </div>
          <div>
            <span className="font-serif text-sm font-bold italic tracking-wide" style={{ color: '#E8E4DC' }}>Portal Alumno</span>
            <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: '#4A8C42' }}>Fundación Reiki</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#5A5750' }}>Navegación</p>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}>
              <Icon size={16} className="shrink-0" style={{ color: '#4A8C42' }} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 shrink-0" style={{ borderTop: '1px solid #2A2C24' }}>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-3" style={{ backgroundColor: '#1E2019' }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
              style={{ background: 'linear-gradient(135deg, #4A8C42, #8B6B91)', color: '#E8E4DC' }}>
              {avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: '#E8E4DC' }}>{nombreAlumno}</p>
              <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#4A8C42' }}>Activo</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button type="submit"
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest hover:text-[#E07060]"
              style={{ color: '#5A5750' }}>
              <LogOut size={14} /> Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── ÁREA PRINCIPAL ── */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden" style={{ backgroundColor: '#1A1C18' }}>
        <header className="h-16 flex items-center justify-between px-8 shrink-0 z-10"
          style={{ backgroundColor: '#1E2019', borderBottom: '1px solid #2A2C24', boxShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: '#C9A227' }} />
            <h1 className="font-serif text-lg font-bold italic" style={{ color: '#E8E4DC' }}>Fundación Reiki</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-tight" style={{ color: '#E8E4DC' }}>{nombreAlumno}</p>
              <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#4A8C42' }}>Alumno Activo</p>
            </div>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md"
              style={{ background: 'linear-gradient(135deg, #4A8C42, #8B6B91)', color: '#E8E4DC' }}>
              {avatarInitials}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}