import React from 'react';
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { 
  Settings, User, Lock, Video, Phone, ShieldCheck, Link2, CheckCircle 
} from 'lucide-react';

export default async function AdminConfiguracionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Obtener el perfil actual del admin
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 2. Obtener los enlaces de configuración global
  const { data: config } = await supabase
    .from('configuracion')
    .select('*')
    .eq('id', 1)
    .single();

  // --- SERVER ACTIONS (FUNCIONES DE GUARDADO) ---

  // Acción 1: Guardar Nombre
  async function actualizarPerfil(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    const nombre = formData.get('nombre') as string;
    if (nombre && nombre.trim()) {
      await supabaseServer.from('perfiles').update({ nombre }).eq('id', user.id);
      revalidatePath('/admin/configuracion');
      revalidatePath('/admin'); 
    }
  }

  // Acción 2: Guardar Enlaces
  async function actualizarEnlaces(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    
    const zoom_link = formData.get('zoom_link') as string;
    const whatsapp_link = formData.get('whatsapp_link') as string;

    if (zoom_link || whatsapp_link) {
      await supabaseServer.from('configuracion').update({ 
        zoom_link: zoom_link || null, 
        whatsapp_link: whatsapp_link || null
      }).eq('id', 1);
      
      revalidatePath('/admin/configuracion');
      revalidatePath('/intranet/sesiones'); // Refresca la vista de los alumnos
    }
  }

  // Acción 3: Cambiar Contraseña
  async function actualizarPassword(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    const password = formData.get('password') as string;

    if (password && password.length >= 6) {
      // Supabase actualiza automáticamente la contraseña del usuario logueado
      await supabaseServer.auth.updateUser({ password: password });
      revalidatePath('/admin/configuracion');
    }
  }

  // --- INTERFAZ VISUAL ---

  return (
    <div className="min-h-screen bg-stone-50 p-6 lg:p-8 font-sans text-stone-800 flex flex-col overflow-y-auto custom-scrollbar">
      
      <header className="shrink-0 mb-8 border-b border-stone-200 pb-6">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 italic flex items-center gap-3 mb-2">
          <Settings className="text-amber-500" size={32} /> Configuración del Sistema
        </h2>
        <p className="text-stone-500 text-xs font-black uppercase tracking-[0.2em]">
          Administra los parámetros de tu academia y tu cuenta.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        
        {/* COLUMNA IZQUIERDA (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 1. FORMULARIO DE PERFIL */}
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 italic">Perfil del Maestro</h3>
                <p className="text-stone-400 text-xs mt-0.5">Actualiza tu información pública</p>
              </div>
            </div>

            <form action={actualizarPerfil} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nombre Público</label>
                  <input 
                    type="text" 
                    name="nombre"
                    defaultValue={perfil?.nombre || ''}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Correo (Solo Lectura)</label>
                  <input 
                    type="email" 
                    disabled
                    defaultValue={user.email}
                    className="w-full bg-stone-100 border border-stone-200 text-stone-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed font-medium"
                  />
                </div>
              </div>
              <div className="flex justify-end border-t border-stone-100 pt-6">
                <button 
                  type="submit" 
                  className="bg-amber-600 text-white font-bold text-sm uppercase tracking-wider py-3 px-8 rounded-xl hover:bg-amber-500 transition-all shadow-md active:scale-[0.98]"
                >
                  <CheckCircle className="inline mr-2" size={16} />
                  Guardar Nombre
                </button>
              </div>
            </form>
          </div>

          {/* 2. FORMULARIO DE SEGURIDAD (CONTRASEÑA) */}
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-50">
              <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 italic">Seguridad de la Cuenta</h3>
                <p className="text-stone-400 text-xs mt-0.5">Cambia tu contraseña regularmente</p>
              </div>
            </div>

            <form action={actualizarPassword} className="flex flex-col gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Nueva Contraseña (Mín. 6 caracteres)
                </label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Escribe tu nueva clave secreta..."
                  required
                  minLength={6}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                />
              </div>
              
              <div className="flex justify-end border-t border-stone-100 pt-4">
                <button 
                  type="submit" 
                  className="bg-stone-900 text-white font-bold text-sm uppercase tracking-wider py-3 px-8 rounded-xl hover:bg-red-600 transition-all shadow-md active:scale-[0.98]"
                >
                  <CheckCircle className="inline mr-2" size={16} />
                  Actualizar Clave
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA (5/12) - FORMULARIO DE ENLACES */}
        <div className="lg:col-span-5 bg-white p-6 lg:p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
          
          <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <ShieldCheck size={200} />
          </div>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100 relative z-10">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
              <Link2 size={20} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 italic">Enlaces de la Academia</h3>
              <p className="text-stone-400 text-xs mt-0.5">Sincronizados con el dashboard de alumnos</p>
            </div>
          </div>

          <form action={actualizarEnlaces} className="flex flex-col gap-6 relative z-10 flex-1">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                <Video size={14} className="text-amber-500" /> Link Sala de Zoom
              </label>
              <input 
                type="url" 
                name="zoom_link"
                defaultValue={config?.zoom_link || ''}
                placeholder="https://zoom.us/j/tu-enlace"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
              />
            </div>
            
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                <Phone size={14} className="text-amber-500" /> WhatsApp de Soporte
              </label>
              <input 
                type="url" 
                name="whatsapp_link"
                defaultValue={config?.whatsapp_link || ''}
                placeholder="https://wa.me/tunúmero"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-stone-100">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-800 font-semibold">
                  💡 Estos enlaces se sincronizarán automáticamente con el Dashboard de los alumnos.
                </p>
              </div>
              <button 
                type="submit" 
                className="w-full bg-amber-600 text-white font-bold text-sm uppercase tracking-wider py-3 rounded-xl hover:bg-amber-500 transition-all shadow-md active:scale-[0.98]"
              >
                <CheckCircle className="inline mr-2" size={16} />
                Guardar Enlaces Oficiales
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
