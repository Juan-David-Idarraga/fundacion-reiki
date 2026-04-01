'use client';

import React, { useState } from 'react';
import { 
  FileText, ExternalLink, ShieldCheck, Search, 
  FolderOpen, BookOpen, ChevronDown, ChevronRight,
  Sparkles, Info, Lock, Download, FileDown
} from 'lucide-react';
import { createClient } from '@/supabase/client';
import { MaterialAlumnoCard } from '@/components/intranet/material-alumno-card';

interface MaterialesAlumnoClientProps {
  modulos: any[];
  materiales: any[];
}

export default function MaterialesAlumnoClient({ modulos, materiales }: MaterialesAlumnoClientProps) {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModulos, setExpandedModulos] = useState<string[]>(modulos.map(m => m.id));

  const toggleModulo = (id: string) => {
    setExpandedModulos(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleVerArchivo = async (ruta: string) => {
    // Generamos una URL firmada que expira en 10 minutos (600 segundos)
    const { data, error } = await supabase
      .storage
      .from('materiales')
      .createSignedUrl(ruta, 600);

    if (error) {
      console.error("Error de acceso:", error);
      alert("No se pudo generar el acceso seguro. Intenta recargar la página.");
      return;
    }

    // Abrimos el PDF en una pestaña nueva con el link temporal
    window.open(data.signedUrl, '_blank');
  };

  const filteredMateriales = materiales.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-stone-800 pb-20 font-sans selection:bg-amber-200">
      
      {/* HEADER DE LA SECCIÓN */}
      <header className="max-w-7xl mx-auto px-6 pt-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <p className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em]">Recursos de Formación</p>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 italic tracking-tight leading-none mb-3">
              Biblioteca de Estudio
            </h2>
            <p className="text-stone-500 text-xs font-medium leading-relaxed">
              Accede a tus manuales oficiales, guías de meditación y material de apoyo. Todo el conocimiento necesario para tu camino de sanación.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input 
                type="text" 
                placeholder="Buscar manual..." 
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
        
        {/* Aviso de seguridad premium */}
        <div className="bg-stone-900 text-stone-400 p-5 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-stone-900/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="h-12 w-12 bg-amber-500 rounded-2xl flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20 shrink-0 relative z-10">
            <ShieldCheck size={24} />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-white font-serif text-lg font-bold italic mb-0.5">Contenido Protegido</h4>
            <p className="text-[11px] leading-relaxed font-medium text-stone-400 max-w-2xl">
              Para garantizar la integridad de tu formación, los enlaces de acceso son temporales y personales. Al hacer clic en un material, se generará un acceso seguro válido por 10 minutos.
            </p>
          </div>
          <div className="md:ml-auto relative z-10">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              <Lock size={10} /> Acceso Seguro Activo
            </div>
          </div>
        </div>

        {/* Listado por Módulos */}
        <div className="space-y-12">
          {modulos.map(modulo => {
            const moduloMateriales = filteredMateriales.filter(m => m.modulo_id === modulo.id);
            const isExpanded = expandedModulos.includes(modulo.id);

            if (moduloMateriales.length === 0 && !searchTerm) return null;

            return (
              <section key={modulo.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* Cabecera Unidad */}
                <div 
                  onClick={() => toggleModulo(modulo.id)}
                  className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-sm group hover:border-amber-300 transition-all cursor-pointer mb-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-stone-900 text-amber-500 shadow-lg shadow-stone-200' : 'bg-stone-100 text-stone-400'}`}>
                      <BookOpen size={20}/>
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 italic tracking-tight flex items-center gap-2">
                        {modulo.nombre}
                        <span className="bg-stone-100 text-stone-500 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                          {moduloMateriales.length} {moduloMateriales.length === 1 ? 'Archivo' : 'Archivos'}
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

                {/* Contenedor de Materiales */}
                {isExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    {moduloMateriales.length > 0 ? (
                      moduloMateriales.map(mat => (
                        <MaterialAlumnoCard 
                          key={mat.id} 
                          material={mat} 
                          onView={handleVerArchivo}
                        />
                      ))
                    ) : (
                      <div className="col-span-full py-16 px-8 border-2 border-dashed border-stone-200 rounded-[40px] text-center bg-white/50">
                         <div className="p-4 bg-stone-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 opacity-50">
                            <FileText size={32} className="text-stone-400" />
                         </div>
                         <p className="text-sm italic text-stone-400 font-medium">No hay manuales disponibles en esta unidad.</p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>

      </main>

      {/* FOOTER DE PROTECCIÓN */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
         <div className="inline-flex items-center gap-2 text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] opacity-50">
            <Lock size={12} /> Contenido Protegido • Centro de Reiki 2026
         </div>
      </div>

    </div>
  );
}
