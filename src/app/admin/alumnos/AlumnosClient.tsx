'use client';

import React from 'react';
import { 
  UserMinus, UserCheck, CalendarPlus, Trash2, 
  Mail, ShieldAlert, Clock, Search, Lock 
} from 'lucide-react';
import { formatDateLatam, getExpirationStatus } from '@/utils/date-format';
// Importamos la acción de registro junto a las demás
import { 
  actualizarEstadoAlumnoAction, 
  extenderAccesoAction, 
  eliminarAlumnoAction,
  registrarAlumnoAction 
} from "../actions";

export default function AlumnosClient({ alumnos }: { alumnos: any[] }) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col xl:flex-row">
      
      {/* ================= LISTADO DE ALUMNOS ================= */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-stone-900 font-serif uppercase tracking-tight">Comunidad de Estudiantes</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              placeholder="Buscar alumno..." 
              className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full text-xs outline-none focus:border-amber-500 w-64 shadow-sm" 
            />
          </div>
        </div>

        <div className="grid gap-4">
          {alumnos.map((alumno) => (
            <div key={alumno.id} className={`bg-white p-6 rounded-[24px] border transition-all shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 ${alumno.estado === 'suspendido' ? 'border-red-100 opacity-75' : 'border-stone-200 hover:border-amber-200'}`}>
              
              <div className="flex items-center gap-4 flex-1">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg ${alumno.estado === 'suspendido' ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-600'}`}>
                  {alumno.nombre ? alumno.nombre.substring(0, 2).toUpperCase() : '??'}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 flex items-center gap-2">
                    {alumno.nombre}
                    {alumno.estado === 'suspendido' && <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase">Acceso Cortado</span>}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs text-stone-400 flex items-center gap-1"><Mail size={12}/> {alumno.email}</p>
                    {(() => {
                      const status = getExpirationStatus(alumno.vencimiento);
                      return (
                        <p className={`text-xs font-bold flex items-center gap-1 ${status.color}`}>
                          <Clock size={12}/> {status.message}
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* BOTONES DE ADMINISTRACIÓN */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Busca este bloque en tu AlumnosClient.tsx y reemplázalo */}
                <form 
  action={extenderAccesoAction} 
  onSubmit={(e) => { if(!confirm('¿Estás seguro de extender 30 días de acceso a este alumno?')) e.preventDefault(); }}
>
  <input type="hidden" name="id" value={alumno.id} />
  <input type="hidden" name="dias" value="30" />
  <button title="Extender acceso 30 días" className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 text-xs font-bold hover:bg-amber-100 transition-all">
    <CalendarPlus size={16}/> +30 Días
  </button>
</form>

                <form action={actualizarEstadoAlumnoAction}>
                  <input type="hidden" name="id" value={alumno.id} />
                  <input type="hidden" name="estado" value={alumno.estado === 'activo' ? 'suspendido' : 'activo'} />
                  <button className={`p-2 rounded-xl border transition-all ${alumno.estado === 'activo' ? 'bg-white border-stone-200 text-stone-400 hover:text-red-600' : 'bg-red-600 text-white border-red-600 hover:bg-red-700'}`}>
                    {alumno.estado === 'activo' ? <UserMinus size={18}/> : <UserCheck size={18}/>}
                  </button>
                </form>

                <form action={eliminarAlumnoAction} onSubmit={(e) => { if(!confirm('¿Eliminar alumno? Se borrará su acceso de seguridad también.')) e.preventDefault(); }}>
                  <input type="hidden" name="id" value={alumno.id} />
                  <button className="p-2 text-stone-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={18}/>
                  </button>
                </form>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= ASIDE: REGISTRO RÁPIDO ================= */}
      <aside className="w-full xl:w-[350px] bg-white border-l border-stone-200 p-8 space-y-8 shrink-0">
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
          <h2 className="font-bold flex items-center gap-2 text-stone-900 mb-4"><ShieldAlert size={18} className="text-amber-600"/> Registrar Alumno</h2>
          <p className="text-[10px] text-stone-500 leading-relaxed mb-6 italic">
            Al dar de alta, el sistema crea la cuenta de acceso y asigna los primeros 30 días automáticamente.
          </p>
          
          {/* FORMULARIO CONECTADO */}
          <form action={registrarAlumnoAction} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nombre Completo</label>
              <input 
                name="nombre" 
                required 
                placeholder="Ej. Juan Pérez" 
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="alumno@correo.com" 
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Contraseña Inicial</label>
              <div className="relative">
                <input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="Mínimo 6 caracteres" 
                  className="w-full p-3 pl-10 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500" 
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" size={14} />
              </div>
            </div>
            
            <button className="w-full py-4 bg-stone-900 text-white rounded-2xl text-xs font-bold hover:bg-stone-800 shadow-xl transition-all active:scale-95">
              Dar de Alta e Iniciar Acceso
            </button>
          </form>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
          <Clock className="text-blue-500 shrink-0" size={16} />
          <p className="text-[10px] text-blue-700 leading-relaxed">
            <strong>Maestro Daniel:</strong> Una vez creado, dale el correo y la clave al alumno para que entre a su Intranet.
          </p>
        </div>
      </aside>
    </div>
  );
}