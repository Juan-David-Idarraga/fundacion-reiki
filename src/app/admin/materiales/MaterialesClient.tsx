'use client';
import { UploadCloud, FileText, Trash2, Plus } from 'lucide-react';
import { agregarMaterialAction, eliminarMaterialAction } from "../actions";

export default function MaterialesClient({ modulos, materiales }: { modulos: any[], materiales: any[] }) {
  return (
    <div className="h-full flex flex-col">
      {/* FORMULARIO SUPERIOR */}
      <div className="p-6 bg-white border-b border-stone-100 shadow-sm">
        <form action={agregarMaterialAction} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end max-w-7xl mx-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">Unidad</label>
            <select name="modulo_id" required className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold outline-none">
              <option value="">Selecciona...</option>
              {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">Nombre PDF</label>
            <input name="nombre" required placeholder="Ej: Manual Nivel 1" className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">Archivo</label>
            <input type="file" name="archivo" required accept=".pdf" className="text-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-stone-900 file:text-amber-500 cursor-pointer" />
          </div>
          <button type="submit" className="py-3 bg-stone-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all">
            Subir Material
          </button>
        </form>
      </div>

      {/* LISTADO POR MÓDULOS */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-stone-50/50">
        {modulos.map(modulo => (
          <section key={modulo.id} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
              <FileText size={16} className="text-amber-600" />
              <h3 className="font-bold text-xs uppercase tracking-widest text-stone-900">{modulo.nombre}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materiales.filter(m => m.modulo_id === modulo.id).map(mat => (
                <div key={mat.id} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex justify-between items-center group hover:border-amber-400 transition-all">
                  <span className="text-xs font-bold text-stone-700">{mat.nombre}</span>
                  <form action={eliminarMaterialAction}>
                    <input type="hidden" name="id" value={mat.id} />
                    <input type="hidden" name="ruta" value={mat.ruta_storage} />
                    <button className="text-stone-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                  </form>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}