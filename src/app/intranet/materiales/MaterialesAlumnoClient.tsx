'use client';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { createClient } from '@/supabase/client';

export default function MaterialesAlumnoClient({ modulos, materiales }: { modulos: any[], materiales: any[] }) {
  const supabase = createClient();

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

  return (
    <div className="space-y-12 pb-20">
      {/* Aviso de seguridad */}
      <div className="bg-stone-900 text-stone-400 p-6 rounded-[32px] flex items-center gap-5 shadow-xl">
        <div className="h-12 w-12 bg-amber-500 rounded-2xl flex items-center justify-center text-stone-950 shadow-lg shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Contenido Exclusivo</h4>
          <p className="text-[10px] leading-relaxed mt-1 italic">
            Para proteger tu formación, los enlaces de acceso son temporales y personales.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modulos.map(modulo => {
          const docsModulo = materiales.filter(m => m.modulo_id === modulo.id);
          if (docsModulo.length === 0) return null;

          return (
            <section key={modulo.id} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2 ml-2">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{modulo.nombre}</span>
              </div>

              <div className="space-y-3">
                {docsModulo.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => handleVerArchivo(mat.url_archivo)}
                    className="w-full bg-white p-5 rounded-[28px] border border-stone-100 shadow-sm flex justify-between items-center group hover:border-amber-400 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800 uppercase tracking-widest leading-none mb-1">{mat.nombre}</p>
                        <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter">Documento PDF Oficial</p>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-stone-200 group-hover:text-amber-500 transition-colors mr-2" />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}