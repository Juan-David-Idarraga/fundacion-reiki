'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { 
  Sparkles, ArrowRight, CheckCircle2, Calendar, 
  Clock, MessageCircle, Play, User, ShieldCheck,
  Heart, Zap, Sun, Star
} from 'lucide-react';

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
    <div className="min-h-screen bg-reiki-white font-sans text-stone-800 selection:bg-reiki-green selection:text-reiki-white scroll-smooth overflow-x-hidden">
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav 
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-3 lg:px-10 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-reiki-white/90 backdrop-blur-xl shadow-sm border-b border-reiki-stone' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-reiki-green flex items-center justify-center text-reiki-white font-serif font-bold text-xs shadow-md transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              CR
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-stone-900 block">
                Fundación <span className="text-reiki-green italic">Reiki</span>
              </span>
              <span className="text-[9px] text-reiki-violet font-black uppercase tracking-[0.2em]">Usui Shiki Ryoho</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest text-stone-500">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                className="relative py-1 transition-all hover:text-reiki-green group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-reiki-green origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-reiki-green transition-colors">
              Acceso Alumnos
            </Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="rounded-xl bg-reiki-green px-6 py-3 text-[10px] font-black uppercase tracking-widest text-reiki-white shadow-lg shadow-reiki-green/20 transition-all hover:shadow-xl hover:scale-105 active:scale-95">
              Agendar Cita
            </Link>
          </div>

          <button 
            className="lg:hidden p-2 text-stone-900"
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
          <div className="flex flex-col gap-4 pt-6 pb-8 lg:hidden border-t border-reiki-stone mt-4 animate-fade-in-up">
            {['Introducción', 'Terapias', 'Formaciones', 'El Maestro'].map((item, index) => (
              <Link 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-stone-600 text-xs font-bold uppercase tracking-widest hover:text-reiki-green transition-all"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-reiki-stone my-2"></div>
            <Link href="/login" className="text-reiki-violet text-xs font-black uppercase tracking-widest">Acceso Alumnos</Link>
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="w-full text-center rounded-xl bg-reiki-green py-4 text-xs font-black uppercase tracking-widest text-reiki-white shadow-lg active:scale-95 transition-transform">
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ================= SECCIÓN 1: HERO ================= */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
        
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-reiki-white"></div>
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-reiki-green/5 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-reiki-violet/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-5xl space-y-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} className="text-reiki-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-reiki-green">Sanación Energética Integral</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-stone-900 italic tracking-tight">
            Renueva tu Energía<br/>
            <span className="text-reiki-green">con Reiki Consciente</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base md:text-xl leading-relaxed text-stone-500 font-medium">
            Un puente sagrado para entregar amor, armonía y sanación. Reconéctate con tu esencia y abre la puerta hacia una vida plena y transformadora.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-reiki-green px-10 py-5 text-xs font-black uppercase tracking-widest text-reiki-white shadow-2xl shadow-reiki-green/30 transition-all hover:-translate-y-1 hover:shadow-reiki-green/40 sm:w-auto">
              Escríbeme sin compromiso
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#terapias" className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-reiki-stone bg-white px-10 py-5 text-xs font-black uppercase tracking-widest text-stone-600 transition-all hover:border-reiki-green hover:text-reiki-green hover:-translate-y-1 shadow-sm">
              Conocer Servicios
            </Link>
          </div>
        </div>
      </main>

      {/* ================= SECCIÓN 2: TERAPIAS ================= */}
      <section id="terapias" className="py-24 px-6 lg:px-10 bg-white relative border-y border-reiki-stone">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart size={14} className="text-reiki-violet" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-reiki-violet">Nuestros Servicios</h3>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 italic">Terapias de Sanación</h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-sm md:text-base font-medium">Acompañamiento personalizado para restaurar tu equilibrio integral.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* TARJETA REIKI */}
            <div className="group bg-reiki-white p-10 rounded-3xl border border-reiki-stone hover:border-reiki-green/30 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} className="text-reiki-green" />
              </div>
              <div className="h-14 w-14 rounded-2xl bg-reiki-green/10 flex items-center justify-center text-reiki-green mb-8">
                <Sun size={28} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-stone-900 italic mb-4">Sesión de Reiki Usui</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 font-medium">
                Terapia de canalización de energía vital universal para armonizar tus chakras, reducir el estrés y promover la autosanación física y emocional.
              </p>
              <Link href={`https://wa.me/${waNumber}?text=${msgReiki}`} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-reiki-green group-hover:gap-4 transition-all">
                Agendar Sesión <ArrowRight size={14} />
              </Link>
            </div>

            {/* TARJETA MASAJE */}
            <div className="group bg-reiki-white p-10 rounded-3xl border border-reiki-stone hover:border-reiki-violet/30 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Heart size={120} className="text-reiki-violet" />
              </div>
              <div className="h-14 w-14 rounded-2xl bg-reiki-violet/10 flex items-center justify-center text-reiki-violet mb-8">
                <Zap size={28} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-stone-900 italic mb-4">Masaje Terapéutico</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 font-medium">
                Técnicas manuales profundas combinadas con intención energética para liberar tensiones musculares, mejorar la circulación y relajar el sistema nervioso.
              </p>
              <Link href={`https://wa.me/${waNumber}?text=${msgMasaje}`} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-reiki-violet group-hover:gap-4 transition-all">
                Agendar Masaje <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: FORMACIÓN ================= */}
      <section id="formaciones" className="py-24 px-6 lg:px-10 bg-reiki-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen size={14} className="text-reiki-green" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-reiki-green">Academia de Formación</h3>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 italic">Formación en Reiki Usui</h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-sm md:text-base font-medium">Aprende los principios del Reiki Usui con iniciación energética incluida.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-[40px] p-8 lg:p-12 border border-reiki-stone shadow-sm">
            
            <div className="lg:col-span-4 space-y-6">
              <div className="aspect-video w-full bg-reiki-stone rounded-3xl flex items-center justify-center overflow-hidden relative border border-reiki-stone">
                <img src="/foto-clase.png" alt="Clase de Reiki" className="absolute inset-0 w-full h-full object-contain p-4" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-reiki-white p-5 rounded-2xl border border-reiki-stone flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-reiki-green/10 flex items-center justify-center text-reiki-green">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-stone-400">Duración</p>
                    <p className="text-xs font-bold text-stone-800">2 Meses de Formación</p>
                  </div>
                </div>
                <div className="bg-reiki-white p-5 rounded-2xl border border-reiki-stone flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-reiki-violet/10 flex items-center justify-center text-reiki-violet">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-stone-400">Horario</p>
                    <p className="text-xs font-bold text-stone-800">Jueves 19:30 hrs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center space-y-8 lg:pl-8">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-100 w-fit">
                <ShieldCheck size={12} /> Cupos Limitados
              </div>
              <div>
                <h3 className="font-serif text-4xl font-bold text-stone-900 italic mb-2">Curso Reiki Integral</h3>
                <p className="text-reiki-green font-black text-[10px] tracking-[0.3em] uppercase">Nivel 1 + Nivel 2</p>
              </div>
              <div className="text-6xl font-serif font-bold text-stone-900">$80.000</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Material completo y Diploma',
                  'Iniciación Energética',
                  'Horas Teórico-Prácticas',
                  'Acceso a Intranet de Alumnos'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-500 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-reiki-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              
              <Link href={`https://wa.me/${waNumber}?text=${msgCurso}`} target="_blank" className="w-full lg:w-fit rounded-2xl bg-stone-900 px-12 py-5 text-xs font-black uppercase tracking-widest text-reiki-white shadow-xl transition-all hover:bg-reiki-green hover:-translate-y-1 text-center">
                Asegura tu cupo ahora
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: SOBRE EL MAESTRO ================= */}
      <section id="el-maestro" className="py-24 px-6 lg:px-10 bg-white border-t border-reiki-stone">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-square w-full bg-reiki-stone rounded-[40px] flex items-center justify-center overflow-hidden border border-reiki-stone relative shadow-2xl">
              <img src="/foto-daniel.jpeg" alt="Daniel Riquelme Maestro Reiki" className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-reiki-gold/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-reiki-gold" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-reiki-gold">El Maestro</h3>
              </div>
              <h2 className="font-serif text-5xl font-bold text-stone-900 italic">Daniel Riquelme</h2>
              <p className="text-reiki-green font-black text-[10px] tracking-[0.3em] uppercase border-l-4 border-reiki-green pl-4">Maestro Certificado Reiki Usui</p>
            </div>

            <p className="text-stone-500 text-base leading-relaxed font-medium">
              Con más de 15 años de experiencia en sanación energética, Daniel ha dedicado su vida a ayudar a otros a reconectar con su esencia y encontrar equilibrio profundo a través del linaje tradicional Usui.
            </p>

            <div className="space-y-4">
              {[
                'Iniciado en Reiki Usui Shiki Ryoho',
                'Especialista en Sanación Energética',
                'Facilitador de Transformación Personal'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-stone-600 text-sm font-bold">
                  <div className="h-2 w-2 rounded-full bg-reiki-gold"></div>
                  {item}
                </div>
              ))}
            </div>

            <Link href={`https://wa.me/${waNumber}?text=${msgGeneral}`} target="_blank" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-stone-900 border-b-2 border-reiki-gold pb-1 hover:text-reiki-green hover:border-reiki-green transition-all">
              Conectar con el Maestro <MessageCircle size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-reiki-white py-16 px-6 lg:px-10 border-t border-reiki-stone">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-reiki-green flex items-center justify-center text-reiki-white font-serif font-bold text-[10px]">
              CR
            </div>
            <span className="font-serif text-base font-bold text-stone-900 italic">
              Fundación Reiki Usui
            </span>
          </div>
          
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} — Sanación y Luz para el Mundo
          </p>

          <div className="flex gap-6">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-reiki-green transition-colors">
              Intranet
            </Link>
            <a href={`https://wa.me/${waNumber}`} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-reiki-green transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
