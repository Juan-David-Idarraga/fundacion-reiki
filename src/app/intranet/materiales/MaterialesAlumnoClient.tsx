'use client'

import React, { useState } from 'react'
import {
  FileText,
  ShieldCheck,
  Search,
  BookOpen,
  ChevronDown,
  Sparkles,
  Lock,
} from 'lucide-react'
import { createClient } from '@/supabase/client'
import { MaterialAlumnoCard } from '@/components/intranet/material-alumno-card'

interface MaterialesAlumnoClientProps {
  modulos: any[]
  materiales: any[]
}

export default function MaterialesAlumnoClient({
  modulos,
  materiales,
}: MaterialesAlumnoClientProps) {
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedModulos, setExpandedModulos] = useState<string[]>(
    modulos.map((m) => m.id),
  )

  const toggleModulo = (id: string) => {
    setExpandedModulos((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
  }

  const handleVerArchivo = async (ruta: string) => {
    const { data, error } = await supabase.storage
      .from('materiales')
      .createSignedUrl(ruta, 600)

    if (error) {
      console.error('Error de acceso:', error)
      alert('No se pudo generar el acceso seguro. Intenta recargar la página.')
      return
    }

    window.open(data.signedUrl, '_blank')
  }

  const filteredMateriales = materiales.filter((m) =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      className="min-h-screen pb-20 font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* HEADER DE LA SECCIÓN */}
      <header className="mx-auto mb-10 max-w-7xl px-6 pt-8">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} style={{ color: '#C9A227' }} />
              <p
                className="text-[9px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#8B6B91' }}
              >
                Recursos de Formación
              </p>
            </div>
            <h2
              className="mb-3 font-serif text-3xl leading-none font-bold tracking-tight italic lg:text-4xl"
              style={{ color: '#E8E4DC' }}
            >
              Biblioteca de Estudio
            </h2>
            <p
              className="text-xs leading-relaxed font-medium"
              style={{ color: '#9A9589' }}
            >
              Accede a tus manuales oficiales, guías de meditación y material de
              apoyo. Todo el conocimiento necesario para tu camino de sanación.
            </p>
          </div>

          <div
            className="flex w-full items-center gap-3 rounded-2xl p-1.5 md:w-auto"
            style={{
              backgroundColor: '#272A23',
              border: '1px solid rgba(139,107,145,0.12)',
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
                placeholder="Buscar manual..."
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
        {/* Aviso de seguridad */}
        <div
          className="group relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-5 md:flex-row"
          style={{
            backgroundColor: '#242720',
            border: '1px solid rgba(74,140,66,0.12)',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(to right, rgba(74,140,66,0.04), transparent)',
            }}
          />
          <div
            className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: '#4A8C42',
              color: '#E8E4DC',
              boxShadow: '0 4px 16px rgba(74,140,66,0.25)',
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h4
              className="mb-0.5 font-serif text-lg font-bold italic"
              style={{ color: '#E8E4DC' }}
            >
              Contenido Protegido
            </h4>
            <p
              className="max-w-2xl text-[11px] leading-relaxed font-medium"
              style={{ color: '#9A9589' }}
            >
              Para garantizar la integridad de tu formación, los enlaces de
              acceso son temporales y personales. Al hacer clic en un material,
              se generará un acceso seguro válido por 10 minutos.
            </p>
          </div>
          <div className="relative z-10 md:ml-auto">
            <div className="badge-reiki badge-reiki-green flex items-center gap-1.5">
              <Lock size={10} /> Acceso Seguro Activo
            </div>
          </div>
        </div>

        {/* Listado por Módulos */}
        <div className="space-y-12">
          {modulos.map((modulo) => {
            const moduloMateriales = filteredMateriales.filter(
              (m) => m.modulo_id === modulo.id,
            )
            const isExpanded = expandedModulos.includes(modulo.id)

            if (moduloMateriales.length === 0 && !searchTerm) return null

            return (
              <section
                key={modulo.id}
                className="animate-in fade-in slide-in-from-bottom-6 duration-700"
              >
                {/* Cabecera Unidad */}
                <div
                  onClick={() => toggleModulo(modulo.id)}
                  className="card-elevated mb-6 flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all hover:border-[rgba(139,107,145,0.3)]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                      style={
                        isExpanded
                          ? {
                              backgroundColor: '#8B6B91',
                              color: '#E8E4DC',
                              boxShadow: '0 4px 12px rgba(139,107,145,0.3)',
                            }
                          : {
                              backgroundColor: 'rgba(139,107,145,0.08)',
                              color: '#5A5750',
                            }
                      }
                    >
                      <BookOpen size={20} />
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
                            backgroundColor: 'rgba(139,107,145,0.08)',
                            color: '#9A9589',
                          }}
                        >
                          {moduloMateriales.length}{' '}
                          {moduloMateriales.length === 1
                            ? 'Archivo'
                            : 'Archivos'}
                        </span>
                      </h2>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <div
                          className="h-0.5 rounded-full transition-all duration-300"
                          style={{
                            width: isExpanded ? '24px' : '12px',
                            backgroundColor: isExpanded ? '#8B6B91' : '#363830',
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
                            backgroundColor: 'rgba(139,107,145,0.1)',
                            color: '#8B6B91',
                            transform: 'rotate(180deg)',
                          }
                        : {
                            backgroundColor: 'rgba(139,107,145,0.04)',
                            color: '#5A5750',
                          }
                    }
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Contenedor de Materiales */}
                {isExpanded && (
                  <div className="animate-in fade-in slide-in-from-top-4 grid grid-cols-1 gap-6 duration-500 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {moduloMateriales.length > 0 ? (
                      moduloMateriales.map((mat) => (
                        <MaterialAlumnoCard
                          key={mat.id}
                          material={mat}
                          onView={handleVerArchivo}
                        />
                      ))
                    ) : (
                      <div
                        className="col-span-full rounded-[40px] px-8 py-16 text-center"
                        style={{ border: '2px dashed #363830' }}
                      >
                        <div
                          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full p-4 opacity-30"
                          style={{ backgroundColor: 'rgba(139,107,145,0.08)' }}
                        >
                          <FileText size={32} style={{ color: '#8B6B91' }} />
                        </div>
                        <p
                          className="text-sm font-medium italic"
                          style={{ color: '#9A9589' }}
                        >
                          No hay manuales disponibles en esta unidad.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </main>

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
