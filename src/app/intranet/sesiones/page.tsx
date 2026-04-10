import React from 'react'
import Link from 'next/link'
import { createClient } from '@/supabase/server'
import {
  Video,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Play,
  MessageCircle,
} from 'lucide-react'

export default async function SesionesAlumnoPage() {
  const supabase = await createClient()

  const { data: config } = await supabase
    .from('configuracion')
    .select('zoom_link, whatsapp_link')
    .eq('id', 1)
    .single()

  const zoomLink = config?.zoom_link || '#'
  const whatsappLink = config?.whatsapp_link || '#'

  return (
    <div
      className="custom-scrollbar min-h-screen overflow-y-auto font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* Header */}
      <header className="mx-auto mb-8 max-w-5xl px-6 pt-8">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={14} style={{ color: '#C9A227' }} />
          <p
            className="text-[9px] font-black tracking-[0.3em] uppercase"
            style={{ color: '#4A8C42' }}
          >
            Encuentros en Vivo
          </p>
        </div>
        <h2
          className="font-serif text-3xl leading-none font-bold tracking-tight italic lg:text-4xl"
          style={{ color: '#E8E4DC' }}
        >
          Mis Sesiones
        </h2>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 pb-12">
        {/* Tarjeta principal de la sesión */}
        <div className="card-elevated flex flex-col overflow-hidden rounded-2xl md:flex-row">
          {/* Lado izquierdo: Información */}
          <div className="relative flex w-full flex-col justify-between p-6 md:w-3/5 lg:p-8">
            <div
              className="pointer-events-none absolute top-0 left-0 p-6 opacity-[0.03]"
              style={{ color: '#4A8C42' }}
            >
              <Sparkles size={100} />
            </div>

            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-2">
                <span className="badge-reiki badge-reiki-gold">Oficial</span>
                <span
                  className="text-[9px] font-black tracking-widest uppercase"
                  style={{ color: '#9A9589' }}
                >
                  Formación Reiki Usui
                </span>
              </div>

              <h3
                className="mb-3 font-serif text-2xl leading-tight font-bold tracking-tight italic lg:text-3xl"
                style={{ color: '#E8E4DC' }}
              >
                Clase Grupal de Jueves
              </h3>

              <p
                className="mb-6 max-w-md text-xs leading-relaxed italic"
                style={{ color: '#9A9589' }}
              >
                &ldquo;Un espacio sagrado para profundizar en la técnica,
                realizar meditaciones guiadas y resolver dudas en tiempo real
                con Daniel.&rdquo;
              </p>

              <div
                className="mb-6 grid grid-cols-2 gap-6 pt-5"
                style={{ borderTop: '1px solid rgba(74,140,66,0.12)' }}
              >
                <div className="space-y-1.5">
                  <p
                    className="text-[9px] font-black tracking-widest uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    Día de encuentro
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-1.5"
                      style={{
                        backgroundColor: 'rgba(201,162,39,0.1)',
                        color: '#C9A227',
                      }}
                    >
                      <Calendar size={14} />
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: '#E8E4DC' }}
                    >
                      Cada Jueves
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p
                    className="text-[9px] font-black tracking-widest uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    Horario (Chile)
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-1.5"
                      style={{
                        backgroundColor: 'rgba(201,162,39,0.1)',
                        color: '#C9A227',
                      }}
                    >
                      <Clock size={14} />
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: '#E8E4DC' }}
                    >
                      19:30 HRS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Zoom */}
            <Link
              href={zoomLink}
              target="_blank"
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 text-[10px] font-black tracking-[0.3em] uppercase transition-all active:scale-[0.98]"
              style={{
                backgroundColor: '#272A23',
                border: '1px solid rgba(201,162,39,0.2)',
                color: '#C9A227',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(to right, rgba(201,162,39,0.08), transparent)',
                }}
              />
              <Play size={18} style={{ fill: '#C9A227', color: '#C9A227' }} />
              <span className="relative z-10">Ingresar a Sala Zoom</span>
              <ExternalLink
                size={14}
                className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Lado derecho: Imagen */}
          <div
            className="relative min-h-[200px] w-full overflow-hidden md:min-h-0 md:w-2/5"
            style={{ backgroundColor: '#141510' }}
          >
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              alt="Meditación Reiki"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to left, transparent, rgba(26,28,24,0.5))',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm"
                style={{ border: '1px solid rgba(74,140,66,0.2)' }}
              >
                <Video size={28} style={{ color: 'rgba(74,140,66,0.4)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Protocolo y Soporte */}
        <div className="card-elevated flex flex-col items-center justify-between gap-4 rounded-2xl p-5 md:flex-row">
          <div className="flex flex-wrap items-center gap-6">
            <div
              className="flex items-center gap-2"
              style={{ color: '#9A9589' }}
            >
              <ShieldCheck size={14} style={{ color: '#4A8C42' }} />
              <span className="text-[9px] font-black tracking-widest uppercase">
                Protocolo
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Lugar tranquilo', 'Manual a mano', 'Cámara activa'].map(
                (text) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <div
                      className="h-1 w-1 rounded-full"
                      style={{
                        backgroundColor: '#4A8C42',
                        boxShadow: '0 0 6px rgba(74,140,66,0.5)',
                      }}
                    />
                    <p
                      className="text-[9px] font-bold tracking-tighter uppercase italic"
                      style={{ color: '#9A9589' }}
                    >
                      {text}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {whatsappLink && whatsappLink !== '#' && (
            <Link
              href={whatsappLink}
              target="_blank"
              className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-[9px] font-black tracking-widest uppercase transition-colors active:scale-95"
              style={{
                backgroundColor: 'rgba(37,211,102,0.08)',
                color: '#25D366',
                border: '1px solid rgba(37,211,102,0.15)',
              }}
            >
              <MessageCircle size={14} /> Contactar Soporte
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
