import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { logoutAction } from './actions'
import { ReikiLogo } from '@/components/reiki-logo'
import {
  Activity,
  Users,
  Video,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 1. Si no hay usuario logueado, patada al login
  if (!user) {
    redirect('/login')
  }

  // 2. EL GUARDIA DE SEGURIDAD EXTREMA
  // Vamos a la base de datos y exigimos ver la credencial de este usuario
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  // Si su rol NO es 'admin' Y no es el administrador maestro, lo devolvemos a la zona de alumnos
  const esAdminMaestro = user.email === 'danielriquelme@gmail.com'
  if (!esAdminMaestro && (!perfil || perfil.rol !== 'admin')) {
    redirect('/intranet')
  }

  // --- SI PASA DE AQUÍ, ES PORQUE ES EL ADMINISTRADOR OFICIAL ---

  // Datos del administrador (Puedes hacerlos dinámicos después si quieres)
  const avatarInitials = 'DR'
  const nombreAdmin = 'Daniel Riquelme'

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-sm"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* SIDEBAR UNIFICADO DE ADMINISTRADOR */}
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
            variant="gold"
            title="Admin Panel"
            subtitle="Fundación Reiki"
            href="/admin"
          />
        </div>

        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-6">
          <p
            className="mb-3 px-4 text-[9px] font-black tracking-[0.25em] uppercase"
            style={{ color: '#5A5750' }}
          >
            Gestión Principal
          </p>
          {[
            { href: '/admin', icon: Activity, label: 'Vista General' },
            { href: '/admin/alumnos', icon: Users, label: 'Alumnos' },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all hover:text-[#E8E4DC]"
              style={{ color: '#9A9589' }}
            >
              <Icon
                size={16}
                className="shrink-0"
                style={{ color: '#C9A227' }}
              />
              {label}
            </Link>
          ))}

          <p
            className="mt-6 mb-3 px-4 text-[9px] font-black tracking-[0.25em] uppercase"
            style={{ color: '#5A5750' }}
          >
            Contenido
          </p>
          {[
            { href: '/admin/clases', icon: Video, label: 'Unidades Grabadas' },
            {
              href: '/admin/materiales',
              icon: BookOpen,
              label: 'Biblioteca PDF',
            },
            { href: '/admin/avisos', icon: Bell, label: 'Tablón de Avisos' },
          ].map(({ href, icon: Icon, label }) => (
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

          <p
            className="mt-6 mb-3 px-4 text-[9px] font-black tracking-[0.25em] uppercase"
            style={{ color: '#5A5750' }}
          >
            Sistema
          </p>
          <Link
            href="/admin/configuracion"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all hover:text-[#E8E4DC]"
            style={{ color: '#9A9589' }}
          >
            <Settings
              size={16}
              className="shrink-0"
              style={{ color: '#8B6B91' }}
            />
            Configuración
          </Link>
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
                background: 'linear-gradient(135deg, #C9A227, #8B6B91)',
                color: '#1A1C18',
              }}
            >
              {avatarInitials}
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-xs font-bold"
                style={{ color: '#E8E4DC' }}
              >
                {nombreAdmin}
              </p>
              <p
                className="text-[8px] font-black tracking-widest uppercase"
                style={{ color: '#C9A227' }}
              >
                Administrador
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

      {/* ÁREA DE CONTENIDO */}
      <main
        className="relative flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden"
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
            <Shield size={14} style={{ color: '#C9A227' }} />
            <h1
              className="font-serif text-lg font-bold tracking-tight italic"
              style={{ color: '#E8E4DC' }}
            >
              Panel de Administración
            </h1>
          </div>
          <div
            className="flex items-center gap-3 rounded-xl p-1.5 px-3"
            style={{ backgroundColor: '#272A23', border: '1px solid #363830' }}
          >
            <div className="hidden text-right sm:block">
              <p
                className="mb-1 text-[9px] leading-none font-black tracking-widest uppercase"
                style={{ color: '#C9A227' }}
              >
                Maestro Administrador
              </p>
              <p
                className="text-xs leading-tight font-bold"
                style={{ color: '#E8E4DC' }}
              >
                {nombreAdmin}
              </p>
            </div>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[10px] text-[11px] font-bold shadow-inner"
              style={{
                background: 'linear-gradient(135deg, #C9A227, #A07B1A)',
                color: '#1A1C18',
              }}
            >
              {avatarInitials}
            </div>
          </div>
        </header>

        {/* Aquí se inyectan las páginas limpias */}
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
