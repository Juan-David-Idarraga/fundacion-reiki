'use client';
import React, { useState, useEffect } from "react";

/**
 * DESIGN PHILOSOPHY: Elevated Spiritual Wellness
 * - Warm amber & cream palette with deep charcoal accents
 * - Serif headers (elegant, spiritual) + sans-serif body (readable, modern)
 * - Generous whitespace and subtle shadows for premium feel
 * - Smooth transitions and refined interactions
 * - Professional yet warm, inviting yet sophisticated
 */

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 font-sans text-stone-800 selection:bg-amber-200 selection:text-stone-900 scroll-smooth overflow-x-hidden">
      
      {/* ================= NAVIGATION BAR ================= */}
      <nav
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-3 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100/50'
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-amber-950 font-serif font-bold text-sm shadow-md border border-amber-200 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              CR
            </div>
            <span className={`font-serif text-lg font-bold tracking-wide transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-stone-900' : 'text-white'}`}>
              Centro de <span className="text-amber-600">Reiki</span>
            </span>
          </div>
          
          <div className={`hidden lg:flex gap-8 text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-stone-700' : 'text-white'}`}>
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro', 'Contacto'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`}
                className="relative py-2 transition-colors hover:text-amber-600 group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a href="#login" className={`text-sm font-medium transition-all hover:text-amber-600 hover:-translate-y-0.5 ${isScrolled ? 'text-stone-700' : 'text-white'}`}>
              Acceso Alumnos
            </a>
            <a href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="relative overflow-hidden rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-700 hover:scale-105 hover:shadow-lg group">
              <span className="relative z-10">Agendar Cita</span>
            </a>
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
          <div className="flex flex-col gap-4 pt-4 pb-5 lg:hidden border-t border-amber-100 mt-4 animate-in fade-in-up duration-300">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro', 'Contacto'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-700 text-sm font-medium hover:text-amber-600 hover:translate-x-1 transition-transform"
              >
                {item}
              </a>
            ))}
            <div className="h-px bg-amber-100 my-2"></div>
            <a href="#login" className="text-amber-600 text-sm font-semibold">Acceso Alumnos</a>
            <a href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md mt-2 active:scale-95 transition-transform">
              Agendar Cita
            </a>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 lg:pt-40 pb-16 text-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663482270461/RQZJL5SgbLuP8nZFPP77fo/hero-reiki-LNA6hNnt4kcunRXLrkvbpQ.webp')" }}></div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl space-y-6 lg:space-y-8 animate-in fade-in-up duration-700">
          <span className="inline-block rounded-full border border-amber-400/60 bg-black/40 backdrop-blur-md px-6 py-2.5 text-xs font-semibold tracking-widest text-amber-300 uppercase shadow-lg">
            Sanación & Desarrollo Espiritual
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Renueva tu Energía con <br/>
            <span className="text-amber-300 drop-shadow-xl">Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-amber-50 font-light drop-shadow-md">
            Un puente para entregar amor, armonía y sanación. Te ayudo a reconectarte con tu esencia y abrir la puerta hacia una vida más plena y equilibrada.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <a href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-amber-900/50 transition-all hover:-translate-y-1 hover:bg-amber-500 sm:w-auto">
              Escríbeme sin compromiso
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      {/* ================= INTRODUCTION SECTION ================= */}
      <section id="introducción" className="py-16 md:py-20 px-6 lg:px-10 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">El Poder de la Energía Vital</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg font-light">
              Conoce cómo el Reiki puede transformar tu vida, equilibrar tu energía y reconectar con tu verdadera esencia. A través de la sanación energética integral, te acompañaré en tu camino hacia el bienestar total.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Sanación Integral</h3>
              <p className="text-stone-700 text-sm leading-relaxed">Liberación de bloqueos emocionales y energéticos para restaurar tu equilibrio total.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Equilibrio Energético</h3>
              <p className="text-stone-700 text-sm leading-relaxed">Alineación de chakras y armonización de tu energía vital para bienestar duradero.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Transformación Personal</h3>
              <p className="text-stone-700 text-sm leading-relaxed">Reconexión con tu esencia para una vida más plena, consciente y significativa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THERAPIES SECTION ================= */}
      <section id="terapias" className="py-16 md:py-20 px-6 lg:px-10 bg-gradient-to-b from-stone-900 to-stone-950 relative overflow-hidden border-y border-amber-600/20">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Terapias Disponibles</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg font-light">Acompañamiento personalizado para restaurar tu equilibrio integral.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* REIKI CARD */}
            <div className="group bg-gradient-to-br from-stone-800/80 to-stone-900 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-amber-600/30 flex flex-col transition-all duration-300 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-900/30 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/40 to-amber-600/20 rounded-lg flex items-center justify-center text-amber-400 mb-5 border border-amber-600/50 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-white mb-2 relative z-10">Reiki Usui</h3>
              <p className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-5 relative z-10">Presencial y a Distancia</p>
              
              <div className="flex items-end gap-2 mb-5 relative z-10">
                <div className="text-4xl font-extrabold text-white tracking-tighter">$25.000</div>
                <div className="text-stone-400 mb-1 text-sm font-medium">/ sesión</div>
              </div>
              
              <div className="bg-amber-900/40 text-amber-300 text-xs font-semibold px-4 py-2 rounded-lg mb-6 inline-block w-fit border border-amber-600/50 relative z-10">
                ⭐ Pack 2 sesiones: $35.000
              </div>
              
              <ul className="space-y-3 text-stone-300 flex-grow text-sm mb-8 relative z-10">
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 font-bold">✦</span> <span>Limpieza energética (Personas/Lugares)</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 font-bold">✦</span> <span>Alineación de chakras (Péndulo)</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 font-bold">✦</span> <span>Liberación de emociones negativas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 font-bold">✦</span> <span>Sanación del niño interior</span></li>
              </ul>
              
              <a href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-600/20 px-5 py-3 text-sm font-semibold text-amber-300 border border-amber-500/40 transition-all hover:bg-amber-600 hover:text-white hover:border-amber-600 relative z-10 group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Sesión
              </a>
            </div>

            {/* MASSAGE CARD */}
            <div className="group bg-gradient-to-br from-stone-800/80 to-stone-900 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-stone-700/50 flex flex-col transition-all duration-300 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-900/30 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-stone-700/60 rounded-lg flex items-center justify-center text-stone-300 mb-5 border border-stone-600/50 group-hover:text-amber-400 transition-colors relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-white mb-2 relative z-10">Masajes Terapéuticos</h3>
              <p className="text-stone-400 font-semibold text-xs tracking-widest uppercase mb-5 group-hover:text-amber-400 transition-colors relative z-10">Enfoque Holístico</p>
              
              <div className="flex items-end gap-2 mb-6 lg:mb-8 relative z-10">
                <div className="text-4xl font-extrabold text-white tracking-tighter">$20.000</div>
                <div className="text-stone-400 mb-1 text-sm font-medium">/ sesión</div>
              </div>
              
              <ul className="space-y-3 text-stone-300 flex-grow text-sm mb-8 relative z-10">
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors shrink-0 font-bold">✦</span> <span>Masaje Descontracturante</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors shrink-0 font-bold">✦</span> <span>Masaje Relajante</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors shrink-0 font-bold">✦</span> <span>Sonoterapia con cuencos</span></li>
                <li className="flex items-start gap-3"><span className="text-stone-500 group-hover:text-amber-400 transition-colors shrink-0 font-bold">✦</span> <span>Trabajo personalizado</span></li>
              </ul>
              
              <a href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-stone-700/40 px-5 py-3 text-sm font-semibold text-stone-300 border border-stone-600/50 transition-all hover:bg-stone-600 hover:text-white hover:border-amber-500/60 relative z-10 group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Masaje
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRAINING SECTION ================= */}
      <section id="formaciones" className="py-16 md:py-20 px-6 lg:px-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Formación Completa en Reiki</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-2xl p-8 lg:p-10 border border-amber-200/60 shadow-lg shadow-amber-100/50">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="aspect-video w-full bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center text-stone-400 overflow-hidden relative shadow-md border border-amber-200/60">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663482270461/RQZJL5SgbLuP8nZFPP77fo/chakra-energy-jT9TFHWoJNTikKLvT5jV9B.webp" alt="Formación Reiki" className="w-full h-full object-cover" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl shadow-sm border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <div>
                    <span className="block font-semibold text-stone-900 text-sm mb-0.5">Duración</span>
                    <span className="text-stone-600 font-medium text-xs">2 Meses</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl shadow-sm border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <span className="block font-semibold text-stone-900 text-sm mb-0.5">Horario</span>
                    <span className="text-stone-600 font-medium text-xs">Jueves 19:30 - 21:30</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl shadow-md border border-amber-200/60 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-5 right-5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-red-200">
                Cupos Limitados
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 mt-4">Curso Reiki</h3>
              <p className="text-amber-700 font-bold text-xs mb-6 tracking-widest uppercase">NIVEL 1 + NIVEL 2</p>
              <div className="text-4xl font-extrabold text-stone-900 mb-8 tracking-tighter">$80.000</div>
              
              <ul className="space-y-3 text-stone-700 mb-8 flex-grow text-sm">
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5">✓</span> <span>Material completo y Diploma</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5">✓</span> <span>Iniciación Energética</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5">✓</span> <span>Horas Teórico-Prácticas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-600 font-bold mt-0.5">✓</span> <span>Historia, Chakras y Ética</span></li>
              </ul>
              
              <a href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                Asegura tu cupo por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MASTER SECTION ================= */}
      <section id="el-maestro" className="py-16 md:py-20 px-6 lg:px-10 bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12 relative z-10">
          <div className="w-full lg:w-1/3 flex flex-col items-center text-center space-y-6 shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 shadow-2xl flex items-center justify-center text-stone-500 overflow-hidden border-4 border-amber-600/40 relative ring-4 ring-amber-900/20">
              <span className="relative z-10 font-medium tracking-wide text-xs md:text-sm">[ Foto Daniel ]</span>
            </div>
            
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Daniel Riquelme</h2>
              <p className="text-amber-400 font-bold tracking-widest uppercase mt-2 text-xs md:text-sm">Maestro Reiki</p>
            </div>
            
            <div className="bg-stone-800/60 p-6 rounded-xl border border-amber-600/30 w-full text-left space-y-4 shadow-lg text-sm md:text-base">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg mt-0.5">✦</span>
                <p className="text-stone-300"><strong className="text-white">Verificado por:</strong> Fundación Chilena de Reiki.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg mt-0.5">✦</span>
                <p className="text-stone-300"><strong className="text-white">Estado:</strong> Membresía Activa.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg mt-0.5">✦</span>
                <p className="text-stone-300">Terapeuta Reiki y estudiante de TENS.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg mt-0.5">✦</span>
                <p className="text-stone-300"><strong className="text-white">Atención:</strong> Presencial (Rancagua) y Online.</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 space-y-8 leading-relaxed text-base md:text-lg font-light">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
                <div className="w-8 h-px bg-amber-500 rounded-full"></div> Mi Camino
              </h3>
              <p className="text-stone-300">
                Mi recorrido comenzó con la Maestría en Reiki Kundalini, avalada por el Centro Americano de Terapeutas Holísticos. Este fue mi primer gran despertar, una experiencia que abrió mi corazón y me permitió comprender la fuerza transformadora de la energía universal.
              </p>
              <p className="text-stone-300">
                Movido por ese llamado, continué mi formación en la Fundación Chilena de Reiki, donde profundicé en la esencia del Reiki Usui hasta alcanzar el nivel de <strong className="text-white">Maestro (Nivel 4)</strong>. Cada aprendizaje, práctica y sesión nutrieron mi camino.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-stone-800/80 to-stone-900 p-8 rounded-2xl shadow-lg border border-amber-600/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <h4 className="font-serif text-xl md:text-2xl font-bold text-white mb-4">¿Qué esperar de mí?</h4>
              <p className="mb-5 text-stone-300 text-base md:text-lg">
                Quienes llegan a mí encuentran un espacio seguro, de respeto y contención. En cada terapia entrego un acompañamiento enfocado en:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-6 font-medium text-stone-200 text-sm md:text-base">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Liberar bloqueos</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Equilibrar la energía</li>
                <li className="flex items-center gap-3 sm:col-span-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Abrir caminos hacia la serenidad</li>
              </ul>
              <blockquote className="italic text-stone-400 border-t border-stone-700 pt-4 text-sm md:text-base">
                "Pueden esperar de mí profesionalismo, ética y dedicación, con el propósito de guiarlos en un viaje hacia la sanación y el reencuentro con su verdadera esencia."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contacto" className="py-16 md:py-20 px-6 lg:px-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Ponte en Contacto</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg font-light">
              ¿Tienes preguntas? Estoy aquí para ayudarte. Contáctame a través de WhatsApp o sígueme en redes sociales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Contact */}
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-8 rounded-2xl border border-green-200/60 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">WhatsApp</h3>
              <p className="text-stone-600 text-sm mb-5">Respuesta rápida y directa</p>
              <a href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-block bg-green-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:bg-green-600 hover:scale-105">
                Enviar Mensaje
              </a>
            </div>

            {/* Instagram Contact */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-100/50 p-8 rounded-2xl border border-pink-200/60 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Instagram</h3>
              <p className="text-stone-600 text-sm mb-5">Sígueme para contenido exclusivo</p>
              <a href="https://instagram.com" target="_blank" className="inline-block bg-gradient-to-br from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg">
                Seguir
              </a>
            </div>

            {/* Email Contact */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border border-blue-200/60 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v-1.5a2.25 2.25 0 0 0-2.25-2.25H4.5a2.25 2.25 0 0 0-2.25 2.25v1.5m19.5 0v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m0 0H3.75m0 0H2.25" /></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Email</h3>
              <p className="text-stone-600 text-sm mb-5">Consultas y más información</p>
              <a href="mailto:daniel@centroreiki.com" className="inline-block bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:bg-blue-600 hover:scale-105">
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-6 lg:px-10 text-xs border-t-4 border-amber-600">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
              <div className="h-8 w-8 rounded-full bg-amber-900 flex items-center justify-center text-amber-500 font-serif font-bold text-xs">CR</div>
              <span className="font-serif text-lg md:text-xl font-bold text-white">Centro de Reiki</span>
            </div>
            <p className="text-stone-400 max-w-sm mx-auto lg:mx-0 text-xs md:text-sm leading-relaxed">
              Sanación energética integral desde el Reiki. Agenda abierta, cupos limitados cada semana. Transformando energías, sanando vidas.
            </p>
          </div>
          
          <div className="lg:col-span-7 bg-stone-900 p-6 rounded-xl border border-stone-800 text-stone-300 shadow-lg">
            <h4 className="font-serif text-base md:text-lg text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
              Política de Sesiones
            </h4>
            <div className="grid md:grid-cols-2 gap-5 text-xs md:text-sm leading-relaxed">
              <div>
                <strong className="text-amber-500 block mb-2 uppercase tracking-widest text-[10px]">Reserva y Pago</strong>
                <p className="text-stone-400">Las sesiones se reservan con pago previo. Una vez confirmado el pago, tu hora queda oficialmente agendada.</p>
              </div>
              <div>
                <strong className="text-amber-500 block mb-2 uppercase tracking-widest text-[10px]">Puntualidad</strong>
                <p className="text-stone-400">Si no asistes o no te conectas a la hora acordada, <span className="text-white font-semibold">no habrá devolución</span>, ya que el espacio fue reservado para ti.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-800 pt-6 text-[10px] md:text-xs">
          <p className="text-stone-500 font-medium">
            © {new Date().getFullYear()} Daniel Riquelme B. Todos los derechos reservados.
          </p>
          <p className="text-amber-600/60 font-serif italic tracking-wider">"Reiki consciente para la sanación integral del ser."</p>
        </div>
      </footer>
    </div>
  );
}
