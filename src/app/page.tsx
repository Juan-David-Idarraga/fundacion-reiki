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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 font-sans text-stone-800 selection:bg-amber-200 selection:text-stone-900 scroll-smooth overflow-x-hidden">
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav 
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-3 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-100/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-amber-950 font-serif font-bold text-sm shadow-lg shadow-amber-500/30 border border-amber-200 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              CR
            </div>
            <span className={`font-serif text-lg font-bold tracking-wide transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-stone-900' : 'text-white'}`}>
              Fundación <span className="text-amber-600">Reiki</span>
            </span>
          </div>

          <div className={`hidden lg:flex gap-8 text-sm font-semibold transition-colors duration-300 ${isScrolled ? 'text-stone-700' : 'text-stone-100'}`}>
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                className="relative py-1 transition-colors hover:text-amber-600 group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-amber-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link href="/login" className={`text-sm font-bold transition-all hover:text-amber-600 hover:-translate-y-0.5 ${isScrolled ? 'text-stone-700' : 'text-white'}`}>
              Acceso Alumnos
            </Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-600/60 hover:scale-105 group">
              <span className="relative z-10">Agendar Cita</span>
            </Link>
          </div>

          <button 
            className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-stone-900' : 'text-white'}`}
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
          <div className="flex flex-col gap-4 pt-4 pb-5 lg:hidden border-t border-amber-100 mt-4 animate-fade-in-up">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-stone-700 text-sm font-semibold hover:text-amber-600 hover:translate-x-1 transition-transform"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-amber-100 my-2"></div>
            <Link href="/login" className="text-amber-600 text-sm font-bold">Acceso Alumnos</Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-lg mt-2 active:scale-95 transition-transform">
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ================= SECCIÓN 1: HERO ================= */}
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 lg:pt-40 pb-16 text-center">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/banner-reiki.png')" }} role="img" aria-label="Fondo de meditación y sanación Reiki"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/50 to-stone-950/70"></div>
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-400/5 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6 lg:space-y-8 animate-fade-in-up">
          <span className="inline-block rounded-full border border-amber-400/60 bg-amber-950/40 backdrop-blur-md px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-amber-300 uppercase shadow-lg shadow-amber-900/30">
            ✨ Sanación & Transformación Espiritual
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white drop-shadow-lg">
            Renueva tu Energía <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">con Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-stone-200 font-light drop-shadow-md">
            Un puente para entregar amor, armonía y sanación. Te ayudo a reconectarte con tu esencia y abrir la puerta hacia una vida más plena, equilibrada y llena de propósito.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-amber-900/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-600/60 sm:w-auto">
              Escríbeme sin compromiso
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#terapias" className="group flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400/50 px-8 py-4 text-base font-bold text-white transition-all hover:border-amber-400 hover:bg-white/5 hover:-translate-y-1">
              Conocer Servicios
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-y-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* ================= SECCIÓN 2: VIDEO ================= */}
      <section id="video-intro" className="py-16 md:py-24 px-6 lg:px-10 bg-gradient-to-b from-stone-50 to-amber-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/15 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10 relative z-10">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">El Poder de la Energía Vital</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg font-light">Descubre cómo el Reiki puede transformar tu vida, equilibrar tu energía y conectarte con tu verdadera esencia.</p>
          </div>
          
          <div className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 shadow-2xl shadow-amber-500/20 border-2 border-amber-200/30 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-2">
            <div className="absolute inset-0 bg-stone-800 opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="text-amber-100 flex flex-col items-center transition-transform duration-300 group-hover:scale-110 relative z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-600/50 rounded-full flex items-center justify-center mb-4 text-white transition-all duration-300 group-hover:shadow-amber-500/70 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold tracking-wide text-sm md:text-base text-amber-100 group-hover:text-white transition-colors duration-300">Reproducir Introducción</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: TERAPIAS ================= */}
      <section id="terapias" className="py-16 md:py-24 px-6 lg:px-10 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 relative overflow-hidden border-y border-amber-900/30">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-md">Terapias Energéticas</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"></div>
            <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg font-light">Acompañamiento personalizado para restaurar tu equilibrio integral y reconectar con tu verdadera esencia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* TARJETA REIKI */}
            <div className="group bg-gradient-to-br from-amber-950/40 to-stone-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl shadow-amber-900/30 border border-amber-600/30 flex flex-col transition-all duration-300 hover:border-amber-500/60 hover:from-amber-900/50 hover:to-stone-900/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-600/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-xl flex items-center justify-center text-amber-300 mb-6 border border-amber-500/50 shadow-lg shadow-amber-600/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">Reiki Usui</h3>
              <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-6">Presencial y a Distancia</p>
              
              <div className="flex items-end gap-2 mb-4">
                <div className="text-4xl md:text-5xl font-extrabold text-amber-300 tracking-tighter">$25.000</div>
                <div className="text-stone-400 mb-1 text-sm font-medium">/ sesión</div>
              </div>
              <div className="bg-amber-900/50 text-amber-300 text-xs font-bold px-4 py-2 rounded-lg mb-8 inline-block w-fit border border-amber-600/50 shadow-lg shadow-amber-900/30">
                ⭐ Pack 2 sesiones: $35.000
              </div>
              
              <ul className="space-y-3 text-stone-300 flex-grow text-sm md:text-base mb-8">
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-lg">✦</span> <span>Limpieza energética (Personas/Lugares)</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-lg">✦</span> <span>Alineación de chakras (Péndulo)</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-lg">✦</span> <span>Liberación de emociones negativas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-lg">✦</span> <span>Sanación del niño interior</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/20 px-6 py-3 text-sm md:text-base font-bold text-amber-300 border border-amber-500/40 transition-all hover:from-amber-600 hover:to-amber-500 hover:text-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-600/30 relative z-10 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Sesión
              </Link>
            </div>

            {/* TARJETA MASAJES */}
            <div className="group bg-gradient-to-br from-stone-800/50 to-stone-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl shadow-stone-900/40 border border-stone-700/40 flex flex-col transition-all duration-300 hover:border-stone-600/70 hover:from-stone-800/60 hover:to-stone-900/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-gradient-to-br from-stone-700/40 to-stone-600/20 rounded-xl flex items-center justify-center text-stone-300 mb-6 border border-stone-600/50 shadow-lg shadow-stone-700/20 group-hover:shadow-stone-600/40 group-hover:text-amber-400 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-stone-100 transition-colors duration-300">Masajes Terapéuticos</h3>
              <p className="text-stone-400 font-bold text-xs tracking-widest uppercase mb-6 group-hover:text-amber-400 transition-colors duration-300">Enfoque Holístico</p>
              
              <div className="flex items-end gap-2 mb-4">
                <div className="text-4xl md:text-5xl font-extrabold text-stone-200 tracking-tighter">$20.000</div>
                <div className="text-stone-500 mb-1 text-sm font-medium">/ sesión</div>
              </div>
              
              <ul className="space-y-3 text-stone-400 flex-grow text-sm md:text-base mb-8">
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-lg">✦</span> <span>Masaje Descontracturante</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-lg">✦</span> <span>Masaje Relajante</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-lg">✦</span> <span>Sonoterapia con cuencos</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-lg">✦</span> <span>Trabajo personalizado</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-stone-700/30 px-6 py-3 text-sm md:text-base font-bold text-stone-300 border border-stone-600/40 transition-all hover:bg-stone-600 hover:text-white hover:border-stone-500 hover:shadow-lg hover:shadow-stone-700/30 relative z-10 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Masaje
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: FORMACIONES ================= */}
      <section id="formaciones" className="py-16 md:py-24 px-6 lg:px-10 bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Formación Completa en Reiki</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full shadow-lg shadow-amber-500/40"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg font-light">Aprende de forma estructurada y profunda los principios del Reiki Usui con iniciación energética incluida.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gradient-to-br from-white/90 via-amber-50/40 to-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-10 border-2 border-amber-200/60 shadow-2xl shadow-amber-200/30">
            
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="aspect-video w-full bg-gradient-to-br from-stone-200 to-stone-300 rounded-xl flex items-center justify-center text-stone-500 overflow-hidden relative shadow-lg border-2 border-stone-300/50">
                <span className="font-medium tracking-wide text-sm">[ Foto Clase / Alumnos ]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md border-2 border-amber-100 flex items-center gap-4 hover:shadow-lg hover:border-amber-200 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900 text-sm mb-0.5">Duración</span>
                    <span className="text-stone-600 font-semibold text-xs">2 Meses</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-2 border-amber-100 flex items-center gap-4 hover:shadow-lg hover:border-amber-200 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-stone-900 text-sm mb-0.5">Horario</span>
                    <span className="text-stone-600 font-semibold text-xs">Jueves 19:30 - 21:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-stone-50 p-8 md:p-10 rounded-xl shadow-lg border-2 border-amber-200/60 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-6 right-6 bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-red-200 shadow-md">
                ⚠️ Cupos Limitados
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2 mt-4">Curso Reiki</h3>
              <p className="text-amber-600 font-bold text-xs mb-6 tracking-widest uppercase">NIVEL 1 + NIVEL 2</p>
              <div className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-8 tracking-tighter">$80.000</div>
              
              <ul className="space-y-3 text-stone-700 mb-8 flex-grow text-sm md:text-base">
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5 text-lg">✓</span> <span>Material completo y Diploma</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5 text-lg">✓</span> <span>Iniciación Energética</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5 text-lg">✓</span> <span>Horas Teórico-Prácticas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5 text-lg">✓</span> <span>Historia, Chakras y Ética</span></li>
              </ul>
              
              <Link href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/40 transition-all hover:shadow-xl hover:shadow-amber-600/60 hover:-translate-y-1 active:scale-95">
                Asegura tu cupo por WhatsApp
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 5: SOBRE EL MAESTRO ================= */}
      <section id="el-maestro" className="py-16 md:py-24 px-6 lg:px-10 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-stone-300 relative overflow-hidden border-y border-amber-900/30">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-md">Conoce al Maestro</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="aspect-square w-full bg-gradient-to-br from-amber-900/30 to-stone-900/50 rounded-2xl flex items-center justify-center text-stone-600 overflow-hidden shadow-2xl shadow-amber-900/40 border-2 border-amber-600/30">
                <span className="font-medium tracking-wide text-lg">[ Foto Daniel ]</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-md">Daniel Riquelme</h3>
                <p className="text-amber-400 font-bold text-sm tracking-widest uppercase">Maestro Certificado Reiki Usui</p>
              </div>

              <p className="text-stone-300 text-base md:text-lg leading-relaxed font-light">
                Con más de 15 años de experiencia en sanación energética, Daniel ha dedicado su vida a ayudar a otros a reconectar con su esencia y encontrar el equilibrio integral. Su enfoque combina la tradición del Reiki Usui con técnicas modernas de bienestar.
              </p>

              <ul className="space-y-3 text-stone-400 text-sm md:text-base">
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Iniciado en Reiki Usui Shiki Ryoho</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Especialista en Sanación Energética</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Facilitador de Transformación Personal</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/40 transition-all hover:shadow-xl hover:shadow-amber-600/60 hover:-translate-y-1 active:scale-95 mt-2">
                Conectar con Daniel
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 px-6 lg:px-10 bg-stone-950 border-t border-amber-900/30 text-stone-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-xs">
                  CR
                </div>
                <span className="font-serif text-lg font-bold text-white">Fundación Reiki</span>
              </div>
              <p className="text-sm text-stone-500">Sanación energética integral con Reiki Usui.</p>
            </div>

            <div className="text-center">
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Navegación</h4>
              <div className="space-y-2 text-sm">
                <Link href="#terapias" className="block hover:text-amber-500 transition-colors">Terapias</Link>
                <Link href="#formaciones" className="block hover:text-amber-500 transition-colors">Formaciones</Link>
                <Link href="#el-maestro" className="block hover:text-amber-500 transition-colors">El Maestro</Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Contacto</h4>
              <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center text-xs text-stone-600">
            <p>&copy; 2024 Fundación Reiki. Todos los derechos reservados. | Diseñado con 💛 para tu sanación.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
