'use client';

import React from 'react';
import { Bell, Trash2, Calendar, Clock, Pin, AlertTriangle, Info, CheckCircle } from 'lucide-react';
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
  
  // Determinar estilo según prioridad (si existiera, si no usamos por defecto)
  const priorityStyles = {
    alta: 'border-red-200 bg-red-50/30 text-red-700',
    media: 'border-amber-200 bg-amber-50/30 text-amber-700',
    baja: 'border-blue-200 bg-blue-50/30 text-blue-700',
    default: 'border-stone-200 bg-white text-stone-700'
  };

  return (
    <div className={`group relative bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col sm:flex-row gap-6 p-6 ${isExpirado ? 'border-stone-100 opacity-60 grayscale-[0.5]' : 'border-stone-200 shadow-sm hover:shadow-md hover:border-amber-300'}`}>
      
      {/* Decoración de fondo */}
      <div className="absolute -top-6 -right-6 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Bell size={120} className="text-stone-900 -rotate-12" />
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${isExpirado ? 'bg-stone-100 text-stone-400' : 'bg-amber-500 text-stone-900'}`}>
            {isExpirado ? <Clock size={12} /> : <Pin size={12} />}
            {isExpirado ? 'Expirado' : 'Aviso Activo'}
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
            <Calendar size={12} className="text-amber-500" />
            Expira: {formatDateLatam(aviso.fecha_expiracion)}
          </div>
        </div>

        <h4 className="font-serif text-xl font-bold text-stone-900 italic mb-2 group-hover:text-amber-700 transition-colors">
          {aviso.titulo}
        </h4>
        
        <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
          {aviso.mensaje}
        </p>

        {aviso.created_at && (
          <div className="mt-4 pt-4 border-t border-stone-50 flex items-center gap-2 text-[10px] font-bold text-stone-300 uppercase tracking-tighter">
            Publicado el {formatDateLatam(aviso.created_at)}
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="shrink-0 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-stone-100 pt-4 sm:pt-0 sm:pl-6 relative z-10">
        <button 
          onClick={() => {
            if(confirm('¿Estás seguro de eliminar este comunicado?')) {
              onDelete(aviso.id);
            }
          }}
          className="flex flex-col items-center gap-2 p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group/btn"
          title="Eliminar aviso"
        >
          <div className="p-2 bg-stone-50 rounded-xl group-hover/btn:bg-red-100 transition-colors">
            <Trash2 size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/btn:opacity-100 transition-all transform translate-y-1 group-hover/btn:translate-y-0">
            Eliminar
          </span>
        </button>
      </div>
    </div>
  );
}
