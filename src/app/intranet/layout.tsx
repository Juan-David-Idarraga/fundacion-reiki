import React, { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { logoutAction } from './actions'
import { ReikiLogo } from '@/components/reiki-logo'
import { MobileNav } from '@/components/mobile-nav'
import { LogoutButtonIntranet } from '@/components/logout-button-intranet'
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

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0] || 'Alumno'
  const avatarInitials = nombreAlumno.substring(0, 2).toUpperCase()

  // Links para el sidebar desktop (con íconos React — válido en Server Component)
  const desktopNavLinks = [
    {
      href: '/intranet',
      icon: BookOpen,
      label: 'Mi Formación',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/clases',
      icon: MonitorPlay,
      label: 'Clases Grabadas',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/materiales',
      icon: FolderOpen,
      label: 'Materiales PDF',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/sesiones',
      icon: Calendar,
      label: 'Mis Sesiones',
      iconColor: '#8B6B91',
    },
    {
      href: '/intranet/perfil',
      icon: User,
      label: 'Mi Perfil',
      iconColor: '#C9A227',
    },
  ]

  // Links para el MobileNav (solo objetos planos serializables — iconId en lugar de componente)
  const mobileNavLinks = [
    {
      href: '/intranet',
      iconId: 'BookOpen',
      label: 'Mi Formación',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/clases',
      iconId: 'MonitorPlay',
      label: 'Clases Grabadas',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/materiales',
      iconId: 'FolderOpen',
      label: 'Materiales PDF',
      iconColor: '#4A8C42',
    },
    {
      href: '/intranet/sesiones',
      iconId: 'Calendar',
      label: 'Mis Sesiones',
      iconColor: '#8B6B91',
    },
    {
      href: '/intranet/perfil',
      iconId: 'User',
      label: 'Mi Perfil',
      iconColor: '#C9A227',
    },
  ]

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-sm"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* ── SIDEBAR DESKTOP (lg+) ── */}
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
          {desktopNavLinks.map(({ href, icon: Icon, label, iconColor }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}
            >
              <Icon
                size={16}
                className="shrink-0"
                style={{ color: iconColor }}
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
        {/* Header con botón hamburguesa en móvil */}
        <header
          className="z-10 flex h-16 shrink-0 items-center justify-between px-5 lg:px-8"
          style={{
            backgroundColor: '#1E2019',
            borderBottom: '1px solid #2A2C24',
            boxShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Izquierda: hamburguesa (móvil) + título */}
          <div className="flex items-center gap-3">
            {/*
              MobileNav recibe solo props serializables (strings).
              Los íconos se resuelven internamente con ICON_MAP.
              El logout se inyecta como ReactNode (logoutSlot) para evitar
              pasar Server Actions como props.
            */}
            <MobileNav
              links={mobileNavLinks}
              userName={nombreAlumno}
              userRole="Alumno Activo"
              avatarInitials={avatarInitials}
              avatarGradient="linear-gradient(135deg, #4A8C42, #8B6B91)"
              roleColor="#4A8C42"
              title="Portal Alumno"
              titleColor="#4A8C42"
              logoutSlot={<LogoutButtonIntranet />}
            />
            <div className="flex items-center gap-2">
              <Sparkles size={14} style={{ color: '#C9A227' }} />
              <h1
                className="font-serif text-base font-bold italic lg:text-lg"
                style={{ color: '#E8E4DC' }}
              >
                Fundación Reiki
              </h1>
            </div>
          </div>

          {/* Derecha: nombre + avatar */}
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
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center p-12">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="h-10 w-10 animate-spin rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: '#4A8C42',
                      borderRightColor: '#4A8C42',
                    }}
                  />
                  <p
                    className="text-[11px] font-black tracking-widest uppercase"
                    style={{ color: '#5A5750' }}
                  >
                    Cargando...
                  </p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
