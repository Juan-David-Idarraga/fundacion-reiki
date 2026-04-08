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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-200 selection:bg-amber-300 selection:text-slate-900 scroll-smooth overflow-x-hidden">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
          50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav 
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-2 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-xs shadow-lg shadow-amber-500/50 border border-amber-200 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              CR
            </div>
            <div>
              <span className={`font-serif text-lg font-bold tracking-wide transition-colors duration-300 block ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
                Fundación <span className="text-amber-400">Reiki</span>
              </span>
              <span className="text-xs text-amber-400 font-semibold">Usui Shiki Ryoho</span>
            </div>
          </Link>

          <div className={`hidden lg:flex gap-6 text-xs font-semibold transition-colors duration-300 ${isScrolled ? 'text-slate-300' : 'text-slate-200'}`}>
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                className="relative py-1 transition-all hover:text-amber-400 group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link href="/login" className={`text-xs font-bold transition-all hover:text-amber-400 ${isScrolled ? 'text-slate-300' : 'text-slate-200'}`}>
              Acceso Alumnos
            </Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-6 py-2 text-xs font-bold text-white shadow-lg shadow-amber-600/60 transition-all hover:shadow-xl hover:scale-105 border border-amber-300/50">
              <span className="relative z-10">Agendar Cita</span>
            </Link>
          </div>

          <button 
            className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="flex flex-col gap-3 pt-3 pb-4 lg:hidden border-t border-amber-500/30 mt-3">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-slate-300 text-xs font-semibold hover:text-amber-400 transition-all"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-amber-500/30 my-1"></div>
            <Link href="/login" className="text-amber-400 text-xs font-bold">Acceso Alumnos</Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-bold text-white shadow-lg mt-2 active:scale-95 transition-transform">
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ================= SECCIÓN 1: HERO ================= */}
      <main className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/banner-reiki.png')" }}></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80"></div>
           <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-5 lg:space-y-6">
          <span className="inline-block rounded-full border border-amber-400/70 bg-gradient-to-r from-amber-950/50 to-orange-950/40 backdrop-blur-xl px-6 py-2 text-xs font-bold tracking-[0.2em] text-amber-300 uppercase shadow-lg shadow-amber-900/40">
            ✨ Sanación Energética Integral
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white drop-shadow-xl">
            Renueva tu Energía<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 drop-shadow-[0_0_30px_rgba(251,146,60,0.4)]">con Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-slate-300 font-light drop-shadow-md">
            Un puente sagrado para entregar amor, armonía y sanación. Reconéctate con tu esencia y abre la puerta hacia una vida plena y transformadora.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-3 pt-6 sm:flex-row">
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-amber-600/60 transition-all hover:-translate-y-1 hover:shadow-2xl hover:scale-105 sm:w-auto border border-amber-300/50">
              Escríbeme sin compromiso
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#terapias" className="group flex items-center justify-center gap-2 rounded-lg border-2 border-amber-400/60 px-8 py-3 text-sm font-bold text-white transition-all hover:border-amber-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/30 backdrop-blur-sm">
              Conocer Servicios
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-y-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* ================= SECCIÓN 2: TERAPIAS ================= */}
      <section id="terapias" className="py-14 md:py-18 px-6 lg:px-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden border-y border-amber-600/20">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-600/15 to-orange-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Terapias Energéticas</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-lg shadow-amber-500/50"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light">Acompañamiento personalizado para restaurar tu equilibrio integral.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* TARJETA REIKI */}
            <div className="group relative bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-amber-900/40 border-2 border-amber-600/40 flex flex-col transition-all duration-300 hover:border-amber-500/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-600/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/40 to-orange-600/30 rounded-xl flex items-center justify-center text-amber-300 mb-5 border-2 border-amber-500/50 shadow-lg shadow-amber-600/30 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors duration-300 relative z-10">Reiki Usui</h3>
              <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-4 relative z-10">Presencial y a Distancia</p>
              
              <div className="flex items-end gap-2 mb-3 relative z-10">
                <div className="text-4xl font-extrabold text-amber-300 tracking-tighter">$25.000</div>
                <div className="text-slate-400 mb-1 text-xs font-medium">/ sesión</div>
              </div>
              <div className="bg-amber-900/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg mb-5 inline-block w-fit border border-amber-600/50 shadow-md relative z-10">
                ⭐ Pack 2: $35.000
              </div>
              
              <ul className="space-y-2 text-slate-300 flex-grow text-xs md:text-sm mb-6 relative z-10">
                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 text-sm">✦</span> <span>Limpieza energética</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 text-sm">✦</span> <span>Alineación de chakras</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 text-sm">✦</span> <span>Liberación emocional</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-amber-600/40 to-amber-500/20 px-6 py-2.5 text-xs font-bold text-amber-300 border-2 border-amber-500/50 transition-all hover:from-amber-600 hover:to-amber-500 hover:text-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-600/40 relative z-10 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar
              </Link>
            </div>

            {/* TARJETA MASAJES */}
            <div className="group relative bg-gradient-to-br from-slate-800/50 via-slate-900/40 to-slate-950/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-slate-900/40 border-2 border-slate-700/50 flex flex-col transition-all duration-300 hover:border-slate-600/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700/40 to-slate-600/20 rounded-xl flex items-center justify-center text-slate-300 mb-5 border-2 border-slate-600/50 shadow-lg shadow-slate-700/30 group-hover:text-amber-400 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-slate-100 transition-colors duration-300 relative z-10">Masajes Terapéuticos</h3>
              <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-4 group-hover:text-amber-400 transition-colors duration-300 relative z-10">Holístico</p>
              
              <div className="flex items-end gap-2 mb-3 relative z-10">
                <div className="text-4xl font-extrabold text-slate-200 tracking-tighter">$20.000</div>
                <div className="text-slate-500 mb-1 text-xs font-medium">/ sesión</div>
              </div>
              
              <ul className="space-y-2 text-slate-400 flex-grow text-xs md:text-sm mb-6 relative z-10">
                <li className="flex items-start gap-2"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-sm">✦</span> <span>Masaje Descontracturante</span></li>
                <li className="flex items-start gap-2"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-sm">✦</span> <span>Masaje Relajante</span></li>
                <li className="flex items-start gap-2"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-sm">✦</span> <span>Sonoterapia</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="flex items-center justify-center gap-2 w-full rounded-lg bg-slate-700/40 px-6 py-2.5 text-xs font-bold text-slate-300 border-2 border-slate-600/50 transition-all hover:bg-slate-600 hover:text-white hover:border-slate-500 hover:shadow-lg hover:shadow-slate-700/40 relative z-10 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: FORMACIONES ================= */}
      <section id="formaciones" className="py-14 md:py-18 px-6 lg:px-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-500/12 to-orange-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Formación en Reiki Usui</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-lg shadow-amber-500/50"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light">Aprende los principios del Reiki Usui con iniciación energética incluida.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-950/50 backdrop-blur-xl rounded-2xl p-8 border-2 border-amber-500/40 shadow-xl shadow-amber-500/20">
            
            <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
              <div className="aspect-video w-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center overflow-hidden shadow-lg border-2 border-slate-600/40 relative">
  <img src="/foto-clase.png" alt="Clase de Reiki" className="absolute inset-0 w-full h-full object-cover" />
</div>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg shadow-md border-2 border-amber-500/25 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0 shadow-sm border border-amber-500/40 text-sm">
                    📅
                  </div>
                  <div>
                    <span className="block font-bold text-white text-xs mb-0.5">Duración</span>
                    <span className="text-slate-400 font-semibold text-xs">2 Meses</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg shadow-md border-2 border-amber-500/25 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0 shadow-sm border border-amber-500/40 text-sm">
                    🕐
                  </div>
                  <div>
                    <span className="block font-bold text-white text-xs mb-0.5">Horario</span>
                    <span className="text-slate-400 font-semibold text-xs">Jueves 19:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-amber-950/40 via-orange-950/25 to-slate-900/40 p-8 rounded-xl shadow-lg border-2 border-amber-500/40 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none rounded-xl"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-red-500/50 shadow-lg shadow-red-600/30 relative z-10">
                ⚠️ Cupos Limitados
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1 mt-4 relative z-10">Curso Reiki</h3>
              <p className="text-amber-400 font-bold text-xs mb-4 tracking-widest uppercase relative z-10">NIVEL 1 + NIVEL 2</p>
              <div className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-6 tracking-tighter relative z-10">$80.000</div>
              
              <ul className="space-y-2 text-slate-300 mb-6 flex-grow text-xs md:text-sm relative z-10">
                <li className="flex items-start gap-2"><span className="text-amber-400 font-bold mt-0.5 text-sm">✓</span> <span>Material completo y Diploma</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-400 font-bold mt-0.5 text-sm">✓</span> <span>Iniciación Energética</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-400 font-bold mt-0.5 text-sm">✓</span> <span>Horas Teórico-Prácticas</span></li>
              </ul>
              
              <Link href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-600/50 transition-all hover:shadow-xl hover:shadow-amber-500/70 hover:-translate-y-0.5 active:scale-95 relative z-10 border border-amber-300/50">
                Asegura tu cupo
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: SOBRE EL MAESTRO ================= */}
      <section id="el-maestro" className="py-14 md:py-18 px-6 lg:px-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 relative overflow-hidden border-y border-amber-600/20">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-600/15 to-orange-600/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Conoce al Maestro</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-lg shadow-amber-500/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative group">
              <div className="aspect-square w-full bg-gradient-to-br from-amber-900/30 to-slate-900/50 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl shadow-amber-900/40 border-2 border-amber-600/40 relative group/foto">
  <img src="/foto-daniel.jpeg" alt="Daniel Riquelme Maestro Reiki" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/foto:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60"></div>
</div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Daniel Riquelme</h3>
                <p className="text-amber-400 font-bold text-xs tracking-widest uppercase border-l-4 border-amber-500 pl-3">Maestro Certificado Reiki Usui</p>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                Con más de 15 años de experiencia en sanación energética, Daniel ha dedicado su vida a ayudar a otros a reconectar con su esencia y encontrar equilibrio profundo.
              </p>

              <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Iniciado en Reiki Usui Shiki Ryoho</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Especialista en Sanación Energética</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 shrink-0 text-lg">⭐</span> <span>Facilitador de Transformación Personal</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-600/50 transition-all hover:shadow-xl hover:shadow-amber-500/70 hover:-translate-y-1 hover:scale-105 active:scale-95 border border-amber-300/50 mt-2">
                Conectar con Daniel
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 px-6 lg:px-10 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-amber-600/20 text-slate-400 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-xs shadow-lg shadow-amber-500/50">
                  CR
                </div>
                <div>
                  <span className="font-serif text-base font-bold text-white block">Fundación Reiki</span>
                  <span className="text-xs text-amber-400 font-semibold">Usui Shiki Ryoho</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Sanación energética integral con Daniel Riquelme.</p>
            </div>

            <div className="text-center">
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Navegación</h4>
              <div className="space-y-2 text-xs">
                <Link href="#terapias" className="block hover:text-amber-400 transition-colors duration-300">Terapias</Link>
                <Link href="#formaciones" className="block hover:text-amber-400 transition-colors duration-300">Formaciones</Link>
                <Link href="#el-maestro" className="block hover:text-amber-400 transition-colors duration-300">El Maestro</Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Contacto</h4>
              <div className="flex items-center justify-center md:justify-end gap-4">
                <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 text-xs font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                  WhatsApp
                </Link>
                <Link href="https://instagram.com" target="_blank" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 text-xs font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
                  Instagram
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
            <p>&copy; 2024 Fundación Reiki. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
