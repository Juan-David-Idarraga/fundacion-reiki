import React from 'react';
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { Bell, Calendar, Trash2, Pin, PlusCircle } from 'lucide-react';

export default async function AdminAvisosPage() {
  const supabase = await createClient();

  // Traer los avisos actuales (ordenados por el más reciente)
  const { data: avisos } = await supabase
    .from('avisos')
    .select('*')
    .order('created_at', { ascending: false });

  // --- SERVER ACTIONS (Lógica de Base de Datos) ---
  
  async function crearAviso(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    
    const titulo = formData.get('titulo') as string;
    const mensaje = formData.get('mensaje') as string;
    const fechaExpiracion = formData.get('fecha_expiracion') as string;

    if (!titulo || !mensaje || !fechaExpiracion) return;

    await supabaseServer.from('avisos').insert({
      titulo,
      mensaje,
      fecha_expiracion: new Date(fechaExpiracion).toISOString(),
    });

    revalidatePath('/admin/avisos'); // Recarga esta página
    revalidatePath('/intranet'); // Actualiza la vista de los alumnos
  }

  async function borrarAviso(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    const id = formData.get('id') as string;

    if (!id) return;

    await supabaseServer.from('avisos').delete().eq('id', id);
    
    revalidatePath('/admin/avisos');
    revalidatePath('/intranet');
  }

  // --- INTERFAZ VISUAL ---

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-stone-800 pb-20">
      
      <header className="mb-10 border-b border-stone-200 pb-6">
        <h2 className="font-serif text-3xl font-bold text-stone-900 italic flex items-center gap-3">
          <Bell className="text-amber-500" /> Tablón de Comunicados
        </h2>
        <p className="text-stone-500 text-sm mt-2 font-medium">Crea, edita y administra los avisos que verán tus alumnos.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO (5 de 12) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[32px] border border-stone-200 shadow-xl shadow-stone-100/50">
          <div className="flex items-center gap-2 mb-6">
            <PlusCircle size={20} className="text-amber-600" />
            <h3 className="font-bold text-stone-900 text-lg">Publicar Nuevo Aviso</h3>
          </div>

          <form action={crearAviso} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Título del Aviso</label>
              <input 
                type="text" 
                name="titulo"
                required
                placeholder="Ej: Suspensión de clase, Nuevo Material..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Mensaje</label>
              <textarea 
                name="mensaje"
                required
                rows={4}
                placeholder="Escribe el detalle del comunicado aquí..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none font-medium custom-scrollbar"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Visible Hasta (Vencimiento)</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="fecha_expiracion"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium appearance-none"
                />
                <Calendar size={16} className="absolute right-4 top-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-900 text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-stone-800 transition-colors shadow-lg active:scale-[0.98]"
            >
              Publicar Aviso
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: HISTORIAL DE AVISOS (7 de 12) */}
        <div className="lg:col-span-7">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6 px-2">Historial de Comunicados</h3>
          
          <div className="space-y-4">
            {avisos && avisos.length > 0 ? (
              avisos.map((aviso) => {
                const isExpirado = new Date(aviso.fecha_expiracion) < new Date();
                
                return (
                  <div key={aviso.id} className={`bg-white p-6 rounded-[24px] border transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden group ${isExpirado ? 'border-stone-100 opacity-60' : 'border-stone-200 shadow-sm hover:border-amber-300'}`}>
                    
                    {/* Icono decorativo */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                       <Pin size={40} className="text-stone-900 -rotate-45" />
                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${isExpirado ? 'bg-stone-100 text-stone-400' : 'bg-amber-100 text-amber-700'}`}>
                          {isExpirado ? 'Expirado' : 'Activo'}
                        </span>
                        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                          Expira: {new Date(aviso.fecha_expiracion).toLocaleDateString('es-CL')}
                        </span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-lg mb-1">{aviso.titulo}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">{aviso.mensaje}</p>
                    </div>

                    {/* Botón Eliminar */}
                    <div className="shrink-0 flex items-center border-t sm:border-t-0 sm:border-l border-stone-100 pt-4 sm:pt-0 sm:pl-6 relative z-10">
                      <form action={borrarAviso}>
                        <input type="hidden" name="id" value={aviso.id} />
                        <button 
                          type="submit"
                          className="text-stone-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg flex flex-col items-center gap-1 group/btn"
                          title="Eliminar aviso"
                        >
                          <Trash2 size={20} />
                          <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Borrar</span>
                        </button>
                      </form>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-[32px] border border-stone-200 border-dashed p-12 flex flex-col items-center justify-center text-center text-stone-400">
                <Bell size={40} className="mb-4 opacity-20" />
                <p className="font-serif text-xl font-bold text-stone-800 italic">No hay avisos</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Crea tu primer comunicado en el panel izquierdo.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}