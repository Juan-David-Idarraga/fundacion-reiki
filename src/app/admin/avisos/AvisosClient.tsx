'use client';

import React, { useState } from 'react';
import { 
  Bell, Calendar, Trash2, Pin, PlusCircle, 
  Search, Filter, LayoutGrid, List, Info, 
  AlertCircle, CheckCircle, MessageSquare
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
    <div className="p-6 lg:p-10 max-w-7xl mx-auto font-sans text-stone-800 pb-20 bg-stone-50/30 min-h-screen">
      
      <header className="mb-12 border-b border-stone-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 italic flex items-center gap-3 mb-2">
            <Bell className="text-amber-500" size={32} /> Tablón de Comunicados
          </h2>
          <p className="text-stone-500 text-xs font-black uppercase tracking-[0.2em]">Crea y administra los avisos para tus alumnos.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
            <input 
              type="text" 
              placeholder="Buscar aviso..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none focus:border-amber-500 w-48 md:w-64 transition-all"
            />
          </div>
          <div className="h-6 w-px bg-stone-200 mx-1"></div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-stone-50 border border-stone-100 rounded-xl text-[10px] font-black uppercase tracking-widest px-3 py-2 outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="expirados">Expirados</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO (5 de 12) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[40px] border border-stone-200 shadow-xl shadow-stone-100/50 sticky top-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-50">
            <div className="p-2.5 bg-amber-50 rounded-2xl text-amber-600 shadow-sm">
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 italic">Publicar Nuevo Aviso</h3>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Llega a todos tus alumnos al instante</p>
            </div>
          </div>

          <form action={crearAvisoAction} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">Título del Aviso</label>
              <input 
                type="text" 
                name="titulo"
                required
                placeholder="Ej: Suspensión de clase, Nuevo Material..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">Mensaje del Comunicado</label>
              <textarea 
                name="mensaje"
                required
                rows={5}
                placeholder="Escribe el detalle del comunicado aquí..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none font-medium custom-scrollbar shadow-sm"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">Visible Hasta (Vencimiento)</label>
              <div className="relative group">
                <input 
                  type="date" 
                  name="fecha_expiracion"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium appearance-none shadow-sm cursor-pointer"
                />
                <Calendar size={18} className="absolute right-5 top-4 text-stone-400 pointer-events-none group-hover:text-amber-500 transition-colors" />
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 items-start">
              <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 font-bold uppercase leading-relaxed">
                El aviso aparecerá en el Dashboard de los alumnos hasta la fecha seleccionada.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-900 text-amber-500 font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Publicar Aviso Ahora
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: HISTORIAL DE AVISOS (7 de 12) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-stone-900 flex items-center justify-center text-amber-500 shadow-md">
                <MessageSquare size={16} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">Historial de Comunicados</h3>
            </div>
            <span className="bg-stone-200 text-stone-600 text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
              {filteredAvisos.length} {filteredAvisos.length === 1 ? 'Aviso' : 'Avisos'}
            </span>
          </div>
          
          <div className="space-y-6">
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
              <div className="bg-white rounded-[40px] border border-stone-200 border-dashed p-20 flex flex-col items-center justify-center text-center text-stone-400 animate-fade-in">
                <div className="p-6 bg-stone-50 rounded-full mb-6 opacity-20">
                  <Bell size={60} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 italic mb-2">No hay avisos que mostrar</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest max-w-[250px] leading-relaxed">
                  {searchTerm ? 'No encontramos avisos que coincidan con tu búsqueda.' : 'Tu tablón está vacío. Comienza publicando un comunicado importante.'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
