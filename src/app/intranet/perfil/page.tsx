import React from 'react'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/admin/actions'
import {
  User as UserIcon,
  Mail,
  Calendar,
  ShieldCheck,
  LogOut,
  Sparkles,
  Clock,
  MessageCircle,
  Shield,
} from 'lucide-react'
import { formatDateLatam } from '@/utils/date-format'

export default async function PerfilAlumnoPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const nombreAlumno = perfil?.nombre || user.email?.split('@')[0]
  const avatarInitials = nombreAlumno?.substring(0, 2).toUpperCase()

  const fechaVencimiento = perfil?.vencimiento
    ? new Date(perfil.vencimiento)
    : null
  const hoy = new Date()
  const diasRestantes = fechaVencimiento
    ? Math.ceil(
        (fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0

  const isActive = diasRestantes > 0

  const infoCards = [
    {
      icon: Mail,
      label: 'Correo Electrónico',
      value: user.email,
      iconColor: '#8B6B91',
      iconBg: 'rgba(139,107,145,0.1)',
    },
    {
      icon: Clock,
      label: 'Estado de Acceso',
      value: isActive ? 'Suscripción Activa' : 'Acceso Vencido',
      badge: isActive ? `${diasRestantes} días` : null,
      iconColor: isActive ? '#4A8C42' : '#E07060',
      iconBg: isActive ? 'rgba(74,140,66,0.1)' : 'rgba(192,57,43,0.1)',
    },
    {
      icon: Calendar,
      label: 'Fecha de Vencimiento',
      value: fechaVencimiento
        ? formatDateLatam(fechaVencimiento.toISOString())
        : 'Sin definir',
      iconColor: '#C9A227',
      iconBg: 'rgba(201,162,39,0.1)',
    },
    {
      icon: Shield,
      label: 'Rol en la Academia',
      value: perfil?.rol
        ? perfil.rol.charAt(0).toUpperCase() + perfil.rol.slice(1)
        : 'Alumno',
      iconColor: '#C9A227',
      iconBg: 'rgba(201,162,39,0.1)',
    },
    {
      icon: UserIcon,
      label: 'Nombre Público',
      value: nombreAlumno,
      iconColor: '#8B6B91',
      iconBg: 'rgba(139,107,145,0.1)',
    },
  ]

  return (
    <div
      className="custom-scrollbar min-h-screen overflow-y-auto font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* Header con gradiente oscuro */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: '#141510' }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 right-0 h-64 w-64 rounded-full opacity-10 blur-[100px]"
            style={{ backgroundColor: '#4A8C42' }}
          />
        </div>
        <div
          className="absolute top-0 right-0 p-6 opacity-[0.03]"
          style={{ color: '#4A8C42' }}
        >
          <Sparkles size={200} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row">
          {/* Avatar */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full font-serif text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #4A8C42, #8B6B91)',
              color: '#E8E4DC',
              boxShadow: '0 0 24px rgba(74,140,66,0.25)',
            }}
          >
            {avatarInitials}
          </div>

          <div className="text-center md:text-left">
            <h2
              className="mb-1 font-serif text-2xl font-bold italic"
              style={{ color: '#E8E4DC' }}
            >
              {nombreAlumno}
            </h2>
            <p
              className="text-[9px] font-black tracking-[0.3em] uppercase"
              style={{ color: '#4A8C42' }}
            >
              Alumno Oficial del Centro de Reiki
            </p>
          </div>

          <div className="md:ml-auto">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 text-[9px] font-black tracking-widest uppercase"
              style={{
                backgroundColor: isActive
                  ? 'rgba(74,140,66,0.08)'
                  : 'rgba(192,57,43,0.08)',
                color: isActive ? '#4A8C42' : '#E07060',
                border: `1px solid ${isActive ? 'rgba(74,140,66,0.2)' : 'rgba(192,57,43,0.2)'}`,
              }}
            >
              <div
                className={`h-2 w-2 rounded-full ${isActive ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: isActive ? '#4A8C42' : '#E07060' }}
              />
              {isActive
                ? `Activo | ${diasRestantes} días restantes`
                : 'Acceso Vencido'}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infoCards.map(
            ({ icon: Icon, label, value, badge, iconColor, iconBg }) => (
              <div key={label} className="card-elevated rounded-2xl p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: iconBg, color: iconColor }}
                  >
                    <Icon size={16} />
                  </div>
                  <p
                    className="text-[9px] font-black tracking-widest uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    {label}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="truncate text-sm font-bold"
                    style={{ color: '#E8E4DC' }}
                  >
                    {value}
                  </p>
                  {badge && (
                    <span className="badge-reiki badge-reiki-green shrink-0 text-[8px]">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            ),
          )}

          {/* Tarjeta: Soporte */}
          <a
            href="https://wa.me/56951735495"
            target="_blank"
            className="card-elevated group cursor-pointer rounded-2xl p-5 transition-all hover:border-[rgba(37,211,102,0.25)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
                style={{
                  backgroundColor: 'rgba(37,211,102,0.08)',
                  color: '#25D366',
                }}
              >
                <MessageCircle size={16} />
              </div>
              <p
                className="text-[9px] font-black tracking-widest uppercase"
                style={{ color: '#9A9589' }}
              >
                Soporte
              </p>
            </div>
            <p
              className="text-sm font-bold transition-colors"
              style={{ color: '#E8E4DC' }}
            >
              Contactar al Maestro
            </p>
          </a>
        </div>

        {/* Acciones */}
        <div className="card-elevated mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} style={{ color: '#4A8C42' }} />
            <p
              className="text-[9px] font-black tracking-widest uppercase"
              style={{ color: '#9A9589' }}
            >
              Para dudas sobre tu acceso, contacta a la administración.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="group flex items-center gap-2 rounded-xl px-6 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all active:scale-[0.98]"
              style={{
                backgroundColor: 'rgba(192,57,43,0.08)',
                color: '#9A9589',
                border: '1px solid rgba(192,57,43,0.15)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.color = '#E07060'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(192,57,43,0.35)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.color = '#9A9589'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(192,57,43,0.15)'
              }}
            >
              <LogOut
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
