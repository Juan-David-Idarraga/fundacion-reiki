import React from 'react'
import Link from 'next/link'
import { Mail, Lock, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react'
import { loginAction } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await Promise.resolve(searchParams)

  return (
    // Estructura maestra: flex-col en móviles, flex-row en PC
    <div
      className="flex min-h-screen flex-col font-sans lg:flex-row"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* --- LADO IZQUIERDO: Imagen (Oculto en móviles, 50% en PC) --- */}
      {/* --- LADO IZQUIERDO --- */}
      <div className="group relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-[4000ms] group-hover:scale-105"
          alt="Persona en posición de meditación para sesión de Reiki"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26,28,24,0.2), rgba(26,28,24,0.65), #1A1C18)',
          }}
        ></div>

        {/* Textos de la imagen (Con paddings reducidos y max-w para que no se rompan) */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-col justify-between p-10 xl:p-16">
          <Link
            href="/"
            className="group/back flex w-fit items-center gap-2 transition-colors"
            style={{ color: '#9A9589' }}
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover/back:-translate-x-1"
            />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">
              Volver a la web
            </span>
          </Link>

          <div className="space-y-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(26,28,24,0.5)',
                border: '1px solid #363830',
              }}
            >
              <Sparkles size={14} style={{ color: '#C9A227' }} />
              <span
                className="text-[9px] font-black tracking-widest uppercase"
                style={{ color: '#C9A227' }}
              >
                Plataforma Privada
              </span>
            </div>

            <h1
              className="max-w-sm font-serif text-4xl leading-tight font-bold italic xl:text-5xl"
              style={{ color: '#E8E4DC' }}
            >
              Bienvenido a tu{' '}
              <span style={{ color: '#4A8C42' }}>Espacio de Sanación.</span>
            </h1>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: '#9A9589' }}
            >
              Ingresa a la Intranet para acceder a tus clases, manuales PDF y
              todo el material de tu formación en Reiki.
            </p>
          </div>

          <div
            className="mt-8 flex shrink-0 items-center gap-3 pt-6"
            style={{ borderTop: '1px solid rgba(74,140,66,0.15)' }}
          >
            <ShieldCheck size={24} style={{ color: '#4A8C42' }} />
            <div>
              <p
                className="mb-0.5 text-xs font-bold"
                style={{ color: '#E8E4DC' }}
              >
                Acceso 100% Seguro
              </p>
              <p
                className="text-[9px] tracking-widest uppercase"
                style={{ color: '#5A5750' }}
              >
                Cifrado de extremo a extremo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- LADO DERECHO: Formulario (100% en móviles, 50% en PC) --- */}
      {/* --- LADO DERECHO: Formulario --- */}
      <div
        className="relative flex min-h-screen w-full items-center justify-center p-6 sm:p-10 lg:min-h-0 lg:w-1/2 xl:p-16"
        style={{ backgroundColor: '#1A1C18' }}
      >
        {/* Elemento decorativo sutil */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] sm:h-[500px] sm:w-[500px]"
          style={{ backgroundColor: 'rgba(74,140,66,0.07)' }}
        ></div>

        {/* Contenedor del form más compacto */}
        <div className="relative z-10 flex w-full max-w-[400px] flex-col">
          {/* Logo móvil */}
          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl font-serif text-xs font-bold shadow-lg"
              style={{
                backgroundColor: '#4A8C42',
                color: '#E8E4DC',
                boxShadow: '0 4px 16px rgba(74,140,66,0.3)',
              }}
            >
              CR
            </div>
            <span
              className="font-serif text-2xl font-bold tracking-wide"
              style={{ color: '#E8E4DC' }}
            >
              Fundación{' '}
              <span className="italic" style={{ color: '#4A8C42' }}>
                Reiki
              </span>
            </span>
          </div>

          <div className="mb-8 shrink-0 text-center lg:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 lg:justify-start">
              <Sparkles size={12} style={{ color: '#C9A227' }} />
              <span
                className="text-[9px] font-black tracking-[0.3em] uppercase"
                style={{ color: '#4A8C42' }}
              >
                Acceso a la Intranet
              </span>
            </div>
            <h2
              className="mb-1 font-serif text-2xl font-bold italic"
              style={{ color: '#E8E4DC' }}
            >
              Iniciar Sesión
            </h2>
            <p
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: '#9A9589' }}
            >
              Portal de Alumnos
            </p>
          </div>

          <form action={loginAction} className="flex flex-col gap-5">
            {params.error && (
              <div
                className="flex items-center justify-center gap-2 rounded-xl p-3 text-center text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(192,57,43,0.1)',
                  border: '1px solid rgba(192,57,43,0.2)',
                  color: '#E07060',
                }}
              >
                <Lock size={14} /> {params.error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="ml-1 text-[9px] font-black tracking-[0.2em] uppercase"
                  style={{ color: '#9A9589' }}
                >
                  Correo Electrónico
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-4"
                    style={{ color: '#5A5750' }}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="w-full rounded-xl py-3.5 pr-4 pl-12 text-sm font-medium transition-all outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="ml-1 text-[9px] font-black tracking-[0.2em] uppercase"
                  style={{ color: '#9A9589' }}
                >
                  Contraseña secreta
                </label>
                <div className="relative flex items-center">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-4"
                    style={{ color: '#5A5750' }}
                  />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl py-3.5 pr-4 pl-12 text-sm font-medium transition-all outline-none"
                    style={{
                      backgroundColor: '#141510',
                      border: '1px solid #2A2C24',
                      color: '#E8E4DC',
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-ripple mt-2 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                backgroundColor: '#4A8C42',
                color: '#E8E4DC',
                boxShadow: '0 4px 20px rgba(74,140,66,0.35)',
              }}
            >
              Ingresar a la Intranet
            </button>
          </form>

          <div className="mt-8 shrink-0 text-center">
            <div className="divider-reiki mb-6" />
            <p
              className="text-[9px] leading-relaxed font-medium tracking-widest uppercase"
              style={{ color: '#5A5750' }}
            >
              ¿Problemas para acceder? <br className="sm:hidden" />
              <a
                href="https://wa.me/56951735495"
                target="_blank"
                className="hover:underline"
                style={{ color: '#9A9589' }}
              >
                Contacta al Maestro
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
