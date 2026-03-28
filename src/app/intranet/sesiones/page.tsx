import React from 'react';
import Link from 'next/link';
import { createClient } from "@/supabase/server";
import { 
  Video, Calendar, Clock, ExternalLink, 
  Sparkles, ShieldCheck, Play, MessageCircle 
} from 'lucide-react';

export default async function SesionesAlumnoPage() {
  // 1. Conexión a Supabase
  const supabase = await createClient();

  // 2. Traer la configuración global (Enlaces)
  const { data: config } = await supabase
    .from('configuracion')
    .select('zoom_link, whatsapp_link')
    .eq('id', 1)
    .single();

  // 3. Asignar los enlaces (Si están vacíos, usamos "#" por seguridad)
  const zoomLink = config?.zoom_link || "#";
  const whatsappLink = config?.whatsapp_link || "#";

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col p-6 lg:p-12 bg-stone-50 overflow-hidden font-sans">
      
      {/* 1. HEADER */}
      <header className="mb-8 flex-none">
        <h2 className="font-serif text-4xl font-bold text-stone-900 italic tracking-tighter">Mis Sesiones</h2>
        <div className="flex items-center gap-4 mt-2">
          <div className="h-[2px] w-12 bg-amber-500 rounded-full"></div>
          <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.4em]">Encuentros en vivo y sanación</p>
        </div>
      </header>

      {/* 2. AREA CENTRAL */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full max-w-6xl bg-white rounded-[48px] border border-stone-200 shadow-2xl shadow-stone-200/40 overflow-hidden flex flex-col md:flex-row h-full max-h-[550px]">
          
          {/* LADO IZQUIERDO: INFORMACIÓN */}
          <div className="p-10 lg:p-16 w-full md:w-3/5 flex flex-col justify-between bg-white relative">
            <div className="absolute top-0 left-0 p-10 opacity-[0.03] pointer-events-none">
              <Sparkles size={150} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-stone-900 text-amber-500 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest leading-none shadow-lg">Oficial</span>
                <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Formación Reiki Usui</span>
              </div>
              
              <h3 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 italic mb-6 leading-none tracking-tight">
                Clase Grupal de Jueves
              </h3>
              
              <p className="text-stone-500 text-sm leading-relaxed mb-10 max-w-md italic">
                "Un espacio sagrado para profundizar en la técnica, realizar meditaciones guiadas y resolver dudas en tiempo real con Daniel."
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10 border-t border-stone-100 pt-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Día de encuentro</p>
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Calendar size={18} /></div>
                    <span className="text-base font-bold">Cada Jueves</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Horario (Chile)</p>
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Clock size={18} /></div>
                    <span className="text-base font-bold">19:30 HRS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÓN MAESTRO DE ZOOM (AHORA CONECTADO A LA BASE DE DATOS) */}
            <Link 
              href={zoomLink} 
              target="_blank"
              className="group relative bg-stone-900 text-white py-7 rounded-[28px] font-black text-xs md:text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-stone-800 transition-all shadow-2xl shadow-stone-900/20 active:scale-[0.98] overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Play size={24} className="fill-amber-500 text-amber-500" />
              <span className="relative z-10 text-amber-500">Ingresar a Sala Zoom</span>
              <ExternalLink size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* LADO DERECHO: IMAGEN ESPECTACULAR */}
          <div className="w-full md:w-2/5 bg-stone-950 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms]"
              alt="Meditación Reiki"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-stone-950/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Video size={40} className="text-white/20" />
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PROTOCOLO Y SOPORTE (FOOTER) */}
      <footer className="mt-8 flex-none flex flex-col md:flex-row items-center justify-between gap-6 py-4 border-t border-stone-200">
        
        {/* Lado izquierdo del footer: Protocolo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Protocolo</span>
          </div>
          <div className="flex gap-6">
            {["Lugar tranquilo", "Manual a mano", "Cámara activa"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <div className="h-1 w-1 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                <p className="text-[10px] text-stone-500 font-bold italic uppercase tracking-tighter">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lado derecho del footer: Botón de WhatsApp Dinámico */}
        {whatsappLink && whatsappLink !== "#" && (
          <Link 
            href={whatsappLink}
            target="_blank" 
            className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#25D366]/20 transition-colors shadow-sm active:scale-95"
          >
            <MessageCircle size={16} /> Contactar Soporte
          </Link>
        )}

      </footer>
    </div>
  );
}