import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await Promise.resolve(searchParams);

  return (
    // Estructura maestra: flex-col en móviles, flex-row en PC
    <div className="min-h-screen flex flex-col lg:flex-row bg-stone-950 font-sans text-stone-300">
      
      {/* --- LADO IZQUIERDO: Imagen (Oculto en móviles, 50% en PC) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[4000ms]"
          alt="Meditación Reiki"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/20 via-stone-950/60 to-stone-950"></div>
        
        {/* Textos de la imagen (Con paddings reducidos y max-w para que no se rompan) */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-16 w-full max-w-2xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors w-fit group/back">
            <ArrowLeft size={16} className="group-hover/back:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Volver a la web</span>
          </Link>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-stone-900/50 backdrop-blur-md border border-stone-800 px-4 py-2 rounded-full">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-amber-500 text-[9px] font-black uppercase tracking-widest">Plataforma Privada</span>
            </div>
            
            <h1 className="font-serif text-4xl xl:text-5xl font-bold text-white italic leading-tight max-w-sm">
              Bienvenido a tu Espacio de Sanación.
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              Ingresa a la Intranet para acceder a tus clases, manuales PDF y todo el material de tu formación en Reiki.
            </p>
          </div>
          
          <div className="flex items-center gap-3 border-t border-stone-800/50 pt-6 mt-8 shrink-0">
             <ShieldCheck size={24} className="text-stone-600" />
             <div>
               <p className="text-white text-xs font-bold mb-0.5">Acceso 100% Seguro</p>
               <p className="text-stone-500 text-[9px] uppercase tracking-widest">Cifrado de extremo a extremo</p>
             </div>
          </div>
        </div>
      </div>

      {/* --- LADO DERECHO: Formulario (100% en móviles, 50% en PC) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 xl:p-16 relative min-h-screen lg:min-h-0">
        
        {/* Elemento decorativo sutil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Contenedor del form más compacto */}
        <div className="w-full max-w-[400px] relative z-10 flex flex-col">
          
          {/* Logo móvil */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-xs shadow-lg shadow-amber-900/20">
              CR
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-wide">
              Fundación <span className="text-amber-500 italic">Reiki</span>
            </span>
          </div>

          <div className="text-center lg:text-left mb-8 shrink-0">
            <h2 className="text-2xl font-bold text-white mb-1">Iniciar Sesión</h2>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-black">Portal de Alumnos</p>
          </div>

          <form action={loginAction} className="flex flex-col gap-5">
            
            {params.error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold p-3 rounded-xl text-center flex items-center justify-center gap-2">
                <Lock size={14} /> {params.error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 ml-1">Correo Electrónico</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-4 text-stone-500 pointer-events-none" />
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="tu@correo.com"
                    className="w-full bg-stone-900 border border-stone-800 text-white placeholder-stone-600 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 ml-1">Contraseña secreta</label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-4 text-stone-500 pointer-events-none" />
                  <input 
                    name="password"
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full bg-stone-900 border border-stone-800 text-white placeholder-stone-600 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] mt-2 shrink-0"
            >
              Ingresar a la Intranet
            </button>
          </form>

          <p className="text-center text-[9px] text-stone-500 font-medium mt-8 uppercase tracking-widest leading-relaxed shrink-0">
            ¿Problemas para acceder? <br className="sm:hidden" />Contacta a soporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
}
