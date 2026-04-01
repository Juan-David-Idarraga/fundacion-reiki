'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-200 selection:bg-amber-300 selection:text-slate-900 scroll-smooth overflow-x-hidden">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
          50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .bg-shimmer { background-size: 200% 100%; }
      `}</style>
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav 
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-3 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-sm shadow-lg shadow-amber-500/50 border border-amber-200 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 group-hover:shadow-amber-400/80">
              CR
            </div>
            <div>
              <span className={`font-serif text-xl font-bold tracking-wide transition-colors duration-300 block ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
                Fundación <span className="text-amber-400">Reiki</span>
              </span>
              <span className="text-xs text-amber-400 font-semibold tracking-widest">Usui Shiki Ryoho</span>
            </div>
          </Link>

          <div className={`hidden lg:flex gap-8 text-sm font-semibold transition-colors duration-300 ${isScrolled ? 'text-slate-300' : 'text-slate-200'}`}>
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                className="relative py-2 transition-all hover:text-amber-400 group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 shadow-lg shadow-amber-500/50"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link href="/login" className={`text-sm font-bold transition-all hover:text-amber-400 hover:-translate-y-0.5 ${isScrolled ? 'text-slate-300' : 'text-slate-200'}`}>
              Acceso Alumnos
            </Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-7 py-2.5 text-sm font-bold text-white shadow-xl shadow-amber-600/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/80 hover:scale-110 group border border-amber-300/50">
              <span className="relative z-10">Agendar Cita</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <button 
            className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="flex flex-col gap-4 pt-4 pb-5 lg:hidden border-t border-amber-500/30 mt-4 animate-fade-in-up">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-slate-300 text-sm font-semibold hover:text-amber-400 hover:translate-x-2 transition-all"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-amber-500/30 my-2"></div>
            <Link href="/login" className="text-amber-400 text-sm font-bold">Acceso Alumnos</Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/50 mt-2 active:scale-95 transition-transform">
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ================= SECCIÓN 1: HERO ================= */}
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 lg:pt-40 pb-16 text-center">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/banner-reiki.png')" }} role="img" aria-label="Fondo de meditación y sanación Reiki"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80"></div>
           
           {/* Animated orbs */}
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
           <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{animationDelay: '1s'}}></div>
           <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-5xl space-y-8 lg:space-y-10 animate-fade-in-up">
          <span className="inline-block rounded-full border border-amber-400/70 bg-gradient-to-r from-amber-950/50 to-orange-950/40 backdrop-blur-xl px-7 py-3 text-xs font-bold tracking-[0.25em] text-amber-300 uppercase shadow-2xl shadow-amber-900/50">
            ✨ Sanación Energética Integral & Transformación Espiritual
          </span>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white drop-shadow-2xl">
            Renueva tu Energía<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 drop-shadow-[0_0_40px_rgba(251,146,60,0.5)] animate-pulse-glow">con Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300 font-light drop-shadow-lg">
            Un puente sagrado para entregar amor, armonía y sanación profunda. Te ayudo a reconectarte con tu verdadera esencia y abrir la puerta hacia una vida plena, equilibrada y llena de propósito transformador.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-5 pt-10 sm:flex-row">
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-amber-600/70 transition-all hover:-translate-y-2 hover:shadow-3xl hover:shadow-amber-500/80 hover:scale-105 sm:w-auto border border-amber-300/50">
              Escríbeme sin compromiso
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#terapias" className="group flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400/70 px-10 py-5 text-lg font-bold text-white transition-all hover:border-amber-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/40 backdrop-blur-sm">
              Conocer Servicios
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-y-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* ================= SECCIÓN 2: VIDEO ================= */}
      <section id="video-intro" className="py-20 md:py-32 px-6 lg:px-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{animationDelay: '1s'}}></div>

        <div className="max-w-5xl mx-auto text-center space-y-10 md:space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">El Poder de la Energía Vital</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-2xl shadow-amber-500/60"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light">Descubre cómo el Reiki puede transformar tu vida, equilibrar tu energía y conectarte con tu verdadera esencia de una manera profunda y duradera.</p>
          </div>
          
          <div className="relative aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl shadow-amber-500/30 border-2 border-amber-400/40 flex items-center justify-center group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:shadow-amber-500/60 hover:-translate-y-3 hover:border-amber-300/60">
            <div className="absolute inset-0 bg-slate-800 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50"></div>
            <div className="text-amber-100 flex flex-col items-center transition-all duration-300 group-hover:scale-125 relative z-10">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 shadow-2xl shadow-amber-600/80 rounded-full flex items-center justify-center mb-6 text-white transition-all duration-300 group-hover:shadow-3xl group-hover:shadow-amber-500/100 group-hover:scale-110 border-2 border-amber-200/50 animate-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14 ml-2">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold tracking-wider text-lg md:text-xl text-amber-100 group-hover:text-white transition-colors duration-300">Reproducir Introducción</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: TERAPIAS ================= */}
      <section id="terapias" className="py-20 md:py-32 px-6 lg:px-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden border-y border-amber-600/20">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-600/20 to-orange-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{animationDelay: '1s'}}></div>

        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          <div className="text-center space-y-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Terapias Energéticas Transformadoras</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-2xl shadow-amber-500/60"></div>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-light">Acompañamiento personalizado y profundo para restaurar tu equilibrio integral y reconectar con tu verdadera esencia espiritual.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch">
            
            {/* TARJETA REIKI */}
            <div className="group relative bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-slate-900/60 backdrop-blur-2xl p-10 md:p-12 rounded-3xl shadow-2xl shadow-amber-900/50 border-2 border-amber-600/40 flex flex-col transition-all duration-500 hover:border-amber-500/80 hover:from-amber-900/70 hover:to-slate-900/50 hover:-translate-y-4 hover:shadow-3xl hover:shadow-amber-600/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/40 to-orange-600/30 rounded-2xl flex items-center justify-center text-amber-300 mb-8 border-2 border-amber-500/60 shadow-xl shadow-amber-600/40 group-hover:shadow-2xl group-hover:shadow-amber-500/60 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300 relative z-10">Reiki Usui</h3>
              <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-8 relative z-10">Presencial y a Distancia</p>
              
              <div className="flex items-end gap-3 mb-5 relative z-10">
                <div className="text-5xl md:text-6xl font-extrabold text-amber-300 tracking-tighter">$25.000</div>
                <div className="text-slate-400 mb-2 text-base font-medium">/ sesión</div>
              </div>
              <div className="bg-gradient-to-r from-amber-900/60 to-orange-900/40 text-amber-300 text-xs font-bold px-5 py-3 rounded-xl mb-10 inline-block w-fit border-2 border-amber-600/50 shadow-lg shadow-amber-900/40 relative z-10">
                ⭐ Pack 2 sesiones: $35.000 | 🎁 Pack 4: $60.000
              </div>
              
              <ul className="space-y-4 text-slate-300 flex-grow text-base md:text-lg mb-10 relative z-10">
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-2xl">✦</span> <span>Limpieza energética (Personas/Lugares)</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-2xl">✦</span> <span>Alineación de chakras con Péndulo</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-2xl">✦</span> <span>Liberación de emociones negativas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 shrink-0 text-2xl">✦</span> <span>Sanación del niño interior</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-r from-amber-600/40 via-orange-600/30 to-amber-500/20 px-8 py-4 text-base md:text-lg font-bold text-amber-300 border-2 border-amber-500/50 transition-all hover:from-amber-600 hover:via-orange-600 hover:to-amber-500 hover:text-white hover:border-amber-400 hover:shadow-xl hover:shadow-amber-600/50 relative z-10 group-hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Sesión
              </Link>
            </div>

            {/* TARJETA MASAJES */}
            <div className="group relative bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-slate-950/60 backdrop-blur-2xl p-10 md:p-12 rounded-3xl shadow-2xl shadow-slate-900/50 border-2 border-slate-700/50 flex flex-col transition-all duration-500 hover:border-slate-600/80 hover:from-slate-800/70 hover:to-slate-900/60 hover:-translate-y-4 hover:shadow-3xl hover:shadow-slate-800/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-slate-500/15 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl flex items-center justify-center text-slate-300 mb-8 border-2 border-slate-600/60 shadow-xl shadow-slate-700/40 group-hover:shadow-2xl group-hover:shadow-slate-600/60 group-hover:text-amber-400 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 0 1-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.375V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0h.008v.008h-.008V12.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors duration-300 relative z-10">Masajes Terapéuticos</h3>
              <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-8 group-hover:text-amber-400 transition-colors duration-300 relative z-10">Enfoque Holístico Integral</p>
              
              <div className="flex items-end gap-3 mb-5 relative z-10">
                <div className="text-5xl md:text-6xl font-extrabold text-slate-200 tracking-tighter">$20.000</div>
                <div className="text-slate-500 mb-2 text-base font-medium">/ sesión</div>
              </div>
              
              <ul className="space-y-4 text-slate-400 flex-grow text-base md:text-lg mb-10 relative z-10">
                <li className="flex items-start gap-3"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-2xl">✦</span> <span>Masaje Descontracturante Profundo</span></li>
                <li className="flex items-start gap-3"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-2xl">✦</span> <span>Masaje Relajante Integral</span></li>
                <li className="flex items-start gap-3"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-2xl">✦</span> <span>Sonoterapia con Cuencos Tibetanos</span></li>
                <li className="flex items-start gap-3"><span className="text-slate-500 group-hover:text-amber-400 transition-colors duration-300 shrink-0 text-2xl">✦</span> <span>Trabajo Personalizado a tu Medida</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="flex items-center justify-center gap-3 w-full rounded-xl bg-slate-700/40 px-8 py-4 text-base md:text-lg font-bold text-slate-300 border-2 border-slate-600/50 transition-all hover:bg-slate-600 hover:text-white hover:border-slate-500 hover:shadow-xl hover:shadow-slate-700/50 relative z-10 group-hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                Agendar Masaje
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: FORMACIONES ================= */}
      <section id="formaciones" className="py-20 md:py-32 px-6 lg:px-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto space-y-12 md:space-y-14 relative z-10">
          <div className="text-center space-y-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Formación Completa en Reiki Usui</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-2xl shadow-amber-500/60"></div>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-light">Aprende de forma estructurada y profunda los principios ancestrales del Reiki Usui Shiki Ryoho con iniciación energética incluida y certificación oficial.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-gradient-to-br from-slate-800/70 via-slate-900/50 to-slate-950/60 backdrop-blur-2xl rounded-3xl p-10 lg:p-14 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/30">
            
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              <div className="aspect-video w-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center text-slate-500 overflow-hidden relative shadow-xl border-2 border-slate-600/50">
                <span className="font-medium tracking-wide text-base">[ Foto Clase / Alumnos ]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg border-2 border-amber-500/30 flex items-center gap-4 hover:shadow-xl hover:border-amber-400/60 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/40 to-amber-600/20 rounded-xl flex items-center justify-center text-amber-400 shrink-0 shadow-md border border-amber-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm mb-1">Duración</span>
                    <span className="text-slate-400 font-semibold text-xs">2 Meses | 8 Sesiones</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg border-2 border-amber-500/30 flex items-center gap-4 hover:shadow-xl hover:border-amber-400/60 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/40 to-amber-600/20 rounded-xl flex items-center justify-center text-amber-400 shrink-0 shadow-md border border-amber-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm mb-1">Horario</span>
                    <span className="text-slate-400 font-semibold text-xs">Jueves 19:30 - 21:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-900/50 p-10 md:p-12 rounded-2xl shadow-xl border-2 border-amber-500/50 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none rounded-2xl"></div>
              <div className="absolute top-8 right-8 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider border border-red-500/50 shadow-lg shadow-red-600/40 relative z-10">
                ⚠️ Cupos Limitados
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 mt-6 relative z-10">Curso Reiki</h3>
              <p className="text-amber-400 font-bold text-xs mb-8 tracking-widest uppercase relative z-10">NIVEL 1 + NIVEL 2 COMPLETO</p>
              <div className="text-5xl md:text-6xl font-extrabold text-amber-400 mb-10 tracking-tighter relative z-10">$80.000</div>
              
              <ul className="space-y-4 text-slate-300 mb-10 flex-grow text-base md:text-lg relative z-10">
                <li className="flex items-start gap-3"><span className="text-amber-400 font-bold mt-1 text-xl">✓</span> <span>Material completo y Diploma Oficial</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 font-bold mt-1 text-xl">✓</span> <span>Iniciación Energética Profunda</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 font-bold mt-1 text-xl">✓</span> <span>Horas Teórico-Prácticas Intensivas</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-400 font-bold mt-1 text-xl">✓</span> <span>Historia, Chakras, Ética y Práctica</span></li>
              </ul>
              
              <Link href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="block w-full text-center rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 px-8 py-4 text-base md:text-lg font-bold text-white shadow-xl shadow-amber-600/60 transition-all hover:shadow-2xl hover:shadow-amber-500/80 hover:-translate-y-1 active:scale-95 relative z-10 border border-amber-300/50">
                Asegura tu cupo por WhatsApp
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 5: SOBRE EL MAESTRO ================= */}
      <section id="el-maestro" className="py-20 md:py-32 px-6 lg:px-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 relative overflow-hidden border-y border-amber-600/20">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-600/20 to-orange-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Conoce al Maestro</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 mx-auto rounded-full shadow-2xl shadow-amber-500/60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group">
              <div className="aspect-square w-full bg-gradient-to-br from-amber-900/40 to-slate-900/60 rounded-3xl flex items-center justify-center text-slate-600 overflow-hidden shadow-2xl shadow-amber-900/50 border-2 border-amber-600/40 relative">
                <span className="font-medium tracking-wide text-xl">[ Foto Daniel ]</span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-[80px] pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity duration-300"></div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Daniel Riquelme</h3>
                <p className="text-amber-400 font-bold text-sm tracking-widest uppercase border-l-4 border-amber-500 pl-4">Maestro Certificado Reiki Usui Shiki Ryoho</p>
              </div>

              <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                Con más de 15 años de experiencia en sanación energética integral, Daniel ha dedicado su vida a ayudar a otros a reconectar con su esencia y encontrar el equilibrio profundo. Su enfoque combina la tradición ancestral del Reiki Usui con técnicas modernas de bienestar holístico.
              </p>

              <ul className="space-y-4 text-slate-400 text-base md:text-lg">
                <li className="flex items-start gap-4"><span className="text-amber-500 shrink-0 text-2xl">⭐</span> <span>Iniciado en Reiki Usui Shiki Ryoho Tradicional</span></li>
                <li className="flex items-start gap-4"><span className="text-amber-500 shrink-0 text-2xl">⭐</span> <span>Especialista en Sanación Energética Integral</span></li>
                <li className="flex items-start gap-4"><span className="text-amber-500 shrink-0 text-2xl">⭐</span> <span>Facilitador de Transformación Personal Profunda</span></li>
                <li className="flex items-start gap-4"><span className="text-amber-500 shrink-0 text-2xl">⭐</span> <span>Acompañante en el Camino Espiritual</span></li>
              </ul>

              <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 px-10 py-4 text-base md:text-lg font-bold text-white shadow-xl shadow-amber-600/60 transition-all hover:shadow-2xl hover:shadow-amber-500/80 hover:-translate-y-2 hover:scale-105 active:scale-95 border border-amber-300/50 mt-4">
                Conectar con Daniel
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 px-6 lg:px-10 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-amber-600/20 text-slate-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-serif font-bold text-sm shadow-lg shadow-amber-500/50">
                  CR
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-white block">Fundación Reiki</span>
                  <span className="text-xs text-amber-400 font-semibold">Usui Shiki Ryoho</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Sanación energética integral y transformación espiritual con Daniel Riquelme, maestro certificado.</p>
            </div>

            <div className="text-center">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Navegación</h4>
              <div className="space-y-3 text-sm">
                <Link href="#terapias" className="block hover:text-amber-400 transition-colors duration-300">Terapias</Link>
                <Link href="#formaciones" className="block hover:text-amber-400 transition-colors duration-300">Formaciones</Link>
                <Link href="#el-maestro" className="block hover:text-amber-400 transition-colors duration-300">El Maestro</Link>
                <Link href="/login" className="block hover:text-amber-400 transition-colors duration-300">Acceso Alumnos</Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Contacto</h4>
              <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 text-sm font-semibold mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.3-.4-.4-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.2.2 1.7 2.6 4.1 3.6 2.4 1 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" /><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.86L2 22l5.35-1.18C8.75 21.57 10.33 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.18c-1.5 0-2.95-.39-4.22-1.09l-.3-.16-3.13.69.7-3.03-.18-.29C4.16 14.97 3.64 13.53 3.64 12 3.64 7.39 7.39 3.64 12 3.64 16.61 3.64 20.36 7.39 20.36 12 20.36 16.61 16.61 20.18 12 20.18z" clipRule="evenodd" /></svg>
                WhatsApp
              </Link>
              <p className="text-xs text-slate-600">Disponible 24/7 para consultas</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-10 text-center text-xs text-slate-600">
            <p>&copy; 2024 Fundación Reiki. Todos los derechos reservados. | Diseñado con 💛 para tu sanación y transformación espiritual.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
