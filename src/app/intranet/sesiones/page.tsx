import React from 'react';
import Link from 'next/link';
import { createClient } from "@/supabase/server";
import { 
  Video, Calendar, Clock, ExternalLink, 
  Sparkles, ShieldCheck, Play, MessageCircle 
} from 'lucide-react';

export default async function SesionesAlumnoPage() {
  const supabase = await createClient();

  const { data: config } = await supabase
    .from('configuracion')
    .select('zoom_link, whatsapp_link')
    .eq('id', 1)
    .single();

  const zoomLink = config?.zoom_link || "#";
  const whatsappLink = config?.whatsapp_link || "#";

  return (
    <div className="min-h-screen bg-[#F9F6F0] font-sans overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-amber-500" />
          <p className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em]">Encuentros en Vivo</p>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 italic tracking-tight leading-none">
          Mis Sesiones
        </h2>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-6 pb-12">
        
        {/* Tarjeta principal de la sesión */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden flex flex-col md:flex-row">
          
          {/* Lado izquierdo: Información */}
          <div className="p-6 lg:p-8 w-full md:w-3/5 flex flex-col justify-between relative">
            <div className="absolute top-0 left-0 p-6 opacity-[0.02] pointer-events-none">
              <Sparkles size={100} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-stone-900 text-amber-500 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Oficial</span>
                <span className="text-stone-400 text-[9px] font-black uppercase tracking-widest">Formación Reiki Usui</span>
              </div>
              
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 italic mb-3 leading-tight tracking-tight">
                Clase Grupal de Jueves
              </h3>
              
              <p className="text-stone-500 text-xs leading-relaxed mb-6 max-w-md italic">
                "Un espacio sagrado para profundizar en la técnica, realizar meditaciones guiadas y resolver dudas en tiempo real con Daniel."
              </p>

              <div className="grid grid-cols-2 gap-6 mb-6 border-t border-stone-100 pt-5">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Día de encuentro</p>
                  <div className="flex items-center gap-2 text-stone-800">
                    <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600"><Calendar size={14} /></div>
                    <span className="text-sm font-bold">Cada Jueves</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Horario (Chile)</p>
                  <div className="flex items-center gap-2 text-stone-800">
                    <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600"><Clock size={14} /></div>
                    <span className="text-sm font-bold">19:30 HRS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Zoom */}
            <Link 
              href={zoomLink} 
              target="_blank"
              className="group relative bg-stone-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Play size={18} className="fill-amber-500 text-amber-500" />
              <span className="relative z-10 text-amber-500">Ingresar a Sala Zoom</span>
              <ExternalLink size={14} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Lado derecho: Imagen */}
          <div className="w-full md:w-2/5 bg-stone-950 relative overflow-hidden min-h-[200px] md:min-h-0">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              alt="Meditación Reiki"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-stone-950/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Video size={28} className="text-white/20" />
               </div>
            </div>
          </div>
        </div>

        {/* Protocolo y Soporte */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-stone-400">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Protocolo</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Lugar tranquilo", "Manual a mano", "Cámara activa"].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <div className="h-1 w-1 bg-amber-500 rounded-full shadow-[0_0_6px_rgba(245,158,11,0.5)]"></div>
                  <p className="text-[9px] text-stone-500 font-bold italic uppercase tracking-tighter">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {whatsappLink && whatsappLink !== "#" && (
            <Link 
              href={whatsappLink}
              target="_blank" 
              className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#25D366]/20 transition-colors active:scale-95 shrink-0"
            >
              <MessageCircle size={14} /> Contactar Soporte
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
