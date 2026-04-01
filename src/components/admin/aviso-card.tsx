'use client';

import React from 'react';
import { Bell, Trash2, Calendar, Clock, Pin } from 'lucide-react';
import { formatDateLatam, isDateExpired } from '@/utils/date-format';

interface AvisoCardProps {
  aviso: {
    id: string;
    titulo: string;
    mensaje: string;
    fecha_expiracion: string;
    created_at?: string;
    prioridad?: 'alta' | 'media' | 'baja';
  };
  onDelete: (id: string) => void;
}

export function AvisoCard({ aviso, onDelete }: AvisoCardProps) {
  const isExpirado = isDateExpired(aviso.fecha_expiracion);

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex items-start gap-4 p-4 ${isExpirado ? 'border-stone-100 opacity-50 grayscale-[0.5]' : 'border-stone-200 shadow-sm hover:shadow-md hover:border-amber-300'}`}>
      
      {/* Icono lateral */}
      <div className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${isExpirado ? 'bg-stone-100 text-stone-400' : 'bg-amber-50 text-amber-600'}`}>
        <Bell size={16} />
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${isExpirado ? 'bg-stone-100 text-stone-400' : 'bg-amber-500 text-stone-900'}`}>
            {isExpirado ? <Clock size={9} /> : <Pin size={9} />}
            {isExpirado ? 'Expirado' : 'Activo'}
          </div>
          
          <div className="flex items-center gap-1 text-[9px] font-bold text-stone-400">
            <Calendar size={10} className="text-amber-500" />
            Expira: {formatDateLatam(aviso.fecha_expiracion)}
          </div>

          {aviso.created_at && (
            <span className="text-[9px] text-stone-300 font-medium">
              | Publicado: {formatDateLatam(aviso.created_at)}
            </span>
          )}
        </div>

        <h4 className="font-serif text-base font-bold text-stone-900 italic mb-1 group-hover:text-amber-700 transition-colors truncate">
          {aviso.titulo}
        </h4>
        
        <p className="text-stone-500 text-xs leading-relaxed whitespace-pre-wrap line-clamp-3 font-medium">
          {aviso.mensaje}
        </p>
      </div>

      {/* Botón Eliminar */}
      <button 
        onClick={() => {
          if(confirm('¿Estás seguro de eliminar este comunicado?')) {
            onDelete(aviso.id);
          }
        }}
        className="shrink-0 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        title="Eliminar aviso"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
