'use client';

import React, { useState } from 'react';
import { 
  Trash2, Edit2, ExternalLink, Save, X, UploadCloud, 
  FolderPlus, FolderOpen, PlayCircle, Info, Plus, PlusCircle
} from 'lucide-react';
import { 
  agregarClaseAction, eliminarClaseAction, editarClaseAction,
  crearModuloAction, eliminarModuloAction, editarModuloAction 
} from "../actions";

export default function ClasesClient({ modulos, clases }: { modulos: any[], clases: any[] }) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editModuloId, setEditModuloId] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-50/50 overflow-hidden">
      
      {/* ================= SECCIÓN SUPERIOR: ACCIONES RÁPIDAS (SIN SCROLL) ================= */}
      <div className="p-6 lg:px-10 border-b border-stone-200 bg-white shadow-sm z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* BLOQUE 1: NUEVA UNIDAD (Compacto) */}
          <div className="bg-stone-50 p-5 rounded-[24px] border border-stone-100 shadow-inner flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-500 rounded-lg text-stone-900"><FolderPlus size={16} /></div>
              <h2 className="font-black text-stone-900 text-[10px] uppercase tracking-[0.2em]">Nueva Unidad</h2>
            </div>
            <form action={crearModuloAction} className="grid grid-cols-2 gap-3">
              <input name="nombre" placeholder="Nombre..." required className="col-span-2 p-3 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 shadow-sm" />
              <input name="orden" type="number" placeholder="Orden" className="p-3 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 shadow-sm" />
              <button className="bg-stone-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
                <Plus size={14}/> Crear
              </button>
            </form>
          </div>

          {/* BLOQUE 2: PUBLICAR CLASE (Organizado en 2 columnas internas) */}
          <div className="xl:col-span-2 bg-white p-5 rounded-[24px] border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-stone-100 rounded-lg text-amber-600"><UploadCloud size={16} /></div>
              <h2 className="font-black text-stone-900 text-[10px] uppercase tracking-[0.2em]">Publicar Nueva Clase</h2>
            </div>
            
            <form action={agregarClaseAction} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <select name="modulo_id" required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500">
                  <option value="">¿A qué unidad?</option>
                  {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
                <input name="url_youtube" required placeholder="Link de YouTube..." className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500" />
              </div>

              <div className="space-y-3">
                <input name="titulo" required placeholder="Título de la clase..." className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500" />
                <textarea name="descripcion" placeholder="Resumen corto..." className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 h-[42px] resize-none" />
              </div>

              <div className="flex flex-col justify-between gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl border border-amber-100">
                   <Info size={14} className="text-amber-500 shrink-0"/>
                   <p className="text-[9px] text-amber-800 font-bold uppercase leading-tight">El video será visible al instante para los alumnos.</p>
                </div>
                <button className="w-full py-3 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-700 shadow-lg shadow-amber-600/20 transition-all active:scale-95">
                  Publicar Ahora
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* ================= SECCIÓN INFERIOR: PLAN DE ESTUDIOS (CON SCROLL) ================= */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-stone-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FolderOpen className="text-stone-300" size={20} />
            <h3 className="font-serif text-xl font-bold text-stone-900 italic text-sm">Estructura del Curso</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
            {modulos.map((modulo) => (
              <div key={modulo.id} className="space-y-4">
                {/* Cabecera Unidad */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-sm group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-stone-900 flex items-center justify-center text-amber-500">
                      <FolderOpen size={14} />
                    </div>
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-widest">{modulo.nombre}</h4>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => setEditModuloId(modulo.id)} className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors"><Edit2 size={14}/></button>
                    <form action={eliminarModuloAction}>
                      <input type="hidden" name="id" value={modulo.id} />
                      <button className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                    </form>
                  </div>
                </div>

                {/* Clases */}
                <div className="grid gap-2 pl-4 border-l-2 border-stone-200 ml-4">
                  {clases.filter(c => c.modulo_id === modulo.id).map((clase) => (
                    <div key={clase.id} className="bg-white p-3.5 rounded-xl border border-stone-100 shadow-sm flex justify-between items-center group hover:border-amber-200 transition-all">
                      <div className="flex items-center gap-3 truncate">
                        <PlayCircle size={16} className="text-amber-600 shrink-0" />
                        <span className="font-bold text-stone-800 text-xs truncate">{clase.titulo}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                         <form action={eliminarClaseAction}>
                            <input type="hidden" name="id" value={clase.id} />
                            <button className="text-stone-300 hover:text-red-500"><Trash2 size={14}/></button>
                         </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}