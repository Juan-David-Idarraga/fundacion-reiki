'use client';

import React from 'react';
import { FileText, Trash2, Download, File, ExternalLink } from 'lucide-react';

interface MaterialCardProps {
  material: {
    id: string;
    nombre: string;
    url_archivo: string;
    created_at?: string;
  };
  onDelete: (id: string, url: string) => void;
}

export function MaterialCard({ material, onDelete }: MaterialCardProps) {
  // Función para obtener la URL pública de Supabase (asumiendo que se guarda la ruta relativa)
  const getPublicUrl = (path: string) => {
    // Esta lógica dependerá de cómo esté configurado el bucket en Supabase
    // Por ahora usamos un placeholder o la URL directa si ya viene completa
    return path.startsWith('http') ? path : `#`; 
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all p-4 flex items-center gap-4">
      {/* Icono de Archivo */}
      <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
        <FileText size={24} />
      </div>

      {/* Información */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-stone-900 text-sm truncate group-hover:text-amber-700 transition-colors">
          {material.nombre}
        </h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            Documento PDF
          </span>
          {material.created_at && (
            <>
              <div className="w-1 h-1 rounded-full bg-stone-200"></div>
              <span className="text-[10px] font-medium text-stone-400">
                {new Date(material.created_at).toLocaleDateString('es-CL')}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button 
          onClick={() => {
            if(confirm('¿Estás seguro de eliminar este material?')) {
              onDelete(material.id, material.url_archivo);
            }
          }}
          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Eliminar material"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
