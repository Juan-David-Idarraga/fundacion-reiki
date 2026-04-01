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
      className="group bg-white rounded-[32px] border border-stone-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-500 cursor-pointer"
    >
      {/* Miniatura con Overlay de Play */}
      <div className="relative aspect-video bg-stone-900 overflow-hidden">
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
        
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Botón Play Central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-amber-500 text-stone-900 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <PlayCircle size={32} fill="currentColor" />
          </div>
        </div>

        {/* Duración Tag */}
        {clase.duracion && (
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
            <Clock size={12} className="text-amber-400" /> {clase.duracion}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Lección Disponible</span>
        </div>

        <h3 className="text-xl font-bold text-stone-900 mb-3 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
          {clase.titulo}
        </h3>
        
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-1 font-medium">
          {clase.descripcion || "En esta sesión profundizamos en los conceptos de sanación y equilibrio energético."}
        </p>

        {/* Footer de la tarjeta */}
        <div className="pt-5 border-t border-stone-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            <Calendar size={14} className="text-stone-300" />
            {clase.fecha || 'Reciente'}
          </div>
          <div className="flex items-center gap-1 text-amber-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            Ver Clase <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
