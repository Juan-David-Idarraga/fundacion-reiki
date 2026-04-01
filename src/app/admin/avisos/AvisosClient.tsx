'use client';

import React, { useState } from 'react';
import { 
  Bell, Calendar, PlusCircle, Search, 
  Info, CheckCircle, MessageSquare
} from 'lucide-react';
import { AvisoCard } from '@/components/admin/aviso-card';
import { isDateExpired } from '@/utils/date-format';

interface AvisosClientProps {
  avisos: any[];
  crearAvisoAction: (formData: FormData) => Promise<void>;
  borrarAvisoAction: (formData: FormData) => Promise<void>;
}

export default function AvisosClient({ avisos, crearAvisoAction, borrarAvisoAction }: AvisosClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'todos' | 'activos' | 'expirados'>('todos');

  const filteredAvisos = avisos.filter(aviso => {
    const matchesSearch = aviso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         aviso.mensaje.toLowerCase().includes(searchTerm.toLowerCase());
    const isExpirado = isDateExpired(aviso.fecha_expiracion);
    if (filter === 'activos') return matchesSearch && !isExpirado;
    if (filter === 'expirados') return matchesSearch && isExpirado;
    return matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans text-stone-800 pb-16 min-h-screen">
      
      {/* Header compacto */}
      <header className="mb-8 border-b border-stone-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <Bell size={18} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 italic">Tablón de Comunicados</h2>
            <p className="text-stone-400 text-[9px] font-black uppercase tracking-[0.2em]">Crea y administra los avisos para tus alumnos.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" size={12} />
            <input 
              type="text" 
              placeholder="Buscar aviso..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-100 rounded-lg text-xs outline-none focus:border-amber-500 w-44 md:w-56 transition-all"
            />
          </div>
          <div className="h-5 w-px bg-stone-200"></div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-stone-50 border border-stone-100 rounded-lg text-[9px] font-black uppercase tracking-widest px-2 py-1.5 outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="expirados">Expirados</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO (4 de 12) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-md sticky top-6">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-stone-100">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <PlusCircle size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 italic">Publicar Nuevo Aviso</h3>
              <p className="text-stone-400 text-[9px] font-bold uppercase tracking-widest">Llega a todos tus alumnos</p>
            </div>
          </div>

          <form action={crearAvisoAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black uppercase tracking-widest text-stone-500 ml-1">Título del Aviso</label>
              <input 
                type="text" 
                name="titulo"
                required
                placeholder="Ej: Suspensión de clase..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-black uppercase tracking-widest text-stone-500 ml-1">Mensaje del Comunicado</label>
              <textarea 
                name="mensaje"
                required
                rows={4}
                placeholder="Escribe el detalle del comunicado aquí..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none font-medium custom-scrollbar"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-black uppercase tracking-widest text-stone-500 ml-1">Visible Hasta (Vencimiento)</label>
              <div className="relative group">
                <input 
                  type="date" 
                  name="fecha_expiracion"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium appearance-none cursor-pointer"
                />
                <Calendar size={14} className="absolute right-4 top-3.5 text-stone-400 pointer-events-none group-hover:text-amber-500 transition-colors" />
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex gap-2 items-start">
              <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[9px] text-amber-800 font-bold uppercase leading-relaxed">
                El aviso aparecerá en el Dashboard de los alumnos hasta la fecha seleccionada.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-900 text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] py-3.5 rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <CheckCircle size={14} />
              Publicar Aviso Ahora
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: HISTORIAL DE AVISOS (8 de 12) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-stone-900 flex items-center justify-center text-amber-500">
                <MessageSquare size={14} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Historial de Comunicados</h3>
            </div>
            <span className="bg-stone-200 text-stone-600 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
              {filteredAvisos.length} {filteredAvisos.length === 1 ? 'Aviso' : 'Avisos'}
            </span>
          </div>
          
          <div className="space-y-3">
            {filteredAvisos.length > 0 ? (
              filteredAvisos.map((aviso) => (
                <AvisoCard 
                  key={aviso.id} 
                  aviso={aviso} 
                  onDelete={async (id) => {
                    const formData = new FormData();
                    formData.append('id', id);
                    await borrarAvisoAction(formData);
                  }}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-12 flex flex-col items-center justify-center text-center text-stone-400">
                <div className="p-4 bg-stone-50 rounded-full mb-4 opacity-20">
                  <Bell size={36} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 italic mb-1">No hay avisos que mostrar</h3>
                <p className="text-[9px] font-bold uppercase tracking-widest max-w-[250px] leading-relaxed">
                  {searchTerm ? 'No encontramos avisos que coincidan con tu búsqueda.' : 'Tu tablón está vacío. Comienza publicando un comunicado.'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
