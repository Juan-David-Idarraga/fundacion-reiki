'use client';

import React from 'react';
import { PlayCircle, Trash2, Clock, ExternalLink, Youtube } from 'lucide-react';

interface ClaseCardProps {
  clase: {
    id: string;
    titulo: string;
    descripcion?: string;
    url_youtube: string;
    duracion?: string;
    fecha?: string;
  };
  onDelete: (id: string) => void;
}

export function ClaseCard({ clase, onDelete }: ClaseCardProps) {
  // Extraer ID de YouTube para la miniatura
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(clase.url_youtube);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all overflow-hidden flex flex-col h-full">
      {/* Miniatura / Preview */}
      <div className="relative aspect-video bg-stone-100 overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={clase.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <Youtube size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <PlayCircle className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" size={48} />
        </div>
        {clase.duracion && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <Clock size={10} /> {clase.duracion}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h4 className="font-bold text-stone-900 text-sm leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
            {clase.titulo}
          </h4>
          <div className="flex gap-1 shrink-0">
            <a 
              href={clase.url_youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
              title="Ver en YouTube"
            >
              <ExternalLink size={14} />
            </a>
            <button 
              onClick={() => {
                if(confirm('¿Estás seguro de eliminar esta clase?')) {
                  onDelete(clase.id);
                }
              }}
              className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Eliminar clase"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        {clase.descripcion && (
          <p className="text-stone-500 text-xs line-clamp-2 mb-4 flex-1">
            {clase.descripcion}
          </p>
        )}

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            {clase.fecha || 'Sin fecha'}
          </span>
          <div className="flex items-center gap-1 text-amber-600 font-bold text-[10px] uppercase tracking-tighter">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
            Publicada
          </div>
        </div>
      </div>
    </div>
  );
}
