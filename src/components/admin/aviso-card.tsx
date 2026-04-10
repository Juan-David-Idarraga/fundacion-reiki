'use client'

import React from 'react'
import { Bell, Trash2, Calendar, Clock, Pin } from 'lucide-react'
import { formatDateLatam, isDateExpired } from '@/utils/date-format'

interface AvisoCardProps {
  aviso: {
    id: string
    titulo: string
    mensaje: string
    fecha_expiracion: string
    created_at?: string
    prioridad?: 'alta' | 'media' | 'baja'
  }
  onDelete: (id: string) => void
}

export function AvisoCard({ aviso, onDelete }: AvisoCardProps) {
  const isExpirado = isDateExpired(aviso.fecha_expiracion)

  return (
    <div
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300"
      style={{
        backgroundColor: '#272A23',
        border: isExpirado
          ? '1px solid rgba(74,140,66,0.05)'
          : '1px solid rgba(74,140,66,0.12)',
        opacity: isExpirado ? 0.5 : 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      {/* Icono lateral */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={
          isExpirado
            ? { backgroundColor: 'rgba(74,140,66,0.04)', color: '#5A5750' }
            : { backgroundColor: 'rgba(201,162,39,0.1)', color: '#C9A227' }
        }
      >
        <Bell size={16} />
      </div>

      {/* Contenido Principal */}
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-black tracking-widest uppercase"
            style={
              isExpirado
                ? { backgroundColor: 'rgba(74,140,66,0.04)', color: '#5A5750' }
                : { backgroundColor: 'rgba(74,140,66,0.12)', color: '#4A8C42' }
            }
          >
            {isExpirado ? <Clock size={9} /> : <Pin size={9} />}
            {isExpirado ? 'Expirado' : 'Activo'}
          </div>

          <div
            className="flex items-center gap-1 text-[9px] font-bold"
            style={{ color: '#5A5750' }}
          >
            <Calendar size={10} style={{ color: '#C9A227' }} />
            Expira: {formatDateLatam(aviso.fecha_expiracion)}
          </div>

          {aviso.created_at && (
            <span
              className="text-[9px] font-medium"
              style={{ color: '#5A5750' }}
            >
              | Publicado: {formatDateLatam(aviso.created_at)}
            </span>
          )}
        </div>

        <h4
          className="mb-1 truncate font-serif text-base font-bold italic transition-colors"
          style={{ color: '#E8E4DC' }}
        >
          {aviso.titulo}
        </h4>

        <p
          className="line-clamp-3 text-xs leading-relaxed font-medium whitespace-pre-wrap"
          style={{ color: '#9A9589' }}
        >
          {aviso.mensaje}
        </p>
      </div>

      {/* Botón Eliminar */}
      <button
        onClick={() => {
          if (confirm('¿Estás seguro de eliminar este comunicado?')) {
            onDelete(aviso.id)
          }
        }}
        className="shrink-0 rounded-xl p-2 transition-all"
        style={{ color: '#5A5750' }}
        title="Eliminar aviso"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
