'use client';

import React, { useState } from 'react';
import { 
  PlayCircle, Clock, ChevronLeft, FolderOpen, 
  ShieldAlert, Lock, Calendar, MessageCircle, 
  X, Youtube, Info, BookOpen, Search, 
  LayoutGrid, List, ChevronDown, ChevronRight,
  MonitorPlay, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { ClaseAlumnoCard } from '@/components/intranet/clase-alumno-card';

interface ClasesAlumnoClientProps {
  modulos: any[];
  clases: any[];
  fechaVencimiento: Date | null;
}

export default function ClasesAlumnoClient({ modulos, clases, fechaVencimiento }: ClasesAlumnoClientProps) {
  const [selectedClase, setSelectedClase] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModulos, setExpandedModulos] = useState<string[]>(modulos.map(m => m.id));

  const toggleModulo = (id: string) => {
    setExpandedModulos(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const filteredClases = clases.filter(c => 
    c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.descripcion && c.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-stone-800 pb-20 font-sans selection:bg-amber-200">
      
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="p-6 flex items-center justify-between bg-white/70 backdrop-blur-xl sticky top-0 z-40 border-b border-stone-200/50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/intranet" className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
            <ChevronLeft size={20}/>
          </Link>
          <div className="h-6 w-px bg-stone-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <MonitorPlay size={20} className="text-amber-600" />
            <h1 className="font-serif font-bold text-xl uppercase tracking-tighter text-stone-900">Formación Reiki Usui</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 shadow-inner">
           <Calendar size={14} className="text-amber-600" />
           <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
             Vence: {fechaVencimiento?.toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })}
           </span>
        </div>
      </nav>

      {/* HEADER DE LA SECCIÓN */}
      <header className="max-w-7xl mx-auto px-6 mt-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <p className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em]">Tu Camino de Aprendizaje</p>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 italic tracking-tight leading-none mb-3">
              Clases Grabadas
            </h2>
            <p className="text-stone-500 text-xs font-medium leading-relaxed">
              Explora las lecciones de cada unidad a tu propio ritmo. Cada video está diseñado para profundizar en tu conexión con la energía universal.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input 
                type="text" 
                placeholder="Buscar lección..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none focus:border-amber-500 w-full md:w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 space-y-12">
        
        {modulos?.map((modulo) => {
          const moduloClases = filteredClases.filter(c => c.modulo_id === modulo.id);
          const isExpanded = expandedModulos.includes(modulo.id);

          return (
            <section key={modulo.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              
              {/* Header de la Unidad */}
              <div 
                onClick={() => toggleModulo(modulo.id)}
                className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-sm group hover:border-amber-300 transition-all cursor-pointer mb-6"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-stone-900 text-amber-500 shadow-lg shadow-stone-200' : 'bg-stone-100 text-stone-400'}`}>
                    <FolderOpen size={20}/>
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-stone-900 italic tracking-tight flex items-center gap-2">
                      {modulo.nombre}
                      <span className="bg-stone-100 text-stone-500 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                        {moduloClases.length} {moduloClases.length === 1 ? 'Lección' : 'Lecciones'}
                      </span>
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <div className={`h-0.5 rounded-full transition-all duration-300 ${isExpanded ? 'w-6 bg-amber-500' : 'w-3 bg-stone-200'}`}></div>
                       <p className="text-[9px] font-black text-stone-400 tracking-[0.2em] uppercase italic">Unidad #{modulo.orden || '0'}</p>
                    </div>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-amber-50 text-amber-600 rotate-180' : 'bg-stone-50 text-stone-300'}`}>
                  <ChevronDown size={16} />
                </div>
              </div>

              {/* Listado de clases de este módulo */}
              {isExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  {moduloClases.length > 0 ? (
                    moduloClases.map((clase) => (
                      <ClaseAlumnoCard 
                        key={clase.id} 
                        clase={clase} 
                        onPlay={(c) => setSelectedClase(c)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-16 px-8 border-2 border-dashed border-stone-200 rounded-[40px] text-center bg-white/50">
                       <div className="p-4 bg-stone-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 opacity-50">
                          <MonitorPlay size={32} className="text-stone-400" />
                       </div>
                       <p className="text-sm italic text-stone-400 font-medium">Aún no hay videos publicados en esta unidad.</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}

      </main>

      {/* MODAL DEL REPRODUCTOR (VISTA ENFOCADA) */}
      {selectedClase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-950/95 backdrop-blur-md"
            onClick={() => setSelectedClase(null)}
          ></div>
          
          {/* Contenedor del Reproductor */}
          <div className="relative w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full max-h-[85vh] animate-in zoom-in-95 duration-500">
            
            {/* Lado Izquierdo: Video */}
            <div className="flex-[2] bg-black relative flex flex-col">
              <div className="aspect-video w-full relative">
                <iframe 
                  className="absolute inset-0 w-full h-full" 
                  src={`${selectedClase.url_youtube}?autoplay=1`} 
                  title={selectedClase.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Info móvil */}
              <div className="p-6 lg:hidden overflow-y-auto">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{selectedClase.titulo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{selectedClase.descripcion}</p>
              </div>
            </div>

            {/* Lado Derecho: Detalles y Materiales */}
            <div className="flex-1 border-l border-stone-100 flex flex-col bg-white overflow-hidden hidden lg:flex">
              <div className="p-8 border-b border-stone-50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                    <Sparkles size={14} /> Lección en Curso
                  </div>
                  <button 
                    onClick={() => setSelectedClase(null)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400"
                  >
                    <X size={20} />
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-tight">{selectedClase.titulo}</h3>
                <div className="flex items-center gap-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-500" /> {selectedClase.duracion || 'Clase Completa'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-stone-300" /> {selectedClase.fecha || 'Reciente'}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div>
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Descripción de la Clase</h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium">
                    {selectedClase.descripcion || "En esta sesión profundizamos en los conceptos de sanación y equilibrio energético para tu crecimiento personal."}
                  </p>
                </div>

                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                  <h4 className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <BookOpen size={14} className="text-amber-600" /> Material de Apoyo
                  </h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase mb-4">Recuerda revisar la biblioteca PDF para descargar el manual de esta unidad.</p>
                  <Link 
                    href="/intranet/materiales"
                    className="flex items-center justify-center gap-2 w-full bg-white border border-stone-200 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-600 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm"
                  >
                    Ir a la Biblioteca <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="p-8 bg-stone-50/50 border-t border-stone-100">
                <a 
                  href="https://wa.me/56951735495" 
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-stone-900 text-amber-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg"
                >
                  <MessageCircle size={18} /> ¿Dudas con esta clase?
                </a>
              </div>
            </div>

            {/* Botón cerrar móvil */}
            <button 
              onClick={() => setSelectedClase(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full lg:hidden z-[110]"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* FOOTER DE PROTECCIÓN */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
         <div className="inline-flex items-center gap-2 text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] opacity-50">
            <Lock size={12} /> Contenido Protegido • Centro de Reiki 2026
         </div>
      </div>

    </div>
  );
}
