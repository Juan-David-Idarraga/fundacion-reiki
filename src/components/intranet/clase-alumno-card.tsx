'use client';

import React, { useState } from 'react';
import { PlayCircle, Clock, Calendar, ChevronRight, Youtube, CheckCircle2 } from 'lucide-react';

interface ClaseAlumnoCardProps {
  clase: {
    id: string;
    titulo: string;
    descripcion?: string;
    url_youtube: string;
    duracion?: string;
    fecha?: string;
  };
  onPlay: (clase: any) => void;
}

export function ClaseAlumnoCard({ clase, onPlay }: ClaseAlumnoCardProps) {
  // Extraer ID de YouTube para la miniatura
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(clase.url_youtube);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <div 
      onClick={() => onPlay(clase)}
      className="group rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 cursor-pointer card-elevated hover:border-[rgba(74,140,66,0.4)]"
    >
      {/* Miniatura con Overlay de Play */}
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#1E2019' }}>
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={clase.titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            onError={(e) => {
              // Fallback si maxresdefault no existe
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-700">
            <Youtube size={48} />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Botón Play Central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}>
            <PlayCircle size={24} fill="currentColor" />
          </div>
        </div>

        {/* Duración Tag */}
        {clase.duracion && (
          <div className="absolute bottom-3 right-3 text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1"
            style={{ backgroundColor: 'rgba(20,21,16,0.85)', color: '#E8E4DC', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Clock size={10} style={{ color: '#C9A227' }} /> {clase.duracion}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col" style={{ backgroundColor: '#272A23' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4A8C42' }}></div>
          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#9A9589' }}>Lección Disponible</span>
        </div>

        <h3 className="text-sm font-bold mb-2 leading-tight line-clamp-2 transition-colors group-hover:text-[#7BC274]"
          style={{ color: '#E8E4DC' }}>
          {clase.titulo}
        </h3>
        
        <p className="text-xs leading-relaxed line-clamp-2 mb-4 flex-1 font-medium" style={{ color: '#9A9589' }}>
          {clase.descripcion || "En esta sesión profundizamos en los conceptos de sanación y equilibrio energético."}
        </p>

        {/* Footer de la tarjeta */}
        <div className="pt-3 flex justify-between items-center" style={{ borderTop: '1px solid #363830' }}>
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#5A5750' }}>
            <Calendar size={11} />
            {clase.fecha || 'Reciente'}
          </div>
          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest group-hover:translate-x-0.5 transition-transform"
            style={{ color: '#4A8C42' }}>
            Ver Clase <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
