'use client'

import React, { useState } from 'react'
import {
  Trash2,
  Edit2,
  ExternalLink,
  Save,
  X,
  UploadCloud,
  FolderPlus,
  FolderOpen,
  PlayCircle,
  Info,
  Plus,
  PlusCircle,
  LayoutGrid,
  List,
  Search,
  ChevronRight,
  ChevronDown,
  Video,
} from 'lucide-react'
import {
  agregarClaseAction,
  eliminarClaseAction,
  crearModuloAction,
  eliminarModuloAction,
} from '../actions'
import { ClaseCard } from '@/components/admin/clase-card'

export default function ClasesClient({
  modulos,
  clases,
}: {
  modulos: any[]
  clases: any[]
}) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedModulos, setExpandedModulos] = useState<string[]>(
    modulos.map((m) => m.id),
  )
  const [searchTerm, setSearchTerm] = useState('')

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
      className="flex h-full flex-1 flex-col overflow-hidden"
      style={{ backgroundColor: '#1A1C18' }}
    >
      {/* ================= SECCIÓN SUPERIOR: ACCIONES RÁPIDAS ================= */}
      <div
        className="z-20 p-6 lg:px-10"
        style={{
          backgroundColor: '#272A23',
          borderBottom: '1px solid rgba(74,140,66,0.12)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* BLOQUE 1: NUEVA UNIDAD (4/12) */}
            <div
              className="group flex flex-col justify-between rounded-3xl p-6 transition-all hover:border-[rgba(201,162,39,0.25)] xl:col-span-4"
              style={{
                backgroundColor: '#1E2019',
                border: '1px solid rgba(74,140,66,0.1)',
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-amber-500 p-2 text-[#E8E4DC] shadow-sm">
                    <FolderPlus size={18} />
                  </div>
                  <h2 className="text-xs font-black tracking-[0.2em] text-[#E8E4DC] uppercase">
                    Nueva Unidad
                  </h2>
                </div>
              </div>
              <form
                action={crearModuloAction}
                className="grid grid-cols-2 gap-3"
              >
                <input
                  name="nombre"
                  placeholder="Nombre de la unidad..."
                  required
                  className="col-span-2 rounded-xl p-3.5 text-xs font-medium outline-none"
                  style={{
                    backgroundColor: '#141510',
                    border: '1px solid #2A2C24',
                    color: '#E8E4DC',
                  }}
                />
                <input
                  name="orden"
                  type="number"
                  placeholder="Orden"
                  className="rounded-xl p-3.5 text-xs font-medium outline-none"
                  style={{
                    backgroundColor: '#141510',
                    border: '1px solid #2A2C24',
                    color: '#E8E4DC',
                  }}
                />
                <button
                  className="flex items-center justify-center gap-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-lg transition-all active:scale-95"
                  style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}
                >
                  <Plus size={14} /> Crear Unidad
                </button>
              </form>
            </div>

            {/* BLOQUE 2: PUBLICAR CLASE (8/12) */}
            <div
              className="rounded-3xl p-6 transition-all xl:col-span-8"
              style={{
                backgroundColor: '#1E2019',
                border: '1px solid rgba(74,140,66,0.1)',
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <div
                  className="rounded-xl p-2 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(201,162,39,0.1)',
                    color: '#C9A227',
                  }}
                >
                  <UploadCloud size={18} />
                </div>
                <h2 className="text-xs font-black tracking-[0.2em] text-[#E8E4DC] uppercase">
                  Publicar Nueva Clase
                </h2>
              </div>

              <form
                action={agregarClaseAction}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                <div className="space-y-3">
                  <select
                    name="modulo_id"
                    required
                    className="w-full cursor-pointer appearance-none rounded-xl p-3.5 text-xs font-bold outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  >
                    <option value="">¿A qué unidad?</option>
                    {modulos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                  <input
                    name="url_youtube"
                    required
                    placeholder="Link de YouTube..."
                    className="w-full rounded-xl p-3.5 text-xs font-medium outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <input
                    name="titulo"
                    required
                    placeholder="Título de la clase..."
                    className="w-full rounded-xl p-3.5 text-xs font-medium outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                  <textarea
                    name="description"
                    placeholder="Resumen corto..."
                    className="h-[46px] w-full resize-none rounded-xl p-3.5 text-xs font-medium outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <div
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                    style={{
                      backgroundColor: 'rgba(201,162,39,0.06)',
                      border: '1px solid rgba(201,162,39,0.12)',
                    }}
                  >
                    <Info size={16} className="shrink-0 text-amber-500" />
                    <p
                      className="text-[10px] leading-tight font-bold uppercase"
                      style={{ color: '#C9A227' }}
                    >
                      Visible al instante para alumnos.
                    </p>
                  </div>
                  <button
                    className="btn-ripple w-full rounded-xl py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all active:scale-95"
                    style={{
                      backgroundColor: '#4A8C42',
                      color: '#E8E4DC',
                      boxShadow: '0 4px 16px rgba(74,140,66,0.3)',
                    }}
                  >
                    Publicar Ahora
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECCIÓN INFERIOR: PLAN DE ESTUDIOS ================= */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* BARRA DE HERRAMIENTAS DEL LISTADO */}
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg"
                style={{ backgroundColor: '#272A23', color: '#C9A227' }}
              >
                <Video size={20} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#E8E4DC] italic">
                  Plan de Estudios
                </h3>
                <p className="text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                  Gestiona el contenido de tu academia
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl p-1.5"
              style={{
                backgroundColor: '#272A23',
                border: '1px solid rgba(74,140,66,0.12)',
              }}
            >
              <div className="relative">
                <Search
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-[#5A5750]"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Buscar clase..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 rounded-xl py-2 pr-4 pl-9 text-xs transition-all outline-none md:w-64"
                  style={{
                    backgroundColor: '#141510',
                    border: '1px solid #2A2C24',
                    color: '#E8E4DC',
                  }}
                />
              </div>
              <div
                className="mx-1 h-6 w-px"
                style={{ backgroundColor: '#363830' }}
              ></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-xl p-2 transition-all ${viewMode === 'grid' ? 'shadow-md' : ''}`}
                  style={{
                    color: viewMode === 'grid' ? '#E8E4DC' : '#5A5750',
                    backgroundColor:
                      viewMode === 'grid' ? '#4A8C42' : 'transparent',
                  }}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-xl p-2 transition-all ${viewMode === 'list' ? 'shadow-md' : ''}`}
                  style={{
                    color: viewMode === 'list' ? '#E8E4DC' : '#5A5750',
                    backgroundColor:
                      viewMode === 'list' ? '#4A8C42' : 'transparent',
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* LISTADO DE MÓDULOS Y CLASES */}
          <div className="space-y-12 pb-20">
            {modulos.map((modulo) => {
              const moduloClases = filteredClases.filter(
                (c) => c.modulo_id === modulo.id,
              )
              const isExpanded = expandedModulos.includes(modulo.id)

              return (
                <div key={modulo.id} className="animate-fade-in-up space-y-6">
                  {/* Cabecera Unidad */}
                  <div className="card-elevated group flex items-center justify-between rounded-3xl p-5 transition-all hover:border-[rgba(201,162,39,0.25)]">
                    <div
                      className="flex flex-1 cursor-pointer items-center gap-4"
                      onClick={() => toggleModulo(modulo.id)}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg transition-all"
                        style={{
                          backgroundColor: isExpanded
                            ? '#4A8C42'
                            : 'rgba(74,140,66,0.06)',
                          color: isExpanded ? '#E8E4DC' : '#5A5750',
                        }}
                      >
                        {isExpanded ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#E8E4DC] uppercase">
                          {modulo.nombre}
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-black"
                            style={{
                              backgroundColor: 'rgba(74,140,66,0.08)',
                              color: '#9A9589',
                            }}
                          >
                            {moduloClases.length}{' '}
                            {moduloClases.length === 1 ? 'Clase' : 'Clases'}
                          </span>
                        </h4>
                        <p className="mt-0.5 text-[9px] font-bold tracking-tighter text-[#5A5750] uppercase">
                          Unidad de estudio #{modulo.orden || '0'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
                      <form
                        action={eliminarModuloAction}
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              '¿Eliminar unidad completa? Se borrarán todas sus clases.',
                            )
                          )
                            e.preventDefault()
                        }}
                      >
                        <input type="hidden" name="id" value={modulo.id} />
                        <button
                          className="rounded-xl p-2.5 text-[#5A5750] transition-all hover:bg-red-50 hover:text-red-600"
                          title="Eliminar unidad"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Contenedor de Clases */}
                  {isExpanded && (
                    <div
                      className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
                    >
                      {moduloClases.length > 0 ? (
                        moduloClases.map((clase) => (
                          <ClaseCard
                            key={clase.id}
                            clase={clase}
                            onDelete={async (id) => {
                              const formData = new FormData()
                              formData.append('id', id)
                              await eliminarClaseAction(formData)
                            }}
                          />
                        ))
                      ) : (
                        <div
                          className="col-span-full flex flex-col items-center justify-center rounded-3xl py-12 text-[#5A5750]"
                          style={{ border: '2px dashed #363830' }}
                        >
                          <PlayCircle size={40} className="mb-3 opacity-20" />
                          <p className="text-xs font-bold tracking-widest uppercase">
                            No hay clases en esta unidad
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {modulos.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-[40px] py-20 text-[#5A5750]"
                style={{ border: '2px dashed #363830' }}
              >
                <FolderOpen size={60} className="mb-4 opacity-10" />
                <h3 className="mb-2 font-serif text-xl font-bold text-[#E8E4DC] italic">
                  Tu academia está vacía
                </h3>
                <p className="text-xs font-bold tracking-widest uppercase">
                  Comienza creando tu primera unidad de estudio arriba
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
