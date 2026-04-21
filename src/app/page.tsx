'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, startTransition } from 'react'
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
  Instagram,
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
  // Fix de hidratación: new Date() solo se ejecuta en el cliente tras el montaje
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useScrollReveal()

  useEffect(() => {
    startTransition(() => {
      setCurrentYear(new Date().getFullYear())
    })
  }, [])

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
        className={`fixed top-0 z-50 flex w-full flex-col px-4 py-4 transition-all duration-500 md:px-6 lg:px-8 ${
          isScrolled || isMobileMenuOpen
            ? 'border-b border-stone-800 bg-stone-950/90 shadow-lg backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 cursor-pointer items-center gap-3"
          >
            <div className="shrink-0 overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:scale-110">
              <Image
                src="/foto-clase.png" // Tu logo
                alt="Logo Fundación Reiki Usui"
                width={44}
                height={44}
                className="h-11 w-11 object-cover"
                priority
              />
            </div>
            {/* Ocultamos el texto largo en pantallas medianas para dar más espacio al menú */}
            <div className="hidden min-w-0 sm:block">
              <span className="block truncate font-serif text-lg font-bold tracking-tight text-white drop-shadow-md">
                Maestro verificado
              </span>
              <span className="hidden truncate text-[9px] font-black tracking-[0.2em] text-emerald-400 uppercase drop-shadow-md md:block">
                Por la fundación chilena de Reiki
              </span>
            </div>
          </Link>

          {/* MENÚ DESKTOP - Arreglo iPad: whitespace-nowrap y gap dinámico (gap-4 en iPad, gap-8 en PC) */}
          <div className="hidden gap-2 text-[9px] font-black tracking-widest text-white/90 uppercase lg:flex xl:gap-8 xl:text-[10px]">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative py-1 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* BOTONES CTA - Arreglo iPad: padding dinámico y whitespace-nowrap */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-6">
            <Link
              href="/login"
              className="text-[10px] font-black tracking-widest whitespace-nowrap text-white/90 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors hover:text-emerald-400"
            >
              Acceso Alumnos
            </Link>
            <Link
              href={`https://wa.me/${waNumber}?text=${msgGeneral}`}
              target="_blank"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-[9px] font-black tracking-widest whitespace-nowrap text-white uppercase shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:bg-emerald-500 active:scale-95 lg:px-4 lg:py-2.5 lg:text-[10px] xl:px-6 xl:py-3"
            >
              Agendar Cita
            </Link>
          </div>

          {/* BOTÓN MÓVIL */}
          <button
            className="p-2 text-white drop-shadow-md lg:hidden"
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
      <main className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pt-32 pb-16 text-center">
        {/* IMAGEN DE FONDO Y GRADIENTES PROTECTORES */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/banner.png"
            alt="Fondo dorado Formación Reiki"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Viñeta superior oscura para resaltar el texto y el menú */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

          {/* Viñeta inferior oscura para resaltar el texto de abajo */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/90 to-transparent" />
        </div>

        {/* CONTENEDOR DE TEXTOS */}
        <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-between">
          {/* TEXTOS SUPERIORES - Empujados hacia arriba lejos del símbolo */}
          <div className="mt-4 space-y-2 md:mt-8">
            <h1
              className="reveal font-serif text-3xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl"
              style={{
                textShadow:
                  '0px 4px 10px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.8)',
              }}
            >
              Centro de Reiki & bienestar integral
            </h1>
            <h2
              className="reveal reveal-delay-1 font-serif text-4xl font-extrabold tracking-wide text-[#FFD700] md:text-5xl lg:text-6xl"
              style={{
                textShadow:
                  '0px 4px 10px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.8), 0px 0px 10px rgba(255,215,0,0.3)',
              }}
            >
              Área de formación
            </h2>
          </div>

          {/* ESPACIO CENTRAL VACÍO - Deja lucir el Caduceo luminoso */}
          <div className="min-h-[40vh] w-full flex-1 md:min-h-[50vh]"></div>

          {/* TEXTO INFERIOR */}
          <div className="pb-4 lg:pb-8">
            <p
              className="reveal reveal-delay-2 font-serif text-2xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl"
              style={{
                textShadow:
                  '0px 4px 15px rgba(0,0,0,1), 0px 0px 40px rgba(0,0,0,0.8)',
              }}
            >
              Reiki Usui{' '}
              <span className="mx-3 font-light text-emerald-500 drop-shadow-md">
                |
              </span>{' '}
              Cursos certificados
            </p>
          </div>
        </div>
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
              Aprende los principios del Reiki Usui, desarrolla tus capacidades
              de sanación energética y accede a herramientas complementarias
              como la radiestesia.
            </p>
          </div>

          <div className="reveal card-elevated-gold rounded-[40px] p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-4">
                {/* ── CONTENEDOR DE IMAGEN CORREGIDO ── */}
                <div
                  className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border"
                  style={{ backgroundColor: '#242720', borderColor: '#363830' }}
                >
                  <img
                    src="/foto-.png"
                    alt="Clase de Reiki"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* ──────────────────────────────────── */}

                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      icon: Calendar,
                      label: 'Duración e Inicio',
                      value: '2 Meses',
                      color: '#4A8C42',
                      bg: 'rgba(74,140,66,0.1)',
                    },
                    {
                      icon: Clock,
                      label: 'Horario',
                      value: 'Jueves de 19:30 a 21:30 hrs',
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
                          className="icon-bounce flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
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
                    Formación Completa Nivel 1 y 2
                  </h3>
                  <p
                    className="text-[10px] font-black tracking-[0.3em] uppercase"
                    style={{ color: '#4A8C42' }}
                  >
                    Reiki Usui + Péndulo & Radiestesia
                  </p>
                </div>

                <div className="text-gradient-gold font-serif text-6xl font-bold">
                  $80.000
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    'Material completo y Certificado Digital',
                    'Iniciación Energética y Horas Prácticas',
                    'Péndulo y Radiestesia (Primer Nivel)',
                    'Tratamiento a terceros y Limpieza Energética',
                    'Acceso a Intranet (clases grabadas y material)',
                    'Grupo de apoyo y seguimiento personalizado',
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

              {/* ENLACE VERIFICADO A LA FUNDACIÓN */}
              <a
                href="https://www.fundacionchilenadereiki.cl/maestro-a-verificado-a/daniel-riquelme"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 border-l-4 pl-4 text-[10px] font-black tracking-[0.3em] uppercase decoration-1 underline-offset-4 transition-all hover:underline hover:opacity-75"
                style={{ color: '#4A8C42', borderColor: '#4A8C42' }}
                title="Verificar certificación en la Fundación Chilena de Reiki"
              >
                Maestro Certificado Reiki Usui
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </div>

            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: '#9A9589' }}
            >
              Con formación avanzada en la Fundación Chilena de Reiki (Nivel 4)
              y Maestría en Reiki Kundalini. Daniel ofrece un espacio seguro,
              ético y profesional para liberar bloqueos, equilibrar tu energía y
              guiarte en el reencuentro con tu verdadera esencia.
            </p>

            <div className="space-y-4">
              {[
                'Maestro Reiki Usui y Kundalini Certificado',
                'Atención presencial (Rancagua/Coltauco) y Online',
                'Terapias individuales y limpiezas energéticas',
                'Clases y talleres de formación en Reiki',
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
                color: '#4A8C42',
                bgIcon: 'rgba(74,140,66,0.12)',
              },
              {
                icon: Calendar,
                title: 'Sesiones',
                desc: 'Presencial / Online',
                value: 'Rancagua, Chile',
                link: '#formaciones',
                delay: 'reveal-delay-2',
                color: '#8B6B91',
                bgIcon: 'rgba(139,107,145,0.12)',
              },
              {
                icon: Instagram, // Asegúrate de importar Instagram de 'lucide-react'
                title: 'Instagram',
                desc: 'Nuestra Comunidad',
                value: '@reiki_bienestar_integral',
                link: 'https://www.instagram.com/reiki_bienestar_integral',
                delay: 'reveal-delay-3',
                color: '#C9A227', // Color dorado para diferenciarlo
                bgIcon: 'rgba(201,162,39,0.12)',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <a
                  key={i}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={
                    item.link.startsWith('http') ? 'noopener noreferrer' : ''
                  }
                  className={`reveal reveal-scale ${item.delay} card-elevated group rounded-3xl p-8 text-center transition-all`}
                >
                  <div
                    className="icon-bounce mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300"
                    style={{
                      backgroundColor: item.bgIcon,
                      color: item.color,
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3
                    className="mb-1 font-bold transition-colors duration-300 group-hover:text-white"
                    style={{ color: '#E8E4DC' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mb-3 text-[10px] font-black tracking-widest uppercase"
                    style={{ color: '#9A9589' }}
                  >
                    {item.desc}
                  </p>
                  <p
                    className="text-sm font-bold transition-colors duration-300 group-hover:text-white"
                    style={{ color: '#B8B4AC' }}
                  >
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
            © {currentYear ?? '…'} — Sanación y Luz para el Mundo
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
