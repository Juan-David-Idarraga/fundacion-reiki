import React from 'react'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  Settings,
  User,
  Lock,
  Video,
  Phone,
  ShieldCheck,
  Link2,
  CheckCircle,
} from 'lucide-react'

export default async function AdminConfiguracionPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // 1. Obtener el perfil actual del admin
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 2. Obtener los enlaces de configuración global
  const { data: config } = await supabase
    .from('configuracion')
    .select('*')
    .eq('id', 1)
    .single()

  // --- SERVER ACTIONS (FUNCIONES DE GUARDADO) ---

  // Acción 1: Guardar Nombre
  async function actualizarPerfil(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    const {
      data: { user },
    } = await supabaseServer.auth.getUser()
    if (!user) return

    const nombre = formData.get('nombre') as string
    if (nombre && nombre.trim()) {
      await supabaseServer.from('perfiles').update({ nombre }).eq('id', user.id)
      revalidatePath('/admin/configuracion')
      revalidatePath('/admin')
    }
  }

  // Acción 2: Guardar Enlaces
  async function actualizarEnlaces(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()

    const zoom_link = formData.get('zoom_link') as string
    const whatsapp_link = formData.get('whatsapp_link') as string

    if (zoom_link || whatsapp_link) {
      await supabaseServer
        .from('configuracion')
        .update({
          zoom_link: zoom_link || null,
          whatsapp_link: whatsapp_link || null,
        })
        .eq('id', 1)

      revalidatePath('/admin/configuracion')
      revalidatePath('/intranet/sesiones')
    }
  }

  // Acción 3: Cambiar Contraseña
  async function actualizarPassword(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    const password = formData.get('password') as string

    if (password && password.length >= 6) {
      await supabaseServer.auth.updateUser({ password: password })
      revalidatePath('/admin/configuracion')
    }
  }

  // --- INTERFAZ VISUAL (SOFT DARK MODE) ---

  return (
    <div
      className="custom-scrollbar flex min-h-screen flex-col overflow-y-auto p-6 font-sans lg:p-8"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* ── HEADER ── */}
      <header
        className="mb-8 shrink-0 pb-6"
        style={{ borderBottom: '1px solid #2A2C24' }}
      >
        <h2
          className="mb-2 flex items-center gap-3 font-serif text-3xl font-bold italic lg:text-4xl"
          style={{ color: '#E8E4DC' }}
        >
          <Settings size={32} style={{ color: '#C9A227' }} />
          Configuración del Sistema
        </h2>
        <p
          className="text-xs font-black tracking-[0.2em] uppercase"
          style={{ color: '#5A5750' }}
        >
          Administra los parámetros de tu academia y tu cuenta.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-12">
        {/* ── COLUMNA IZQUIERDA (7/12) ── */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* 1. FORMULARIO DE PERFIL */}
          <div className="card-elevated flex flex-col gap-6 rounded-3xl p-6 lg:p-8">
            <div
              className="flex items-center gap-3 pb-5"
              style={{ borderBottom: '1px solid #2A2C24' }}
            >
              <div
                className="rounded-xl p-2.5"
                style={{
                  backgroundColor: 'rgba(201,162,39,0.1)',
                  color: '#C9A227',
                }}
              >
                <User size={20} />
              </div>
              <div>
                <h3
                  className="font-serif text-xl font-bold italic"
                  style={{ color: '#E8E4DC' }}
                >
                  Perfil del Maestro
                </h3>
                <p className="mt-0.5 text-xs" style={{ color: '#5A5750' }}>
                  Actualiza tu información pública
                </p>
              </div>
            </div>

            <form action={actualizarPerfil} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-[10px] font-black tracking-widest uppercase"
                    style={{ color: '#5A5750' }}
                  >
                    Nombre Público
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={perfil?.nombre || ''}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-[10px] font-black tracking-widest uppercase"
                    style={{ color: '#5A5750' }}
                  >
                    Correo (Solo Lectura)
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user.email}
                    className="w-full cursor-not-allowed rounded-xl px-4 py-3 text-sm font-medium"
                    style={{
                      backgroundColor: '#1E2019',
                      border: '1px solid #2A2C24',
                      color: '#5A5750',
                    }}
                  />
                </div>
              </div>
              <div
                className="flex justify-end pt-5"
                style={{ borderTop: '1px solid #2A2C24' }}
              >
                <button
                  type="submit"
                  className="btn-ripple rounded-xl px-8 py-3 text-[10px] font-bold tracking-widest uppercase shadow-lg transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: '#4A8C42',
                    color: '#E8E4DC',
                    boxShadow: '0 4px 16px rgba(74,140,66,0.25)',
                  }}
                >
                  <CheckCircle className="mr-2 inline" size={14} />
                  Guardar Nombre
                </button>
              </div>
            </form>
          </div>

          {/* 2. FORMULARIO DE SEGURIDAD (CONTRASEÑA) */}
          <div
            className="card-elevated flex flex-col gap-6 rounded-3xl p-6 lg:p-8"
            style={{ borderColor: 'rgba(220,38,38,0.15)' }}
          >
            <div
              className="flex items-center gap-3 pb-5"
              style={{ borderBottom: '1px solid rgba(220,38,38,0.1)' }}
            >
              <div
                className="rounded-xl p-2.5"
                style={{
                  backgroundColor: 'rgba(220,38,38,0.08)',
                  color: '#f87171',
                }}
              >
                <Lock size={20} />
              </div>
              <div>
                <h3
                  className="font-serif text-xl font-bold italic"
                  style={{ color: '#E8E4DC' }}
                >
                  Seguridad de la Cuenta
                </h3>
                <p className="mt-0.5 text-xs" style={{ color: '#5A5750' }}>
                  Cambia tu contraseña regularmente
                </p>
              </div>
            </div>

            <form action={actualizarPassword} className="flex flex-col gap-4">
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(220,38,38,0.04)',
                  border: '1px solid rgba(220,38,38,0.1)',
                }}
              >
                <label
                  className="mb-2 block text-[10px] font-black tracking-widest uppercase"
                  style={{ color: '#5A5750' }}
                >
                  Nueva Contraseña (Mín. 6 caracteres)
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Escribe tu nueva clave secreta..."
                  required
                  minLength={6}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none"
                  style={{
                    backgroundColor: '#141510',
                    border: '1px solid rgba(220,38,38,0.2)',
                    color: '#E8E4DC',
                  }}
                />
              </div>

              <div
                className="flex justify-end pt-4"
                style={{ borderTop: '1px solid #2A2C24' }}
              >
                <button
                  type="submit"
                  className="btn-ripple rounded-xl px-8 py-3 text-[10px] font-bold tracking-widest uppercase shadow-md transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: 'rgba(220,38,38,0.8)',
                    color: '#fff',
                  }}
                >
                  <CheckCircle className="mr-2 inline" size={14} />
                  Actualizar Clave
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── COLUMNA DERECHA (5/12) — FORMULARIO DE ENLACES ── */}
        <div className="card-elevated group relative flex flex-col overflow-hidden rounded-3xl p-6 lg:col-span-5 lg:p-8">
          {/* Ícono decorativo de fondo */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 p-8 opacity-[0.03] transition-transform duration-700 group-hover:scale-110">
            <ShieldCheck size={200} />
          </div>

          <div
            className="relative z-10 mb-6 flex items-center gap-3 pb-5"
            style={{ borderBottom: '1px solid #2A2C24' }}
          >
            <div
              className="rounded-xl p-2.5"
              style={{
                backgroundColor: 'rgba(201,162,39,0.1)',
                color: '#C9A227',
              }}
            >
              <Link2 size={20} />
            </div>
            <div>
              <h3
                className="font-serif text-xl font-bold italic"
                style={{ color: '#E8E4DC' }}
              >
                Enlaces de la Academia
              </h3>
              <p className="mt-0.5 text-xs" style={{ color: '#5A5750' }}>
                Sincronizados con el dashboard de alumnos
              </p>
            </div>
          </div>

          <form
            action={actualizarEnlaces}
            className="relative z-10 flex flex-1 flex-col gap-6"
          >
            {/* Zoom */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(74,140,66,0.04)',
                border: '1px solid rgba(74,140,66,0.1)',
              }}
            >
              <label
                className="mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                style={{ color: '#5A5750' }}
              >
                <Video size={14} style={{ color: '#4A8C42' }} />
                Link Sala de Zoom
              </label>
              <input
                type="url"
                name="zoom_link"
                defaultValue={config?.zoom_link || ''}
                placeholder="https://zoom.us/j/tu-enlace"
                className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none"
                style={{
                  backgroundColor: '#141510',
                  border: '1px solid #2A2C24',
                  color: '#E8E4DC',
                }}
              />
            </div>

            {/* WhatsApp */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(74,140,66,0.04)',
                border: '1px solid rgba(74,140,66,0.1)',
              }}
            >
              <label
                className="mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                style={{ color: '#5A5750' }}
              >
                <Phone size={14} style={{ color: '#4A8C42' }} />
                WhatsApp de Soporte
              </label>
              <input
                type="url"
                name="whatsapp_link"
                defaultValue={config?.whatsapp_link || ''}
                placeholder="https://wa.me/tunúmero"
                className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none"
                style={{
                  backgroundColor: '#141510',
                  border: '1px solid #2A2C24',
                  color: '#E8E4DC',
                }}
              />
            </div>

            <div
              className="mt-auto flex flex-col gap-4 pt-5"
              style={{ borderTop: '1px solid #2A2C24' }}
            >
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: 'rgba(201,162,39,0.06)',
                  border: '1px solid rgba(201,162,39,0.12)',
                }}
              >
                <p
                  className="text-xs font-semibold"
                  style={{ color: '#C9A227' }}
                >
                  Estos enlaces se sincronizarán automáticamente con el
                  Dashboard de los alumnos.
                </p>
              </div>
              <button
                type="submit"
                className="btn-ripple w-full rounded-xl py-3 text-[10px] font-bold tracking-widest uppercase shadow-lg transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: '#C9A227',
                  color: '#1A1C18',
                  boxShadow: '0 4px 16px rgba(201,162,39,0.25)',
                }}
              >
                <CheckCircle className="mr-2 inline" size={14} />
                Guardar Enlaces Oficiales
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
