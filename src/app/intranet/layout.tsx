import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { logoutAction } from './actions'
import { ReikiLogo } from '@/components/reiki-logo'
import {
  BookOpen,
  Calendar,
  User,
  LogOut,
  FolderOpen,
  MonitorPlay,
  Sparkles,
} from 'lucide-react'

export default async function IntranetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre, email')
    .eq('id', user.id)
    .single()

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0]
  const avatarInitials = nombreAlumno?.substring(0, 2).toUpperCase()

  const navLinks = [
    { href: '/intranet', icon: BookOpen, label: 'Mi Formación' },
    { href: '/intranet/clases', icon: MonitorPlay, label: 'Clases Grabadas' },
    { href: '/intranet/materiales', icon: FolderOpen, label: 'Materiales PDF' },
    { href: '/intranet/sesiones', icon: Calendar, label: 'Mis Sesiones' },
    { href: '/intranet/perfil', icon: User, label: 'Mi Perfil' },
  ]

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-sm"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        className="z-50 hidden w-64 shrink-0 flex-col lg:flex"
        style={{ backgroundColor: '#141510', borderRight: '1px solid #2A2C24' }}
      >
        <div
          className="flex h-16 shrink-0 items-center px-5"
          style={{ borderBottom: '1px solid #2A2C24' }}
        >
          <ReikiLogo
            iconSize={30}
            variant="green"
            title="Portal Alumno"
            subtitle="Fundación Reiki"
            href="/intranet"
          />
        </div>

        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-6">
          <p
            className="mb-4 px-4 text-[9px] font-black tracking-[0.25em] uppercase"
            style={{ color: '#5A5750' }}
          >
            Navegación
          </p>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}
            >
              <Icon
                size={16}
                className="shrink-0"
                style={{ color: '#4A8C42' }}
              />
              {label}
            </Link>
          ))}
        </nav>

        <div
          className="shrink-0 p-4"
          style={{ borderTop: '1px solid #2A2C24' }}
        >
          <div
            className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3"
            style={{ backgroundColor: '#1E2019' }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #4A8C42, #8B6B91)',
                color: '#E8E4DC',
              }}
            >
              {avatarInitials}
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-xs font-bold"
                style={{ color: '#E8E4DC' }}
              >
                {nombreAlumno}
              </p>
              <p
                className="text-[8px] font-black tracking-widest uppercase"
                style={{ color: '#4A8C42' }}
              >
                Activo
              </p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all hover:text-[#E07060]"
              style={{ color: '#5A5750' }}
            >
              <LogOut size={14} /> Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── ÁREA PRINCIPAL ── */}
      <main
        className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden"
        style={{ backgroundColor: '#1A1C18' }}
      >
        <header
          className="z-10 flex h-16 shrink-0 items-center justify-between px-8"
          style={{
            backgroundColor: '#1E2019',
            borderBottom: '1px solid #2A2C24',
            boxShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: '#C9A227' }} />
            <h1
              className="font-serif text-lg font-bold italic"
              style={{ color: '#E8E4DC' }}
            >
              Fundación Reiki
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p
                className="text-xs leading-tight font-bold"
                style={{ color: '#E8E4DC' }}
              >
                {nombreAlumno}
              </p>
              <p
                className="text-[9px] font-black tracking-widest uppercase"
                style={{ color: '#4A8C42' }}
              >
                Alumno Activo
              </p>
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold shadow-md"
              style={{
                background: 'linear-gradient(135deg, #4A8C42, #8B6B91)',
                color: '#E8E4DC',
              }}
            >
              {avatarInitials}
            </div>
          </div>
        </header>

        <div className="custom-scrollbar flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
