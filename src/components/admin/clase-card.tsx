'use client'

import React from 'react'
import { PlayCircle, Trash2, Clock, ExternalLink, Youtube } from 'lucide-react'

interface ClaseCardProps {
  clase: {
    id: string
    titulo: string
    descripcion?: string
    url_youtube: string
    duracion?: string
    fecha?: string
  }
  onDelete: (id: string) => void
}

export function ClaseCard({ clase, onDelete }: ClaseCardProps) {
  // Extraer ID de YouTube para la miniatura
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(clase.url_youtube)
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : null

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: '#272A23',
        border: '1px solid rgba(74,140,66,0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {/* Miniatura / Preview */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: '#141510' }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={clase.titulo}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ color: 'rgba(74,140,66,0.3)' }}
          >
            <Youtube size={40} />
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center transition-colors"
          style={{
            background:
              'linear-gradient(to top, rgba(26,28,24,0.7), transparent)',
          }}
        >
          <PlayCircle
            className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            size={48}
            style={{ color: '#4A8C42' }}
          />
        </div>
        {clase.duracion && (
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
            <Clock size={10} /> {clase.duracion}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4
            className="line-clamp-2 font-serif text-sm leading-tight font-bold italic transition-colors"
            style={{ color: '#E8E4DC' }}
          >
            {clase.titulo}
          </h4>
          <div className="flex shrink-0 gap-1">
            <a
              href={clase.url_youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 transition-all"
              style={{ color: '#5A5750' }}
              title="Ver en YouTube"
            >
              <ExternalLink size={14} />
            </a>
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de eliminar esta clase?')) {
                  onDelete(clase.id)
                }
              }}
              className="rounded-lg p-1.5 transition-all"
              style={{ color: '#5A5750' }}
              title="Eliminar clase"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {clase.descripcion && (
          <p
            className="mb-4 line-clamp-2 flex-1 text-xs"
            style={{ color: '#9A9589' }}
          >
            {clase.descripcion}
          </p>
        )}

        <div
          className="mt-auto flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(74,140,66,0.08)' }}
        >
          <span
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: '#5A5750' }}
          >
            {clase.fecha || 'Sin fecha'}
          </span>
          <div
            className="flex items-center gap-1 text-[10px] font-bold tracking-tighter uppercase"
            style={{ color: '#4A8C42' }}
          >
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: '#4A8C42' }}
            ></div>
            Publicada
          </div>
        </div>
      </div>
    </div>
  )
}
