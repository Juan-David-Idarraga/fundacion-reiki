'use client';

import React from 'react';
import { FileText, Download, ExternalLink, Clock, ShieldCheck, FileDown } from 'lucide-react';
import { formatDateLatam } from '@/utils/date-format';

interface MaterialAlumnoCardProps {
  material: {
    id: string;
    nombre: string;
    url_archivo: string;
    created_at?: string;
  };
  onView: (ruta: string) => void;
}

export function MaterialAlumnoCard({ material, onView }: MaterialAlumnoCardProps) {
  return (
    <div 
      onClick={() => onView(material.url_archivo)}
      className="group bg-white rounded-2xl border border-stone-200 p-3.5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <FileText size={60} className="text-stone-900 -rotate-12" />
      </div>

      {/* Icono de Archivo */}
      <div className="h-10 w-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-inner shrink-0">
        <FileText size={20} />
      </div>

      {/* Información */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Manual Oficial</span>
        </div>
        
        <h4 className="font-bold text-stone-900 text-xs md:text-sm truncate group-hover:text-amber-700 transition-colors leading-tight mb-0.5">
          {material.nombre}
        </h4>
        
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
            <FileDown size={10} className="text-amber-500" /> PDF
          </span>
          {material.created_at && (
            <>
              <div className="w-0.5 h-0.5 rounded-full bg-stone-200"></div>
              <span className="text-[9px] font-medium text-stone-400">
                {formatDateLatam(material.created_at)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Acción */}
      <div className="shrink-0 h-8 w-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-300">
        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}
