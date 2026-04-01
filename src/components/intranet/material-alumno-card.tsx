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
      className="group bg-white rounded-[32px] border border-stone-200 p-5 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <FileText size={100} className="text-stone-900 -rotate-12" />
      </div>

      {/* Icono de Archivo */}
      <div className="h-14 w-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
        <FileText size={28} />
      </div>

      {/* Información */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em]">Manual Oficial</span>
        </div>
        
        <h4 className="font-bold text-stone-900 text-sm md:text-base truncate group-hover:text-amber-700 transition-colors leading-tight mb-1">
          {material.nombre}
        </h4>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
            <FileDown size={12} className="text-amber-500" /> PDF
          </span>
          {material.created_at && (
            <>
              <div className="w-1 h-1 rounded-full bg-stone-200"></div>
              <span className="text-[10px] font-medium text-stone-400">
                {formatDateLatam(material.created_at)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Acción */}
      <div className="shrink-0 h-10 w-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-300">
        <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}
