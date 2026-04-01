'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, FileText, Trash2, Plus, Search, 
  FolderOpen, Info, FilePlus, ChevronDown, ChevronRight,
  BookOpen, Filter, LayoutGrid, List
} from 'lucide-react';
import { agregarMaterialAction, eliminarMaterialAction } from "../actions";
import { MaterialCard } from '@/components/admin/material-card';

export default function MaterialesClient({ modulos, materiales }: { modulos: any[], materiales: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModulos, setExpandedModulos] = useState<string[]>(modulos.map(m => m.id));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleModulo = (id: string) => {
    setExpandedModulos(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const filteredMateriales = materiales.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-50/50 overflow-hidden">
      
      {/* ================= SECCIÓN SUPERIOR: CARGA DE MATERIAL ================= */}
      <div className="p-6 lg:px-10 border-b border-stone-200 bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner group hover:border-amber-200 transition-all">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-amber-500 rounded-xl text-stone-900 shadow-sm"><FilePlus size={18} /></div>
              <h2 className="font-black text-stone-900 text-xs uppercase tracking-[0.2em]">Subir Nuevo Material PDF</h2>
            </div>
            
            <form action={agregarMaterialAction} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Unidad de Estudio</label>
                <select name="modulo_id" required className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500 appearance-none cursor-pointer shadow-sm">
                  <option value="">Selecciona una unidad...</option>
                  {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nombre del Documento</label>
                <input 
                  name="nombre" 
                  required 
                  placeholder="Ej: Manual Nivel 1" 
                  className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 shadow-sm font-medium" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Archivo PDF</label>
                <div className="relative">
                  <input 
                    type="file" 
                    name="archivo" 
                    required 
                    accept=".pdf" 
                    className="w-full text-[10px] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-stone-900 file:text-amber-500 cursor-pointer bg-white border border-stone-200 rounded-xl shadow-sm" 
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-700 shadow-xl shadow-amber-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                <UploadCloud size={16} /> Subir a la Biblioteca
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= SECCIÓN INFERIOR: BIBLIOTECA DIGITAL ================= */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-stone-50/30">
        <div className="max-w-7xl mx-auto">
          
          {/* BARRA DE HERRAMIENTAS */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-stone-900 flex items-center justify-center text-amber-500 shadow-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 italic">Biblioteca Digital</h3>
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Manuales y guías de estudio PDF</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Buscar material..." 
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

          {/* LISTADO POR MÓDULOS */}
          <div className="space-y-12 pb-20">
            {modulos.map(modulo => {
              const moduloMateriales = filteredMateriales.filter(m => m.modulo_id === modulo.id);
              const isExpanded = expandedModulos.includes(modulo.id);

              return (
                <section key={modulo.id} className="space-y-6 animate-fade-in-up">
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
                            {moduloMateriales.length} {moduloMateriales.length === 1 ? 'Archivo' : 'Archivos'}
                          </span>
                        </h4>
                        <p className="text-stone-400 text-[9px] font-bold uppercase tracking-tighter mt-0.5">Unidad de estudio #{modulo.orden || '0'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor de Materiales */}
                  {isExpanded && (
                    <div className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                      {moduloMateriales.length > 0 ? (
                        moduloMateriales.map(mat => (
                          <MaterialCard 
                            key={mat.id} 
                            material={mat} 
                            onDelete={async (id) => {
                              const formData = new FormData();
                              formData.append('id', id);
                              await eliminarMaterialAction(formData);
                            }}
                          />
                        ))
                      ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white/50 rounded-3xl border border-dashed border-stone-200 text-stone-400">
                          <FileText size={40} className="mb-3 opacity-20" />
                          <p className="text-xs font-bold uppercase tracking-widest">No hay archivos en esta unidad</p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}

            {modulos.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-stone-200 text-stone-400">
                <FolderOpen size={60} className="mb-4 opacity-10" />
                <h3 className="font-serif text-xl font-bold text-stone-900 italic mb-2">Tu biblioteca está vacía</h3>
                <p className="text-xs font-bold uppercase tracking-widest">Comienza creando una unidad en la sección de clases</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
