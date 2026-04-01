'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const waNumber = "56951735495";
  const msgGeneral = encodeURI("Hola Daniel, me gustaría obtener más información sobre tus terapias y formaciones.");
  const msgReiki = encodeURI("Hola Daniel, me gustaría agendar una sesión de Reiki Usui.");
  const msgMasaje = encodeURI("Hola Daniel, me gustaría agendar un Masaje Terapéutico.");
  const msgCurso = encodeURI("Hola Daniel, me gustaría inscribirme y asegurar mi cupo en el Curso de Reiki Nivel 1 y 2.");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 selection:bg-amber-200 selection:text-stone-900 scroll-smooth overflow-x-hidden">
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav 
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-2.5 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 flex items-center justify-center text-amber-950 font-serif font-bold text-[10px] shadow-sm border border-amber-100 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              CR
            </div>
            <span className={`font-serif text-lg font-bold tracking-wide transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-stone-900' : 'text-white'}`}>
              Centro de <span className="text-amber-500">Reiki</span>
            </span>
          </div>

          <div className={`hidden lg:flex gap-6 text-xs md:text-sm font-semibold transition-colors duration-300 ${isScrolled ? 'text-stone-600' : 'text-stone-200'}`}>
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                className="relative py-1 transition-colors hover:text-amber-500 group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-500 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link href="/login" className={`text-xs md:text-sm font-bold transition-all hover:text-amber-500 hover:-translate-y-0.5 ${isScrolled ? 'text-stone-600' : 'text-white'}`}>
              Acceso Alumnos
            </Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="relative overflow-hidden rounded-full bg-amber-600 px-5 py-2 text-xs md:text-sm font-bold text-white transition-all duration-300 hover:bg-amber-500 hover:scale-105 hover:shadow-md group">
              <span className="relative z-10">Agendar Cita</span>
            </Link>
          </div>

          <button 
            className={`lg:hidden p-1.5 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-stone-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="flex flex-col gap-3 pt-3 pb-4 lg:hidden border-t border-stone-100 mt-3 animate-fade-in-up">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-stone-600 text-sm font-semibold hover:text-amber-600 hover:translate-x-1 transition-transform"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-stone-100 my-1"></div>
            <Link href="/login" className="text-amber-600 text-sm font-bold">Acceso Alumnos</Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-md mt-1 active:scale-95 transition-transform">
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ================= SECCIÓN 1: HERO (BUG CORREGIDO) ================= */}
      {/* CORRECCIÓN AQUÍ: 
        Cambiamos `h-screen` por `min-h-[100svh]` y añadimos `pt-32 lg:pt-40`.
        Esto garantiza que SIEMPRE haya espacio arriba y que la portada cubra toda la pantalla,
        sin importar si la laptop es muy pequeña o si el navegador tiene muchas barras abiertas.
      */}
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 lg:pt-40 pb-16 text-center">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
           {/* Asegúrate de que tu imagen se llame exactamente como la pusiste en la carpeta public */}
           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/banner-reiki.png')" }}></div>
           <div className="absolute inset-0 bg-stone-950/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6 lg:space-y-8 animate-fade-in-up">
          <span className="inline-block rounded-full border border-amber-500/50 bg-stone-950/50 backdrop-blur-md px-5 py-2 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase shadow-lg">
            Sanación & Desarrollo Espiritual
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white drop-shadow-lg">
            Renueva tu Energía con <br/>
            <span className="text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)] mt-2 inline-block">Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base md:text-xl leading-relaxed text-stone-300 font-light drop-shadow-md">
            Un puente para entregar amor, armonía y sanación. Te ayudo a reconectarte con tu esencia y abrir la puerta hacia una vida más plena y equilibrada.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-amber-900/50 transition-all hover:-translate-y-1 hover:bg-amber-500 sm:w-auto">
              Escríbeme sin compromiso
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* ================= SECCIÓN 2: VIDEO ================= */}
      <section id="video-intro" className="py-12 md:py-16 px-6 lg:px-10 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">El poder de la Energía Vital</h2>
            <p className="text-stone-600 max-w-lg mx-auto text-sm md:text-base font-light">Conoce cómo el Reiki puede transformar tu vida y equilibrar tu energía.</p>
          </div>
          
          <div className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-[1rem] bg-stone-900 shadow-[0_20px_40px_rgba(217,119,6,0.15)] border border-amber-200/50 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:shadow-[0_25px_50px_rgba(217,119,6,0.25)] hover:-translate-y-1">
            <div className="absolute inset-0 bg-stone-800 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="text-amber-100 flex flex-col items-center transition-transform duration-300 group-hover:scale-105 relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-600/30 rounded-full flex items-center justify-center mb-3 text-white transition-all duration-300 group-hover:shadow-amber-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium tracking-wide text-[11px] md:text-xs text-amber-100 group-hover:text-white transition-colors duration-300">Reproducir Introducción</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: TERAPIAS ================= */}
      <section id="terapias" className="py-16 md:py-20 px-6 lg:px-10 bg-stone-950 relative overflow-hidden border-y border-stone-800">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-md">Terapias Energéticas</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base font-light">Acompañamiento personalizado para restaurar tu equilibrio integral.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* TARJETA REIKI */}
            <div className="group bg-stone-900/60 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] shadow-2xl border border-stone-700/50 flex flex-col transition-all duration-300 hover:border-amber-500/30 hover:bg-stone-900/80 hover:-translate-y-1 relative overflow-hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-900/40 to-amber-600/20 rounded-lg flex items-center justify-center text-amber-500 mb-4 border border-amber-700/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Reiki Usui</h3>
              <p className="text-amber-500 font-bold text-[10px] tracking-widest uppercase mb-4">Presencial y a Distancia</p>
              
              <div className="flex items-end gap-1.5 mb-4">
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">$25.000</div>
                <div className="text-stone-400 mb-1 text-xs font-medium">/ sesión</div>
              </div>
              <div className="bg-amber-900/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-md mb-6 inline-block w-fit border border-amber-700/50">
                ⭐ Pack 2 sesiones: $35.000
              </div>
              
              <ul className="space-y-3 text-stone-300 flex-grow text-xs md:text-sm">
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Limpieza energética (Personas/Lugares)</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Alineación de chakras (Péndulo)</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Liberación de emociones negativas</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Sanación del niño interior</li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="mt-8 flex items-center justify-center gap-2 w-full rounded-lg bg-amber-600/20 px-4 py-2.5 text-xs md:text-sm font-bold text-amber-400 border border-amber-500/30 transition-all hover:bg-amber-600 hover:text-white hover:border-amber-600 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Sesión
              </Link>
            </div>

            {/* TARJETA MASAJES */}
            <div className="group bg-stone-900/60 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] shadow-2xl border border-stone-700/50 flex flex-col transition-all duration-300 hover:border-amber-500/30 hover:bg-stone-900/80 hover:-translate-y-1 relative overflow-hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-700 rounded-lg flex items-center justify-center text-stone-300 mb-4 border border-stone-600 shadow-sm group-hover:text-amber-500 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Masajes Terapéuticos</h3>
              <p className="text-stone-400 font-bold text-[10px] tracking-widest uppercase mb-4 group-hover:text-amber-500 transition-colors duration-300">Enfoque Holístico</p>
              
              <div className="flex items-end gap-1.5 mb-6 lg:mb-[4rem]">
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">$20.000</div>
                <div className="text-stone-400 mb-1 text-xs font-medium">/ sesión</div>
              </div>
              
              <ul className="space-y-3 text-stone-300 flex-grow text-xs md:text-sm">
                <li className="flex items-start gap-2"><span className="text-stone-500 group-hover:text-amber-500 transition-colors duration-300 shrink-0">✦</span> Masaje Descontracturante</li>
                <li className="flex items-start gap-2"><span className="text-stone-500 group-hover:text-amber-500 transition-colors duration-300 shrink-0">✦</span> Masaje Relajante</li>
                <li className="flex items-start gap-2"><span className="text-stone-500 group-hover:text-amber-500 transition-colors duration-300 shrink-0">✦</span> Sonoterapia con cuencos</li>
                <li className="flex items-start gap-2"><span className="text-stone-500 group-hover:text-amber-500 transition-colors duration-300 shrink-0">✦</span> Trabajo personalizado</li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="mt-8 flex items-center justify-center gap-2 w-full rounded-lg bg-stone-700/40 px-4 py-2.5 text-xs md:text-sm font-bold text-stone-300 border border-stone-600/50 transition-all hover:bg-stone-600 hover:text-white group-hover:border-amber-500/30 group-hover:text-amber-400 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Masaje
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: FORMACIONES ================= */}
      <section id="formaciones" className="py-12 md:py-16 px-6 lg:px-10 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 bg-white/50 backdrop-blur-sm inline-block px-4 py-1 rounded-xl">Formación Completa</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white/80 backdrop-blur-md rounded-[1.5rem] p-5 lg:p-6 border border-stone-200/80 shadow-xl shadow-stone-200/50">
            
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="aspect-video w-full bg-stone-200 rounded-[1rem] flex items-center justify-center text-stone-400 overflow-hidden relative shadow-inner">
                <span className="font-medium tracking-wide text-xs">[ Foto Clase / Alumnos ]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900 text-xs mb-0.5">Duración</span>
                    <span className="text-stone-500 font-medium text-[11px]">2 Meses</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900 text-xs mb-0.5">Horario</span>
                    <span className="text-stone-500 font-medium text-[11px]">Jueves 19:30 - 21:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-50 p-6 md:p-8 rounded-[1rem] shadow-inner border border-stone-200/60 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-4 right-4 bg-red-100 text-red-700 text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest border border-red-200">
                Cupos Limitados
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 mb-1 mt-2">Curso Reiki</h3>
              <p className="text-amber-600 font-bold text-xs mb-5 tracking-widest uppercase">NIVEL 1 + NIVEL 2</p>
              <div className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-6 tracking-tighter">$80.000</div>
              
              <ul className="space-y-3 text-stone-600 mb-6 flex-grow text-xs md:text-sm">
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold mt-0.5">✓</span> Material completo y Diploma</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold mt-0.5">✓</span> Iniciación Energética</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold mt-0.5">✓</span> Horas Teórico-Prácticas</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold mt-0.5">✓</span> Historia, Chakras y Ética</li>
              </ul>
              
              <Link href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                Asegura tu cupo por WhatsApp
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 5: SOBRE EL MAESTRO ================= */}
      <section id="el-maestro" className="py-12 md:py-16 px-6 lg:px-10 bg-stone-900 text-stone-300 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
          
          <div className="w-full lg:w-1/3 flex flex-col items-center text-center space-y-5 shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-stone-800 shadow-lg flex items-center justify-center text-stone-500 overflow-hidden border-[3px] border-stone-800 relative ring-2 ring-amber-900/20">
               <span className="relative z-10 font-medium tracking-wide text-[10px] md:text-xs">[ Foto Daniel ]</span>
            </div>
            
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Daniel Riquelme</h2>
              <p className="text-amber-500 font-bold tracking-widest uppercase mt-1 text-[10px] md:text-xs">Maestro Reiki</p>
            </div>

            <div className="bg-stone-800/60 p-5 rounded-xl border border-stone-700/50 w-full text-left space-y-3 shadow-md text-xs md:text-sm">
               <div className="flex items-start gap-2">
                  <span className="text-amber-500">✦</span>
                  <p className="text-stone-300"><strong>Verificado por:</strong> Fundación Chilena de Reiki.</p>
               </div>
               <div className="flex items-start gap-2">
                  <span className="text-amber-500">✦</span>
                  <p className="text-stone-300"><strong>Estado:</strong> Membresía Activa.</p>
               </div>
               <div className="flex items-start gap-2">
                  <span className="text-amber-500">✦</span>
                  <p className="text-stone-300">Terapeuta Reiki y estudiante de TENS.</p>
               </div>
               <div className="flex items-start gap-2">
                  <span className="text-amber-500">✦</span>
                  <p className="text-stone-300"><strong>Atención:</strong> Presencial (Rancagua) y Online.</p>
               </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 space-y-6 md:space-y-8 leading-relaxed text-sm md:text-base font-light">
            <div className="space-y-3">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-6 md:w-8 h-px bg-amber-500 rounded-full"></div> Mi Camino
              </h3>
              <p className="text-stone-300">
                Mi recorrido comenzó con la Maestría en Reiki Kundalini, avalada por el Centro Americano de Terapeutas Holísticos. Este fue mi primer gran despertar, una experiencia que abrió mi corazón y me permitió comprender la fuerza transformadora de la energía universal.
              </p>
              <p className="text-stone-300">
                Movido por ese llamado, continué mi formación en la Fundación Chilena de Reiki, donde profundicé en la esencia del Reiki Usui hasta alcanzar el nivel de <strong>Maestro (Nivel 4)</strong>. Cada aprendizaje, práctica y sesión nutrieron mi camino.
              </p>
            </div>

            <div className="bg-gradient-to-br from-stone-800/80 to-stone-900 p-6 md:p-8 rounded-[1.5rem] shadow-lg border border-stone-700/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <h4 className="font-serif text-lg md:text-xl font-bold text-white mb-3">¿Qué esperar de mí?</h4>
              <p className="mb-4 text-stone-300 text-xs md:text-sm">
                Quienes llegan a mí encuentran un espacio seguro, de respeto y contención. En cada terapia entrego un acompañamiento enfocado en:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 mb-5 font-medium text-stone-200 text-xs md:text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Liberar bloqueos</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Equilibrar la energía</li>
                <li className="flex items-center gap-2 sm:col-span-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Abrir caminos hacia la serenidad</li>
              </ul>
              <blockquote className="italic text-stone-400 border-t border-stone-700 pt-3 text-[11px] md:text-xs">
                "Pueden esperar de mí profesionalismo, ética y dedicación, con el propósito de guiarlos en un viaje hacia la sanación y el reencuentro con su verdadera esencia."
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PIE DE PÁGINA ================= */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-6 lg:px-10 text-xs border-t-4 border-amber-600">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-2">
              <div className="h-7 w-7 rounded-full bg-amber-900 flex items-center justify-center text-amber-500 font-serif font-bold text-[10px]">CR</div>
              <span className="font-serif text-lg md:text-xl font-bold text-white">Centro de Reiki</span>
            </div>
            <p className="text-stone-400 max-w-sm mx-auto lg:mx-0 text-xs leading-relaxed">
              Sanación energética integral desde el Reiki. Agenda abierta, cupos limitados cada semana. Transformando energías, sanando vidas.
            </p>
          </div>

          <div className="lg:col-span-7 bg-stone-900 p-5 md:p-6 rounded-xl border border-stone-800 text-stone-300 shadow-lg">
            <h4 className="font-serif text-base md:text-lg text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
              Política de Sesiones
            </h4>
            <div className="grid md:grid-cols-2 gap-5 text-[11px] md:text-xs leading-relaxed">
              <div>
                <strong className="text-amber-500 block mb-1 uppercase tracking-widest text-[9px]">Reserva y Pago</strong>
                <p className="text-stone-400">Las sesiones se reservan con pago previo. Una vez confirmado el pago, tu hora queda oficialmente agendada.</p>
              </div>
              <div>
                <strong className="text-amber-500 block mb-1 uppercase tracking-widest text-[9px]">Puntualidad</strong>
                <p className="text-stone-400">Si no asistes o no te conectas a la hora acordada, <span className="text-white font-bold">no habrá devolución</span>, ya que el espacio fue reservado para ti.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-800 pt-6 text-[10px] md:text-[11px]">
<p className="text-stone-500 font-medium" suppressHydrationWarning>
  © {new Date().getFullYear()} Daniel Riquelme B. Todos los derechos reservados.
</p>          <p className="text-amber-600/60 font-serif italic tracking-wider">"Reiki consciente para la sanación integral del ser."</p>
        </div>
      </footer>

    </div>
  );
}