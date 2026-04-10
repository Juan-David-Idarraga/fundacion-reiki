'use client'

import React, { useState } from 'react'
import {
  Clock,
  ChevronLeft,
  FolderOpen,
  Lock,
  Calendar,
  MessageCircle,
  X,
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  MonitorPlay,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { ClaseAlumnoCard } from '@/components/intranet/clase-alumno-card'

interface ClasesAlumnoClientProps {
  modulos: any[]
  clases: any[]
  fechaVencimiento: Date | null
}

export default function ClasesAlumnoClient({
  modulos,
  clases,
  fechaVencimiento,
}: ClasesAlumnoClientProps) {
  const [selectedClase, setSelectedClase] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedModulos, setExpandedModulos] = useState<string[]>(
    modulos.map((m) => m.id),
  )

  const toggleModulo = (id: string) => {
    setExpandedModulos((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
  }

  const filteredClases = clases.filter(
    (c) =>
      c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.descripcion &&
        c.descripcion.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div
      className="min-h-screen pb-20 font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* BARRA DE NAVEGACIÓN */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between p-6 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(26,28,24,0.92)',
          borderBottom: '1px solid rgba(74,140,66,0.12)',
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/intranet"
            className="rounded-full p-2 transition-colors"
            style={{ color: '#9A9589' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(74,140,66,0.08)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <ChevronLeft size={20} />
          </Link>
          <div
            className="hidden h-6 w-px sm:block"
            style={{ backgroundColor: '#363830' }}
          />
          <div className="flex items-center gap-2">
            <MonitorPlay size={20} style={{ color: '#C9A227' }} />
            <h1
              className="font-serif text-xl font-bold tracking-tighter uppercase"
              style={{ color: '#E8E4DC' }}
            >
              Formación Reiki Usui
            </h1>
          </div>
        </div>

        {fechaVencimiento && (
          <div
            className="hidden items-center gap-3 rounded-full px-4 py-2 md:flex"
            style={{
              backgroundColor: 'rgba(201,162,39,0.08)',
              border: '1px solid rgba(201,162,39,0.15)',
            }}
          >
            <Calendar size={14} style={{ color: '#C9A227' }} />
            <span
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: '#C9A227' }}
            >
              Vence:{' '}
              {fechaVencimiento.toLocaleDateString('es-CL', {
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        )}
      </nav>

      {/* HEADER DE LA SECCIÓN */}
      <header className="mx-auto mt-8 mb-10 max-w-7xl px-6">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} style={{ color: '#C9A227' }} />
              <p
                className="text-[9px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#4A8C42' }}
              >
                Tu Camino de Aprendizaje
              </p>
            </div>
            <h2
              className="mb-3 font-serif text-3xl leading-none font-bold tracking-tight italic lg:text-4xl"
              style={{ color: '#E8E4DC' }}
            >
              Clases Grabadas
            </h2>
            <p
              className="text-xs leading-relaxed font-medium"
              style={{ color: '#9A9589' }}
            >
              Explora las lecciones de cada unidad a tu propio ritmo. Cada video
              está diseñado para profundizar en tu conexión con la energía
              universal.
            </p>
          </div>

          <div
            className="flex w-full items-center gap-3 rounded-2xl p-1.5 md:w-auto"
            style={{
              backgroundColor: '#272A23',
              border: '1px solid rgba(74,140,66,0.12)',
            }}
          >
            <div className="relative flex-1 md:flex-none">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2"
                size={14}
                style={{ color: '#5A5750' }}
              />
              <input
                type="text"
                placeholder="Buscar lección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl py-2 pr-4 pl-9 text-xs transition-all outline-none md:w-64"
                style={{
                  backgroundColor: '#141510',
                  border: '1px solid #2A2C24',
                  color: '#E8E4DC',
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="mx-auto max-w-7xl space-y-12 px-6">
        {modulos?.map((modulo) => {
          const moduloClases = filteredClases.filter(
            (c) => c.modulo_id === modulo.id,
          )
          const isExpanded = expandedModulos.includes(modulo.id)

          return (
            <section
              key={modulo.id}
              className="animate-in fade-in slide-in-from-bottom-6 duration-700"
            >
              {/* Header de la Unidad */}
              <div
                onClick={() => toggleModulo(modulo.id)}
                className="card-elevated mb-6 flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all hover:border-[rgba(74,140,66,0.3)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                    style={
                      isExpanded
                        ? {
                            backgroundColor: '#4A8C42',
                            color: '#E8E4DC',
                            boxShadow: '0 4px 12px rgba(74,140,66,0.3)',
                          }
                        : {
                            backgroundColor: 'rgba(74,140,66,0.08)',
                            color: '#5A5750',
                          }
                    }
                  >
                    <FolderOpen size={20} />
                  </div>
                  <div>
                    <h2
                      className="flex items-center gap-2 font-serif text-lg font-bold tracking-tight italic"
                      style={{ color: '#E8E4DC' }}
                    >
                      {modulo.nombre}
                      <span
                        className="rounded-full px-2 py-0.5 text-[8px] font-black tracking-widest uppercase"
                        style={{
                          backgroundColor: 'rgba(74,140,66,0.08)',
                          color: '#9A9589',
                        }}
                      >
                        {moduloClases.length}{' '}
                        {moduloClases.length === 1 ? 'Lección' : 'Lecciones'}
                      </span>
                    </h2>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <div
                        className="h-0.5 rounded-full transition-all duration-300"
                        style={{
                          width: isExpanded ? '24px' : '12px',
                          backgroundColor: isExpanded ? '#4A8C42' : '#363830',
                        }}
                      />
                      <p
                        className="text-[9px] font-black tracking-[0.2em] uppercase italic"
                        style={{ color: '#9A9589' }}
                      >
                        Unidad #{modulo.orden || '0'}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                  style={
                    isExpanded
                      ? {
                          backgroundColor: 'rgba(74,140,66,0.1)',
                          color: '#4A8C42',
                          transform: 'rotate(180deg)',
                        }
                      : {
                          backgroundColor: 'rgba(74,140,66,0.04)',
                          color: '#5A5750',
                        }
                  }
                >
                  <ChevronDown size={16} />
                </div>
              </div>

              {/* Listado de clases */}
              {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-4 grid grid-cols-1 gap-6 duration-500 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {moduloClases.length > 0 ? (
                    moduloClases.map((clase) => (
                      <ClaseAlumnoCard
                        key={clase.id}
                        clase={clase}
                        onPlay={(c) => setSelectedClase(c)}
                      />
                    ))
                  ) : (
                    <div
                      className="col-span-full rounded-[40px] px-8 py-16 text-center"
                      style={{ border: '2px dashed #363830' }}
                    >
                      <div
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full p-4 opacity-30"
                        style={{ backgroundColor: 'rgba(74,140,66,0.08)' }}
                      >
                        <MonitorPlay size={32} style={{ color: '#4A8C42' }} />
                      </div>
                      <p
                        className="text-sm font-medium italic"
                        style={{ color: '#9A9589' }}
                      >
                        Aún no hay videos publicados en esta unidad.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          )
        })}
      </main>

      {/* MODAL DEL REPRODUCTOR */}
      {selectedClase && (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center p-4 duration-300 md:p-10">
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(20,21,16,0.95)' }}
            onClick={() => setSelectedClase(null)}
          />

          <div
            className="animate-in zoom-in-95 relative flex h-full max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-[40px] shadow-2xl duration-500 lg:flex-row"
            style={{
              backgroundColor: '#272A23',
              border: '1px solid rgba(74,140,66,0.15)',
            }}
          >
            {/* Lado Izquierdo: Video */}
            <div
              className="relative flex flex-[2] flex-col overflow-hidden"
              style={{ backgroundColor: '#000' }}
            >
              <div className="relative h-full min-h-0 w-full">
                <iframe
                  className="h-full w-full"
                  src={`${selectedClase.url_youtube}?autoplay=1`}
                  title={selectedClase.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Info móvil */}
              <div
                className="overflow-y-auto p-6 lg:hidden"
                style={{ backgroundColor: '#272A23' }}
              >
                <h3
                  className="mb-4 text-2xl font-bold"
                  style={{ color: '#E8E4DC' }}
                >
                  {selectedClase.titulo}
                </h3>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: '#9A9589' }}
                >
                  {selectedClase.descripcion ||
                    'No hay descripción disponible para esta clase.'}
                </p>
              </div>
            </div>

            {/* Lado Derecho: Detalles */}
            <div
              className="hidden flex-1 flex-col overflow-hidden lg:flex"
              style={{
                borderLeft: '1px solid rgba(74,140,66,0.1)',
                backgroundColor: '#242720',
              }}
            >
              <div
                className="p-8"
                style={{ borderBottom: '1px solid rgba(74,140,66,0.1)' }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                    style={{ color: '#C9A227' }}
                  >
                    <Sparkles size={14} /> Lección en Curso
                  </div>
                  <button
                    onClick={() => setSelectedClase(null)}
                    className="rounded-full p-2 transition-colors"
                    style={{ color: '#9A9589' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        'rgba(74,140,66,0.08)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <X size={20} />
                  </button>
                </div>
                <h3
                  className="mb-4 text-2xl leading-tight font-bold"
                  style={{ color: '#E8E4DC' }}
                >
                  {selectedClase.titulo}
                </h3>
                <div
                  className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase"
                  style={{ color: '#9A9589' }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} style={{ color: '#C9A227' }} />{' '}
                    {selectedClase.duracion || 'Clase Completa'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} style={{ color: '#5A5750' }} />{' '}
                    {selectedClase.fecha || 'Reciente'}
                  </div>
                </div>
              </div>

              <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
                <div>
                  <h4
                    className="mb-4 text-[10px] font-black tracking-[0.2em] uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    Descripción de la Clase
                  </h4>
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: '#9A9589' }}
                  >
                    {selectedClase.descripcion?.trim() ||
                      'No hay descripción disponible para esta clase.'}
                  </p>
                </div>

                <div
                  className="rounded-3xl p-6"
                  style={{
                    backgroundColor: '#1E2019',
                    border: '1px solid rgba(74,140,66,0.1)',
                  }}
                >
                  <h4
                    className="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase"
                    style={{ color: '#E8E4DC' }}
                  >
                    <BookOpen size={14} style={{ color: '#C9A227' }} /> Material
                    de Apoyo
                  </h4>
                  <p
                    className="mb-4 text-[10px] font-bold uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    Revisa la biblioteca PDF para descargar el manual de esta
                    unidad.
                  </p>
                  <Link
                    href="/intranet/materiales"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-black tracking-widest uppercase transition-all"
                    style={{
                      backgroundColor: '#272A23',
                      border: '1px solid rgba(74,140,66,0.15)',
                      color: '#9A9589',
                    }}
                  >
                    Ir a la Biblioteca <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              <div
                className="p-8"
                style={{
                  borderTop: '1px solid rgba(74,140,66,0.1)',
                  backgroundColor: '#1E2019',
                }}
              >
                <a
                  href="https://wa.me/56951735495"
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all"
                  style={{
                    backgroundColor: 'rgba(37,211,102,0.08)',
                    color: '#25D366',
                    border: '1px solid rgba(37,211,102,0.15)',
                  }}
                >
                  <MessageCircle size={18} /> ¿Dudas con esta clase?
                </a>
              </div>
            </div>

            {/* Botón cerrar móvil */}
            <button
              onClick={() => setSelectedClase(null)}
              className="absolute top-4 right-4 z-[110] rounded-full p-2 backdrop-blur-md lg:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#E8E4DC' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="mx-auto mt-20 max-w-4xl px-6 text-center">
        <div
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase opacity-30"
          style={{ color: '#9A9589' }}
        >
          <Lock size={12} /> Contenido Protegido • Centro de Reiki 2026
        </div>
      </div>
    </div>
  )
}
