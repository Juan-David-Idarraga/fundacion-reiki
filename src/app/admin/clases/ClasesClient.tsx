'use client';

import React, { useState } from 'react';
import { 
  Trash2, Edit2, ExternalLink, Save, X, UploadCloud, 
  FolderPlus, FolderOpen, PlayCircle, Info, Plus, PlusCircle,
  LayoutGrid, List, Search, ChevronRight, ChevronDown, Video
} from 'lucide-react';
import { 
  agregarClaseAction, eliminarClaseAction, 
  crearModuloAction, eliminarModuloAction 
} from "../actions";
import { ClaseCard } from '@/components/admin/clase-card';

export default function ClasesClient({ modulos, clases }: { modulos: any[], clases: any[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedModulos, setExpandedModulos] = useState<string[]>(modulos.map(m => m.id));
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="flex-1 flex flex-col h-full bg-stone-50/50 overflow-hidden">
      
      {/* ================= SECCIÓN SUPERIOR: ACCIONES RÁPIDAS ================= */}
      <div className="p-6 lg:px-10 border-b border-stone-200 bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* BLOQUE 1: NUEVA UNIDAD (4/12) */}
            <div className="xl:col-span-4 bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner flex flex-col justify-between group hover:border-amber-200 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500 rounded-xl text-stone-900 shadow-sm"><FolderPlus size={18} /></div>
                  <h2 className="font-black text-stone-900 text-xs uppercase tracking-[0.2em]">Nueva Unidad</h2>
                </div>
              </div>
              <form action={crearModuloAction} className="grid grid-cols-2 gap-3">
                <input 
                  name="nombre" 
                  placeholder="Nombre de la unidad..." 
                  required 
                  className="col-span-2 p-3.5 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 shadow-sm font-medium" 
                />
                <input 
                  name="orden" 
                  type="number" 
                  placeholder="Orden" 
                  className="p-3.5 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 shadow-sm font-medium" 
                />
                <button className="bg-stone-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                  <Plus size={14}/> Crear Unidad
                </button>
              </form>
            </div>

            {/* BLOQUE 2: PUBLICAR CLASE (8/12) */}
            <div className="xl:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-stone-100 rounded-xl text-amber-600 shadow-sm"><UploadCloud size={18} /></div>
                <h2 className="font-black text-stone-900 text-xs uppercase tracking-[0.2em]">Publicar Nueva Clase</h2>
              </div>
              
              <form action={agregarClaseAction} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <select name="modulo_id" required className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500 appearance-none cursor-pointer">
                    <option value="">¿A qué unidad?</option>
                    {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                  </select>
                  <input name="url_youtube" required placeholder="Link de YouTube..." className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 font-medium" />
                </div>

                <div className="space-y-3">
                  <input name="titulo" required placeholder="Título de la clase..." className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 font-medium" />
                  <textarea name="description" placeholder="Resumen corto..." className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 h-[46px] resize-none font-medium" />
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-xl border border-amber-100">
                     <Info size={16} className="text-amber-500 shrink-0"/>
                     <p className="text-[10px] text-amber-800 font-bold uppercase leading-tight">Visible al instante para alumnos.</p>
                  </div>
                  <button className="w-full py-4 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-700 shadow-xl shadow-amber-600/20 transition-all active:scale-95">
                    Publicar Ahora
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SECCIÓN INFERIOR: PLAN DE ESTUDIOS ================= */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-stone-50/30">
        <div className="max-w-7xl mx-auto">
          
          {/* BARRA DE HERRAMIENTAS DEL LISTADO */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-stone-900 flex items-center justify-center text-amber-500 shadow-lg">
                <Video size={20} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 italic">Plan de Estudios</h3>
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Gestiona el contenido de tu academia</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Buscar clase..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none focus:border-amber-500 w-48 md:w-64 transition-all"
                />
              </div>
              <div className="h-6 w-px bg-stone-200 mx-1"></div>
              <div className="flex gap-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 hover:bg-stone-50'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 hover:bg-stone-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* LISTADO DE MÓDULOS Y CLASES */}
          <div className="space-y-12 pb-20">
            {modulos.map((modulo) => {
              const moduloClases = filteredClases.filter(c => c.modulo_id === modulo.id);
              const isExpanded = expandedModulos.includes(modulo.id);

              return (
                <div key={modulo.id} className="space-y-6 animate-fade-in-up">
                  {/* Cabecera Unidad */}
                  <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-stone-200 shadow-sm group hover:border-amber-200 transition-all">
                    <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleModulo(modulo.id)}>
                      <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${isExpanded ? 'bg-amber-500 text-stone-900 shadow-lg' : 'bg-stone-100 text-stone-400'}`}>
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm uppercase tracking-widest flex items-center gap-2">
                          {modulo.nombre}
                          <span className="bg-stone-100 text-stone-500 text-[9px] px-2 py-0.5 rounded-full font-black">
                            {moduloClases.length} {moduloClases.length === 1 ? 'Clase' : 'Clases'}
                          </span>
                        </h4>
                        <p className="text-stone-400 text-[9px] font-bold uppercase tracking-tighter mt-0.5">Unidad de estudio #{modulo.orden || '0'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <form action={eliminarModuloAction} onSubmit={(e) => { if(!confirm('¿Eliminar unidad completa? Se borrarán todas sus clases.')) e.preventDefault(); }}>
                        <input type="hidden" name="id" value={modulo.id} />
                        <button className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Eliminar unidad">
                          <Trash2 size={18}/>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Contenedor de Clases */}
                  {isExpanded && (
                    <div className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                      {moduloClases.length > 0 ? (
                        moduloClases.map((clase) => (
                          <ClaseCard 
                            key={clase.id} 
                            clase={clase} 
                            onDelete={async (id) => {
                              const formData = new FormData();
                              formData.append('id', id);
                              await eliminarClaseAction(formData);
                            }}
                          />
                        ))
                      ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white/50 rounded-3xl border border-dashed border-stone-200 text-stone-400">
                          <PlayCircle size={40} className="mb-3 opacity-20" />
                          <p className="text-xs font-bold uppercase tracking-widest">No hay clases en esta unidad</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {modulos.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-stone-200 text-stone-400">
                <FolderOpen size={60} className="mb-4 opacity-10" />
                <h3 className="font-serif text-xl font-bold text-stone-900 italic mb-2">Tu academia está vacía</h3>
                <p className="text-xs font-bold uppercase tracking-widest">Comienza creando tu primera unidad de estudio arriba</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
