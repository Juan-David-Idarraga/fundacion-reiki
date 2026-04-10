'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MessageCircle,
  ShieldCheck,
  Heart,
  Zap,
  Sun,
  Star,
  BookOpen,
  Brain,
  HelpCircle,
} from 'lucide-react'

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useScrollReveal()

  const waNumber = '56951735495'
  const msgGeneral = encodeURI(
    'Hola Daniel, me gustaría obtener más información sobre tus terapias y formaciones.',
  )
  const msgReiki = encodeURI(
    'Hola Daniel, me gustaría agendar una sesión de Reiki Usui.',
  )
  const msgMasaje = encodeURI(
    'Hola Daniel, me gustaría agendar un Masaje Terapéutico.',
  )
  const msgCurso = encodeURI(
    'Hola Daniel, me gustaría inscribirme y asegurar mi cupo en el Curso de Reiki Nivel 1 y 2.',
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Introducción', href: '#introduccion' },
    { label: 'Terapias', href: '#terapias' },
    { label: 'Formaciones', href: '#formaciones' },
    { label: 'El Maestro', href: '#el-maestro' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <div
      className="min-h-screen overflow-x-hidden scroll-smooth font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 z-50 flex w-full flex-col px-6 py-3 transition-all duration-500 lg:px-10 ${
          isScrolled || isMobileMenuOpen
            ? 'border-b shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        style={
          isScrolled || isMobileMenuOpen
            ? { backgroundColor: 'rgba(26,28,24,0.92)', borderColor: '#2A2C24' }
            : {}
        }
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="shrink-0 overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/banner-reiki.png"
                alt="Logo Fundación Reiki Usui"
                width={44}
                height={44}
                className="h-11 w-11 object-cover"
                priority
              />
            </div>
            <div>
              <span
                className="block font-serif text-lg font-bold tracking-tight"
                style={{ color: '#E8E4DC' }}
              >
                Fundación{' '}
                <span style={{ color: '#4A8C42' }} className="italic">
                  Reiki
                </span>
              </span>
              <span
                className="text-[9px] font-black tracking-[0.2em] uppercase"
                style={{ color: '#8B6B91' }}
              >
                Usui Shiki Ryoho
              </span>
            </div>
          </Link>

          <div
            className="hidden gap-8 text-[10px] font-black tracking-widest uppercase lg:flex"
            style={{ color: '#9A9589' }}
          >
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="link-underline relative py-1 transition-all hover:text-[#E8E4DC]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-6 lg:flex">
            <Link
              href="/login"
              className="text-[10px] font-black tracking-widest uppercase transition-colors hover:text-[#4A8C42]"
              style={{ color: '#9A9589' }}
            >
              Acceso Alumnos
            </Link>
            <Link
              href={`https://wa.me/${waNumber}?text=${msgGeneral}`}
              target="_blank"
              className="btn-ripple rounded-xl px-6 py-3 text-[10px] font-black tracking-widest uppercase shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#4A8C42',
                color: '#E8E4DC',
                boxShadow: '0 4px 16px rgba(74,140,66,0.3)',
              }}
            >
              Agendar Cita
            </Link>
          </div>

          <button
            className="p-2 lg:hidden"
            style={{ color: '#E8E4DC' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="animate-fade-in-up mt-4 flex flex-col gap-4 border-t pt-6 pb-8 lg:hidden"
            style={{ borderColor: '#2A2C24' }}
          >
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold tracking-widest uppercase transition-all hover:text-[#4A8C42]"
                style={{ color: '#9A9589' }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="my-2 h-px"
              style={{ backgroundColor: '#2A2C24' }}
            ></div>
            <Link
              href="/login"
              className="text-xs font-black tracking-widest uppercase"
              style={{ color: '#8B6B91' }}
            >
              Acceso Alumnos
            </Link>
            <Link
              href={`https://wa.me/${waNumber}?text=${msgGeneral}`}
              target="_blank"
              className="w-full rounded-xl py-4 text-center text-xs font-black tracking-widest uppercase shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}
            >
              Agendar Cita
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <main className="texture-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]"
            style={{ backgroundColor: '#4A8C42' }}
          ></div>
          <div
            className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-15 blur-[140px]"
            style={{ backgroundColor: '#8B6B91', animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl space-y-8">
          <div className="reveal mb-4 flex items-center justify-center gap-2">
            <Sparkles size={16} style={{ color: '#C9A227' }} />
            <span
              className="text-[10px] font-black tracking-[0.4em] uppercase"
              style={{ color: '#4A8C42' }}
            >
              Sanación Energética Integral
            </span>
          </div>

          <h1
            className="reveal reveal-delay-1 font-serif text-5xl leading-[1.05] font-bold tracking-tight italic md:text-7xl lg:text-8xl"
            style={{ color: '#E8E4DC' }}
          >
            Renueva tu Energía
            <br />
            <span style={{ color: '#4A8C42' }}>con Reiki Consciente</span>
          </h1>

          <p
            className="reveal reveal-delay-2 mx-auto max-w-2xl text-base leading-relaxed font-medium md:text-xl"
            style={{ color: '#9A9589' }}
          >
            Un puente sagrado para entregar amor, armonía y sanación.
            Reconéctate con tu esencia y abre la puerta hacia una vida plena y
            transformadora.
          </p>

          <div className="reveal reveal-delay-3 flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link
              href={`https://wa.me/${waNumber}?text=${msgGeneral}`}
              target="_blank"
              className="btn-ripple group flex w-full items-center justify-center gap-3 rounded-2xl px-10 py-5 text-xs font-black tracking-widest uppercase shadow-2xl transition-all hover:-translate-y-1 sm:w-auto"
              style={{
                backgroundColor: '#4A8C42',
                color: '#E8E4DC',
                boxShadow: '0 8px 32px rgba(74,140,66,0.35)',
              }}
            >
              Escríbeme sin compromiso
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#terapias"
              className="group flex items-center justify-center gap-3 rounded-2xl border-2 px-10 py-5 text-xs font-black tracking-widest uppercase shadow-sm transition-all hover:-translate-y-1"
              style={{
                borderColor: '#363830',
                color: '#9A9589',
                backgroundColor: '#242720',
              }}
            >
              Conocer Servicios
            </Link>
          </div>
        </div>
        {/* ── BANNER DE LA FUNDACIÓN ── */}
        <section
          className="reveal w-full overflow-hidden"
          style={{ borderTop: '1px solid #2A2C24' }}
        >
          <div className="relative w-full">
            <Image
              src="/banner-reiki.png"
              alt="Fundación Reiki Usui Shiki Ryoho"
              width={1920}
              height={420}
              className="w-full object-cover object-center"
              style={{ maxHeight: '420px', opacity: 0.85 }}
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(26,28,24,0.3) 0%, rgba(26,28,24,0) 30%, rgba(26,28,24,0) 70%, rgba(26,28,24,0.95) 100%)',
              }}
            />
          </div>
        </section>
      </main>

      {/* ── ¿QUÉ ES EL REIKI? ── */}
      <section
        id="introduccion"
        className="texture-dots gradient-reiki-dark relative border-t px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1E2019' }}
      >
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="reveal space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles size={14} style={{ color: '#8B6B91' }} />
              <h3
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#8B6B91' }}
              >
                Conocimiento Ancestral
              </h3>
            </div>
            <h2
              className="font-serif text-4xl font-bold italic md:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              ¿Qué es el Reiki?
            </h2>
            <p
              className="mx-auto max-w-3xl text-sm font-medium md:text-base"
              style={{ color: '#9A9589' }}
            >
              Una práctica milenaria de sanación energética que armoniza cuerpo,
              mente y espíritu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Sanación Física',
                desc: 'Alivia dolores crónicos, reduce la inflamación y acelera la recuperación de lesiones a través de la energía vital.',
                delay: 'reveal-delay-1',
              },
              {
                icon: Brain,
                title: 'Equilibrio Mental',
                desc: 'Calma la mente, reduce el estrés y la ansiedad, mejorando la claridad mental y la concentración.',
                delay: 'reveal-delay-2',
              },
              {
                icon: Sparkles,
                title: 'Elevación Espiritual',
                desc: 'Conecta con tu esencia, abre los chakras y facilita el crecimiento personal y la transformación.',
                delay: 'reveal-delay-3',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className={`reveal reveal-scale ${item.delay} card-elevated group rounded-3xl p-10 transition-all duration-500`}
                >
                  <div
                    className="icon-bounce mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors"
                    style={{
                      backgroundColor: 'rgba(74,140,66,0.12)',
                      color: '#4A8C42',
                    }}
                  >
                    <Icon size={32} />
                  </div>
                  <h3
                    className="mb-3 font-serif text-2xl font-bold italic"
                    style={{ color: '#E8E4DC' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: '#9A9589' }}
                  >
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="reveal card-elevated-gold rounded-3xl p-12">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h3
                  className="font-serif text-3xl font-bold italic"
                  style={{ color: '#E8E4DC' }}
                >
                  Principios Fundamentales
                </h3>
                <div className="space-y-4">
                  {[
                    'Energía Universal: El Reiki es la energía vital que fluye a través de todo lo existente.',
                    'Canalización: El terapeuta actúa como canal, no como fuente de la energía.',
                    'Armonización: Restaura el equilibrio natural del cuerpo y la mente.',
                    'Transformación: Facilita cambios profundos a nivel físico, emocional y espiritual.',
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="mt-2 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: '#C9A227' }}
                      ></div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: '#B8B4AC' }}
                      >
                        {p}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-3xl p-8 text-center"
                style={{ backgroundColor: 'rgba(74,140,66,0.08)' }}
              >
                <div className="mb-4 text-6xl">☮️</div>
                <p
                  className="mb-4 text-lg font-medium italic"
                  style={{ color: '#B8B4AC' }}
                >
                  &ldquo;La energía fluye donde va la intención&rdquo;
                </p>
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#9A9589' }}
                >
                  Principio Reiki Usui
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERAPIAS ── */}
      <section
        id="terapias"
        className="texture-dots gradient-reiki-warm-dark relative border-y px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1A1C18' }}
      >
        <div className="relative z-10 mx-auto max-w-6xl space-y-16">
          <div className="reveal space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Heart size={14} style={{ color: '#8B6B91' }} />
              <h3
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#8B6B91' }}
              >
                Nuestros Servicios
              </h3>
            </div>
            <h2
              className="font-serif text-4xl font-bold italic md:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              Terapias de Sanación
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm font-medium md:text-base"
              style={{ color: '#9A9589' }}
            >
              Acompañamiento personalizado para restaurar tu equilibrio
              integral.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="reveal reveal-left card-elevated group aura-green relative overflow-hidden rounded-3xl p-10 transition-all duration-500">
              <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.04] transition-opacity group-hover:opacity-[0.08]">
                <Zap size={120} style={{ color: '#4A8C42' }} />
              </div>
              <div
                className="icon-bounce mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(74,140,66,0.12)',
                  color: '#4A8C42',
                }}
              >
                <Sun size={28} />
              </div>
              <h3
                className="mb-4 font-serif text-3xl font-bold italic"
                style={{ color: '#E8E4DC' }}
              >
                Sesión de Reiki Usui
              </h3>
              <p
                className="mb-8 text-sm leading-relaxed font-medium"
                style={{ color: '#9A9589' }}
              >
                Terapia de canalización de energía vital universal para
                armonizar tus chakras, reducir el estrés y promover la
                autosanación física y emocional.
              </p>
              <Link
                href={`https://wa.me/${waNumber}?text=${msgReiki}`}
                target="_blank"
                className="link-underline inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase transition-all group-hover:gap-4"
                style={{ color: '#4A8C42' }}
              >
                Agendar Sesión <ArrowRight size={14} />
              </Link>
            </div>

            <div className="reveal reveal-right card-elevated group aura-violet relative overflow-hidden rounded-3xl p-10 transition-all duration-500">
              <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.04] transition-opacity group-hover:opacity-[0.08]">
                <Heart size={120} style={{ color: '#8B6B91' }} />
              </div>
              <div
                className="icon-bounce mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(139,107,145,0.12)',
                  color: '#8B6B91',
                }}
              >
                <Zap size={28} />
              </div>
              <h3
                className="mb-4 font-serif text-3xl font-bold italic"
                style={{ color: '#E8E4DC' }}
              >
                Masaje Terapéutico
              </h3>
              <p
                className="mb-8 text-sm leading-relaxed font-medium"
                style={{ color: '#9A9589' }}
              >
                Técnicas manuales profundas combinadas con intención energética
                para liberar tensiones musculares, mejorar la circulación y
                relajar el sistema nervioso.
              </p>
              <Link
                href={`https://wa.me/${waNumber}?text=${msgMasaje}`}
                target="_blank"
                className="link-underline inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase transition-all group-hover:gap-4"
                style={{ color: '#8B6B91' }}
              >
                Agendar Masaje <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMACIÓN ── */}
      <section
        id="formaciones"
        className="texture-dots gradient-reiki-dark border-t px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1E2019' }}
      >
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="reveal space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <BookOpen size={14} style={{ color: '#4A8C42' }} />
              <h3
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#4A8C42' }}
              >
                Academia de Formación
              </h3>
            </div>
            <h2
              className="font-serif text-4xl font-bold italic md:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              Formación en Reiki Usui
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm font-medium md:text-base"
              style={{ color: '#9A9589' }}
            >
              Aprende los principios del Reiki Usui con iniciación energética
              incluida.
            </p>
          </div>

          <div className="reveal card-elevated-gold rounded-[40px] p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-4">
                <div
                  className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl border"
                  style={{ backgroundColor: '#242720', borderColor: '#363830' }}
                >
                  <img
                    src="/foto-clase.png"
                    alt="Clase de Reiki"
                    className="h-full w-full object-contain p-6"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      icon: Calendar,
                      label: 'Duración',
                      value: '2 Meses de Formación',
                      color: '#4A8C42',
                      bg: 'rgba(74,140,66,0.1)',
                    },
                    {
                      icon: Clock,
                      label: 'Horario',
                      value: 'Jueves 19:30 hrs',
                      color: '#8B6B91',
                      bg: 'rgba(139,107,145,0.1)',
                    },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className="card-elevated flex items-center gap-4 rounded-2xl p-5"
                      >
                        <div
                          className="icon-bounce flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor: item.bg,
                            color: item.color,
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <p
                            className="text-[8px] font-black tracking-widest uppercase"
                            style={{ color: '#9A9589' }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: '#E8E4DC' }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-8 lg:col-span-8 lg:pl-8">
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-black tracking-widest uppercase"
                  style={{
                    backgroundColor: 'rgba(192,57,43,0.1)',
                    color: '#E07060',
                    borderColor: 'rgba(192,57,43,0.2)',
                  }}
                >
                  <ShieldCheck size={12} /> Cupos Limitados
                </div>
                <div>
                  <h3
                    className="mb-2 font-serif text-4xl font-bold italic"
                    style={{ color: '#E8E4DC' }}
                  >
                    Curso Reiki Integral
                  </h3>
                  <p
                    className="text-[10px] font-black tracking-[0.3em] uppercase"
                    style={{ color: '#4A8C42' }}
                  >
                    Nivel 1 + Nivel 2
                  </p>
                </div>
                <div className="text-gradient-gold font-serif text-6xl font-bold">
                  $80.000
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    'Material completo y Diploma',
                    'Iniciación Energética',
                    'Horas Teórico-Prácticas',
                    'Acceso a Intranet de Alumnos',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium"
                      style={{ color: '#B8B4AC' }}
                    >
                      <CheckCircle2
                        size={18}
                        style={{ color: '#4A8C42' }}
                        className="shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href={`https://wa.me/${waNumber}?text=${msgCurso}`}
                  target="_blank"
                  className="btn-ripple w-full rounded-2xl px-12 py-5 text-center text-xs font-black tracking-widest uppercase shadow-xl transition-all hover:-translate-y-1 lg:w-fit"
                  style={{ backgroundColor: '#E8E4DC', color: '#1A1C18' }}
                >
                  Asegura tu cupo ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="gradient-reiki-warm-dark texture-dots border-t px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1A1C18' }}
      >
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="reveal space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <HelpCircle size={14} style={{ color: '#C9A227' }} />
              <h3
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#C9A227' }}
              >
                Dudas Comunes
              </h3>
            </div>
            <h2
              className="font-serif text-4xl font-bold italic md:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Necesito experiencia previa para aprender Reiki?',
                a: 'No. El Reiki está diseñado para cualquier persona, sin importar su edad o trasfondo. Solo necesitas apertura y disposición para aprender.',
              },
              {
                q: '¿Cuánto tiempo tarda en ver resultados?',
                a: 'Algunos sienten cambios inmediatamente, mientras que otros notan transformaciones gradualmente. Cada persona es única en su proceso de sanación.',
              },
              {
                q: '¿El Reiki reemplaza la medicina convencional?',
                a: 'No. El Reiki es un complemento excelente a tratamientos médicos. Siempre consulta con profesionales de la salud.',
              },
              {
                q: '¿Qué debo hacer para prepararme para una sesión?',
                a: 'Llega con ropa cómoda, mente abierta y disposición para relajarte. No es necesario hacer nada especial.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} card-elevated group rounded-2xl p-6 transition-all`}
              >
                <h3
                  className="mb-3 flex items-center gap-3 text-sm font-bold md:text-base"
                  style={{ color: '#E8E4DC' }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                    style={{
                      backgroundColor: 'rgba(74,140,66,0.12)',
                      color: '#4A8C42',
                    }}
                  >
                    {i + 1}
                  </span>
                  {item.q}
                </h3>
                <p
                  className="ml-9 text-sm font-medium"
                  style={{ color: '#9A9589' }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL MAESTRO ── */}
      <section
        id="el-maestro"
        className="texture-dots gradient-reiki-dark border-t px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1E2019' }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="group reveal reveal-left relative">
            <div
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[40px] border shadow-2xl"
              style={{ backgroundColor: '#242720', borderColor: '#363830' }}
            >
              <img
                src="/foto-daniel.jpeg"
                alt="Daniel Riquelme Maestro Reiki"
                className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              className="absolute -right-6 -bottom-6 h-32 w-32 animate-pulse rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(201,162,39,0.12)' }}
            ></div>
          </div>

          <div className="reveal reveal-right space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star size={14} style={{ color: '#C9A227' }} />
                <h3
                  className="text-[10px] font-black tracking-[0.3em] uppercase"
                  style={{ color: '#C9A227' }}
                >
                  El Maestro
                </h3>
              </div>
              <h2
                className="font-serif text-5xl font-bold italic"
                style={{ color: '#E8E4DC' }}
              >
                Daniel Riquelme
              </h2>
              <p
                className="border-l-4 pl-4 text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#4A8C42', borderColor: '#4A8C42' }}
              >
                Maestro Certificado Reiki Usui
              </p>
            </div>

            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: '#9A9589' }}
            >
              Con más de 15 años de experiencia en sanación energética, Daniel
              ha dedicado su vida a ayudar a otros a reconectar con su esencia y
              encontrar equilibrio profundo a través del linaje tradicional
              Usui.
            </p>

            <div className="space-y-4">
              {[
                'Iniciado en Reiki Usui Shiki Ryoho',
                'Especialista en Sanación Energética',
                'Facilitador de Transformación Personal',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-sm font-bold"
                  style={{ color: '#B8B4AC' }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: '#C9A227' }}
                  ></div>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href={`https://wa.me/${waNumber}?text=${msgGeneral}`}
              target="_blank"
              className="link-underline inline-flex items-center gap-3 border-b-2 pb-1 text-[10px] font-black tracking-widest uppercase transition-all"
              style={{ color: '#E8E4DC', borderColor: '#C9A227' }}
            >
              Conectar con el Maestro <MessageCircle size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section
        id="contacto"
        className="gradient-reiki-warm-dark texture-dots border-t px-6 py-24 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#1A1C18' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-16 space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <MessageCircle size={14} style={{ color: '#4A8C42' }} />
              <h3
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#4A8C42' }}
              >
                Ponte en Contacto
              </h3>
            </div>
            <h2
              className="font-serif text-4xl font-bold italic md:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              Conecta con Nosotros
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm font-medium md:text-base"
              style={{ color: '#9A9589' }}
            >
              ¿Preguntas? Estamos aquí para ayudarte en tu camino de sanación.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                desc: 'Respuesta rápida',
                value: '+56 9 5173 5495',
                link: 'https://wa.me/56951735495',
                delay: 'reveal-delay-1',
              },
              {
                icon: Calendar,
                title: 'Sesiones',
                desc: 'Jueves 19:30 hrs',
                value: 'Rancagua, Chile',
                link: '#formaciones',
                delay: 'reveal-delay-2',
              },
              {
                icon: Heart,
                title: 'Energía',
                desc: 'Disponible 24/7',
                value: 'Sanación sin límites',
                link: '#',
                delay: 'reveal-delay-3',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <a
                  key={i}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  className={`reveal reveal-scale ${item.delay} card-elevated group rounded-3xl p-8 text-center transition-all`}
                >
                  <div
                    className="icon-bounce mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors"
                    style={{
                      backgroundColor: 'rgba(74,140,66,0.12)',
                      color: '#4A8C42',
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="mb-1 font-bold" style={{ color: '#E8E4DC' }}>
                    {item.title}
                  </h3>
                  <p
                    className="mb-3 text-[10px] font-black tracking-widest uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    {item.desc}
                  </p>
                  <p className="text-sm font-bold" style={{ color: '#B8B4AC' }}>
                    {item.value}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t px-6 py-16 lg:px-10"
        style={{ borderColor: '#2A2C24', backgroundColor: '#141510' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl font-serif text-[10px] font-bold"
              style={{ backgroundColor: '#4A8C42', color: '#E8E4DC' }}
            >
              CR
            </div>
            <span
              className="font-serif text-base font-bold italic"
              style={{ color: '#E8E4DC' }}
            >
              Fundación Reiki Usui
            </span>
          </div>
          <p
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: '#5A5750' }}
          >
            © {new Date().getFullYear()} — Sanación y Luz para el Mundo
          </p>
          <div className="flex gap-6">
            <Link
              href="/login"
              className="link-underline text-[10px] font-black tracking-widest uppercase transition-colors hover:text-[#4A8C42]"
              style={{ color: '#9A9589' }}
            >
              Intranet
            </Link>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              className="link-underline text-[10px] font-black tracking-widest uppercase transition-colors hover:text-[#4A8C42]"
              style={{ color: '#9A9589' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
