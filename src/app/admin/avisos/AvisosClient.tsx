'use client'

import React, { useState } from 'react'
import {
  Bell,
  Calendar,
  PlusCircle,
  Search,
  Info,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'
import { AvisoCard } from '@/components/admin/aviso-card'
import { isDateExpired } from '@/utils/date-format'

interface AvisosClientProps {
  avisos: any[]
  crearAvisoAction: (formData: FormData) => Promise<void>
  borrarAvisoAction: (formData: FormData) => Promise<void>
}

export default function AvisosClient({
  avisos,
  crearAvisoAction,
  borrarAvisoAction,
}: AvisosClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'todos' | 'activos' | 'expirados'>(
    'todos',
  )

  const filteredAvisos = avisos.filter((aviso) => {
    const matchesSearch =
      aviso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
    const isExpirado = isDateExpired(aviso.fecha_expiracion)
    if (filter === 'activos') return matchesSearch && !isExpirado
    if (filter === 'expirados') return matchesSearch && isExpirado
    return matchesSearch
  })

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-6 pb-16 font-sans text-[#E8E4DC]">
      {/* Header compacto */}
      <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[rgba(74,140,66,0.12)] pb-5 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Bell size={18} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#E8E4DC] italic">
              Tablón de Comunicados
            </h2>
            <p className="text-[9px] font-black tracking-[0.2em] text-[#5A5750] uppercase">
              Crea y administra los avisos para tus alumnos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[rgba(74,140,66,0.12)] bg-white p-1 shadow-sm">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-[#5A5750]"
              size={12}
            />
            <input
              type="text"
              placeholder="Buscar aviso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-44 rounded-lg border border-[rgba(74,140,66,0.08)] bg-stone-50 py-1.5 pr-3 pl-8 text-xs transition-all outline-none focus:border-amber-500 md:w-56"
            />
          </div>
          <div className="h-5 w-px bg-stone-200"></div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="cursor-pointer rounded-lg border border-[rgba(74,140,66,0.08)] bg-stone-50 px-2 py-1.5 text-[9px] font-black tracking-widest uppercase outline-none focus:border-amber-500"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="expirados">Expirados</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA: FORMULARIO (4 de 12) */}
        <div className="sticky top-6 rounded-2xl border border-[rgba(74,140,66,0.12)] bg-white p-5 shadow-md lg:col-span-4">
          <div className="mb-5 flex items-center gap-2.5 border-b border-[rgba(74,140,66,0.08)] pb-3">
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
              <PlusCircle size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#E8E4DC] italic">
                Publicar Nuevo Aviso
              </h3>
              <p className="text-[9px] font-bold tracking-widest text-[#5A5750] uppercase">
                Llega a todos tus alumnos
              </p>
            </div>
          </div>

          <form action={crearAvisoAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="ml-1 block text-[9px] font-black tracking-widest text-[#9A9589] uppercase">
                Título del Aviso
              </label>
              <input
                type="text"
                name="titulo"
                required
                placeholder="Ej: Suspensión de clase..."
                className="w-full rounded-xl border border-[rgba(74,140,66,0.12)] bg-stone-50 px-4 py-3 text-xs font-medium transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 block text-[9px] font-black tracking-widest text-[#9A9589] uppercase">
                Mensaje del Comunicado
              </label>
              <textarea
                name="mensaje"
                required
                rows={4}
                placeholder="Escribe el detalle del comunicado aquí..."
                className="custom-scrollbar w-full resize-none rounded-xl border border-[rgba(74,140,66,0.12)] bg-stone-50 px-4 py-3 text-xs font-medium transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 block text-[9px] font-black tracking-widest text-[#9A9589] uppercase">
                Visible Hasta (Vencimiento)
              </label>
              <div className="group relative">
                <input
                  type="date"
                  name="fecha_expiracion"
                  required
                  className="w-full cursor-pointer appearance-none rounded-xl border border-[rgba(74,140,66,0.12)] bg-stone-50 px-4 py-3 text-xs font-medium transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                />
                <Calendar
                  size={14}
                  className="pointer-events-none absolute top-3.5 right-4 text-[#5A5750] transition-colors group-hover:text-amber-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3">
              <Info size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-[9px] leading-relaxed font-bold text-amber-800 uppercase">
                El aviso aparecerá en el Dashboard de los alumnos hasta la fecha
                seleccionada.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-[10px] font-black tracking-[0.2em] text-amber-500 uppercase shadow-lg shadow-stone-900/10 transition-all hover:bg-stone-800 active:scale-[0.98]"
            >
              <CheckCircle size={14} />
              Publicar Aviso Ahora
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: HISTORIAL DE AVISOS (8 de 12) */}
        <div className="lg:col-span-8">
          <div className="mb-5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-amber-500">
                <MessageSquare size={14} />
              </div>
              <h3 className="text-[10px] font-black tracking-[0.2em] text-[#5A5750] uppercase">
                Historial de Comunicados
              </h3>
            </div>
            <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[8px] font-black tracking-widest text-[#9A9589] uppercase">
              {filteredAvisos.length}{' '}
              {filteredAvisos.length === 1 ? 'Aviso' : 'Avisos'}
            </span>
          </div>

          <div className="space-y-3">
            {filteredAvisos.length > 0 ? (
              filteredAvisos.map((aviso) => (
                <AvisoCard
                  key={aviso.id}
                  aviso={aviso}
                  onDelete={async (id) => {
                    const formData = new FormData()
                    formData.append('id', id)
                    await borrarAvisoAction(formData)
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(74,140,66,0.12)] bg-white p-12 text-center text-[#5A5750]">
                <div className="mb-4 rounded-full bg-stone-50 p-4 opacity-20">
                  <Bell size={36} />
                </div>
                <h3 className="mb-1 font-serif text-lg font-bold text-[#E8E4DC] italic">
                  No hay avisos que mostrar
                </h3>
                <p className="max-w-[250px] text-[9px] leading-relaxed font-bold tracking-widest uppercase">
                  {searchTerm
                    ? 'No encontramos avisos que coincidan con tu búsqueda.'
                    : 'Tu tablón está vacío. Comienza publicando un comunicado.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
