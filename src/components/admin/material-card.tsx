'use client'

import React from 'react'
import { FileText, Trash2, Download, File, ExternalLink } from 'lucide-react'

interface MaterialCardProps {
  material: {
    id: string
    nombre: string
    url_archivo: string
    created_at?: string
  }
  onDelete: (id: string, url: string) => void
}

export function MaterialCard({ material, onDelete }: MaterialCardProps) {
  // Función para obtener la URL pública de Supabase (asumiendo que se guarda la ruta relativa)
  const getPublicUrl = (path: string) => {
    // Esta lógica dependerá de cómo esté configurado el bucket en Supabase
    // Por ahora usamos un placeholder o la URL directa si ya viene completa
    return path.startsWith('http') ? path : `#`
  }

  return (
    <div
      className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300"
      style={{
        backgroundColor: '#272A23',
        border: '1px solid rgba(139,107,145,0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      {/* Icono de Archivo */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
        style={{ backgroundColor: 'rgba(139,107,145,0.1)', color: '#8B6B91' }}
      >
        <FileText size={24} />
      </div>

      {/* Información */}
      <div className="min-w-0 flex-1">
        <h4
          className="truncate text-sm font-bold transition-colors"
          style={{ color: '#E8E4DC' }}
        >
          {material.nombre}
        </h4>
        <div className="mt-1 flex items-center gap-3">
          <span
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: '#5A5750' }}
          >
            Documento PDF
          </span>
          {material.created_at && (
            <>
              <div
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: '#363830' }}
              ></div>
              <span
                className="text-[10px] font-medium"
                style={{ color: '#5A5750' }}
              >
                {new Date(material.created_at).toLocaleDateString('es-CL')}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de eliminar este material?')) {
              onDelete(material.id, material.url_archivo)
            }
          }}
          className="rounded-xl p-2 transition-all"
          style={{ color: '#5A5750' }}
          title="Eliminar material"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
