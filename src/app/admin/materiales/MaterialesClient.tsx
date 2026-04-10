'use client'

import React, { useState } from 'react'
import {
  UploadCloud,
  FileText,
  Trash2,
  Plus,
  Search,
  FolderOpen,
  Info,
  FilePlus,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react'
import { agregarMaterialAction, eliminarMaterialAction } from '../actions'
import { MaterialCard } from '@/components/admin/material-card'

export default function MaterialesClient({
  modulos,
  materiales,
}: {
  modulos: any[]
  materiales: any[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedModulos, setExpandedModulos] = useState<string[]>(
    modulos.map((m) => m.id),
  )
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const toggleModulo = (id: string) => {
    setExpandedModulos((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
  }

  const filteredMateriales = materiales.filter((m) =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      className="flex h-full flex-1 flex-col overflow-hidden"
      style={{ backgroundColor: '#1A1C18' }}
    >
      {/* ================= SECCIÓN SUPERIOR: CARGA DE MATERIAL ================= */}
      <div
        className="z-20 p-6 lg:px-10"
        style={{
          backgroundColor: '#272A23',
          borderBottom: '1px solid rgba(74,140,66,0.12)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="group rounded-3xl p-6 transition-all"
            style={{
              backgroundColor: '#1E2019',
              border: '1px solid rgba(74,140,66,0.1)',
            }}
          >
            <div className="mb-6 flex items-center gap-2">
              <div
                className="rounded-xl p-2 shadow-sm"
                style={{
                  backgroundColor: 'rgba(201,162,39,0.1)',
                  color: '#C9A227',
                }}
              >
                <FilePlus size={18} />
              </div>
              <h2 className="text-xs font-black tracking-[0.2em] text-[#E8E4DC] uppercase">
                Subir Nuevo Material PDF
              </h2>
            </div>

            <form
              action={agregarMaterialAction}
              className="grid grid-cols-1 items-end gap-6 md:grid-cols-4"
            >
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                  Unidad de Estudio
                </label>
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
                  <option value="">Selecciona una unidad...</option>
                  {modulos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                  Nombre del Documento
                </label>
                <input
                  name="nombre"
                  required
                  placeholder="Ej: Manual Nivel 1"
                  className="w-full rounded-xl p-3.5 text-xs font-medium outline-none"
                  style={{
                    backgroundColor: '#141510',
                    border: '1px solid #2A2C24',
                    color: '#E8E4DC',
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                  Archivo PDF
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="archivo"
                    required
                    accept=".pdf"
                    className="w-full cursor-pointer rounded-xl text-[10px] file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2.5 file:text-[10px] file:font-black"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#9A9589',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-ripple flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all active:scale-95"
                style={{
                  backgroundColor: '#4A8C42',
                  color: '#E8E4DC',
                  boxShadow: '0 4px 16px rgba(74,140,66,0.3)',
                }}
              >
                <UploadCloud size={16} /> Subir a la Biblioteca
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= SECCIÓN INFERIOR: BIBLIOTECA DIGITAL ================= */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* BARRA DE HERRAMIENTAS */}
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg"
                style={{ backgroundColor: '#272A23', color: '#C9A227' }}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#E8E4DC] italic">
                  Biblioteca Digital
                </h3>
                <p className="text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                  Manuales y guías de estudio PDF
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
                  placeholder="Buscar material..."
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

          {/* LISTADO POR MÓDULOS */}
          <div className="space-y-12 pb-20">
            {modulos.map((modulo) => {
              const moduloMateriales = filteredMateriales.filter(
                (m) => m.modulo_id === modulo.id,
              )
              const isExpanded = expandedModulos.includes(modulo.id)

              return (
                <section
                  key={modulo.id}
                  className="animate-fade-in-up space-y-6"
                >
                  {/* Cabecera Unidad */}
                  <div className="card-elevated group flex items-center justify-between rounded-3xl p-5 transition-all hover:border-[rgba(201,162,39,0.25)]">
                    <div
                      className="flex flex-1 cursor-pointer items-center gap-4"
                      onClick={() => toggleModulo(modulo.id)}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all"
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
                            {moduloMateriales.length}{' '}
                            {moduloMateriales.length === 1
                              ? 'Archivo'
                              : 'Archivos'}
                          </span>
                        </h4>
                        <p className="mt-0.5 text-[9px] font-bold tracking-tighter text-[#5A5750] uppercase">
                          Unidad de estudio #{modulo.orden || '0'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor de Materiales */}
                  {isExpanded && (
                    <div
                      className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                    >
                      {moduloMateriales.length > 0 ? (
                        moduloMateriales.map((mat) => (
                          <MaterialCard
                            key={mat.id}
                            material={mat}
                            onDelete={async (id) => {
                              const formData = new FormData()
                              formData.append('id', id)
                              await eliminarMaterialAction(formData)
                            }}
                          />
                        ))
                      ) : (
                        <div
                          className="col-span-full flex flex-col items-center justify-center rounded-3xl py-12 text-[#5A5750]"
                          style={{ border: '2px dashed #363830' }}
                        >
                          <FileText size={40} className="mb-3 opacity-20" />
                          <p className="text-xs font-bold tracking-widest uppercase">
                            No hay archivos en esta unidad
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )
            })}

            {modulos.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-[40px] py-20 text-[#5A5750]"
                style={{ border: '2px dashed #363830' }}
              >
                <FolderOpen size={60} className="mb-4 opacity-10" />
                <h3 className="mb-2 font-serif text-xl font-bold text-[#E8E4DC] italic">
                  Tu biblioteca está vacía
                </h3>
                <p className="text-xs font-bold tracking-widest uppercase">
                  Comienza creando una unidad en la sección de clases
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
