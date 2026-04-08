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
      className="group rounded-2xl p-3.5 flex items-center gap-4 transition-all duration-300 cursor-pointer relative overflow-hidden card-elevated hover:border-[rgba(74,140,66,0.4)]"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <FileText size={60} style={{ color: '#4A8C42' }} className="-rotate-12" />
      </div>

      {/* Icono de Archivo */}
      <div className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 group-hover:bg-[rgba(74,140,66,0.25)]"
        style={{ backgroundColor: 'rgba(74,140,66,0.1)', color: '#4A8C42' }}>
        <FileText size={20} />
      </div>

      {/* Información */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="h-1 w-1 rounded-full animate-pulse" style={{ backgroundColor: '#C9A227' }}></div>
          <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#9A9589' }}>Manual Oficial</span>
        </div>
        
        <h4 className="font-bold text-xs md:text-sm truncate transition-colors leading-tight mb-0.5 group-hover:text-[#7BC274]" style={{ color: '#E8E4DC' }}>
          {material.nombre}
        </h4>
        
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: '#9A9589' }}>
            <FileDown size={10} style={{ color: '#C9A227' }} /> PDF
          </span>
          {material.created_at && (
            <>
              <div className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: '#363830' }}></div>
              <span className="text-[9px] font-medium" style={{ color: '#9A9589' }}>
                {formatDateLatam(material.created_at)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Acción */}
      <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(74,140,66,0.15)]" style={{ backgroundColor: 'rgba(74,140,66,0.06)', color: '#4A8C42' }}>
        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}
