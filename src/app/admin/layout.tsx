import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { logoutAction } from "./actions"; 
import { 
  Activity, Users, Video, BookOpen, Bell, Settings, LogOut, Shield
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

  // 2. EL GUARDIA DE SEGURIDAD EXTREMA
  // Vamos a la base de datos y exigimos ver la credencial de este usuario
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single();

  // Si su rol NO es 'admin' Y no es el administrador maestro, lo devolvemos a la zona de alumnos
  const esAdminMaestro = user.email === 'danielriquelme@gmail.com';
  if (!esAdminMaestro && (!perfil || perfil.rol !== 'admin')) {
    redirect("/intranet");
  }

  // --- SI PASA DE AQUÍ, ES PORQUE ES EL ADMINISTRADOR OFICIAL ---

  // Datos del administrador (Puedes hacerlos dinámicos después si quieres)
  const avatarInitials = "DR";
  const nombreAdmin = "Daniel Riquelme";

  return (
    <div className="h-screen flex font-sans overflow-hidden text-sm" style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}>
      
      {/* SIDEBAR UNIFICADO DE ADMINISTRADOR */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 z-50" style={{ backgroundColor: '#141510', borderRight: '1px solid #2A2C24' }}>
        <div className="h-16 flex items-center gap-3 px-6 shrink-0" style={{ borderBottom: '1px solid #2A2C24' }}>
          <div className="h-8 w-8 rounded-xl flex items-center justify-center font-serif font-bold text-[10px] shadow-md"
            style={{ background: 'linear-gradient(135deg, #C9A227, #A07B1A)', color: '#1A1C18' }}>
            {avatarInitials}
          </div>
          <div>
            <span className="font-serif text-sm font-bold italic tracking-wide" style={{ color: '#E8E4DC' }}>Admin Panel</span>
            <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: '#C9A227' }}>Fundación Reiki</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: '#5A5750' }}>Gestión Principal</p>
          {[
            { href: '/admin',         icon: Activity, label: 'Vista General' },
            { href: '/admin/alumnos', icon: Users,    label: 'Alumnos' },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}>
              <Icon size={16} className="shrink-0" style={{ color: '#C9A227' }} />
              {label}
            </Link>
          ))}

          <p className="px-4 text-[9px] font-black uppercase tracking-[0.25em] mb-3 mt-6" style={{ color: '#5A5750' }}>Contenido</p>
          {[
            { href: '/admin/clases',     icon: Video,    label: 'Unidades Grabadas' },
            { href: '/admin/materiales', icon: BookOpen, label: 'Biblioteca PDF' },
            { href: '/admin/avisos',     icon: Bell,     label: 'Tablón de Avisos' },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}>
              <Icon size={16} className="shrink-0" style={{ color: '#4A8C42' }} />
              {label}
            </Link>
          ))}

          <p className="px-4 text-[9px] font-black uppercase tracking-[0.25em] mb-3 mt-6" style={{ color: '#5A5750' }}>Sistema</p>
          <Link href="/admin/configuracion"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider hover:text-[#E8E4DC]"
            style={{ color: '#9A9589' }}>
            <Settings size={16} className="shrink-0" style={{ color: '#8B6B91' }} />
            Configuración
          </Link>
        </nav>

        <div className="p-4 shrink-0" style={{ borderTop: '1px solid #2A2C24' }}>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-3" style={{ backgroundColor: '#1E2019' }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A227, #8B6B91)', color: '#1A1C18' }}>
              {avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: '#E8E4DC' }}>{nombreAdmin}</p>
              <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#C9A227' }}>Administrador</p>
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

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0 relative overflow-hidden" style={{ backgroundColor: '#1A1C18' }}>
        <header className="h-16 flex items-center justify-between px-8 shrink-0 z-10"
          style={{ backgroundColor: '#1E2019', borderBottom: '1px solid #2A2C24', boxShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
          <div className="flex items-center gap-2">
            <Shield size={14} style={{ color: '#C9A227' }} />
            <h1 className="font-serif text-lg font-bold italic tracking-tight" style={{ color: '#E8E4DC' }}>Panel de Administración</h1>
          </div>
          <div className="flex items-center gap-3 p-1.5 px-3 rounded-xl" style={{ backgroundColor: '#272A23', border: '1px solid #363830' }}>
            <div className="text-right hidden sm:block">
              <p className="text-[9px] uppercase font-black tracking-widest leading-none mb-1" style={{ color: '#C9A227' }}>Maestro Administrador</p>
              <p className="text-xs font-bold leading-tight" style={{ color: '#E8E4DC' }}>{nombreAdmin}</p>
            </div>
            <div className="h-8 w-8 rounded-[10px] flex items-center justify-center font-bold text-[11px] shadow-inner"
              style={{ background: 'linear-gradient(135deg, #C9A227, #A07B1A)', color: '#1A1C18' }}>
              {avatarInitials}
            </div>
          </div>
        </header>

        {/* Aquí se inyectan las páginas limpias */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}