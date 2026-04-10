import React from 'react'
import Link from 'next/link'

interface ReikiLogoProps {
  /** Tamaño del ícono cuadrado en px (default: 32) */
  iconSize?: number
  /** Mostrar texto junto al ícono (default: true) */
  showText?: boolean
  /** Variante de color del ícono (default: 'green') */
  variant?: 'green' | 'gold' | 'violet'
  /** Texto principal (default: 'Fundación Reiki') */
  title?: string
  /** Subtítulo (default: 'Usui Shiki Ryoho') */
  subtitle?: string
  /** Href del link (default: '/') */
  href?: string
  /** Clase CSS adicional para el contenedor */
  className?: string
}

const VARIANTS = {
  green: {
    bg: 'linear-gradient(135deg, #4A8C42, #3A7035)',
    color: '#E8E4DC',
    glow: 'rgba(74,140,66,0.35)',
    subtitleColor: '#4A8C42',
  },
  gold: {
    bg: 'linear-gradient(135deg, #C9A227, #A07B1A)',
    color: '#1A1C18',
    glow: 'rgba(201,162,39,0.35)',
    subtitleColor: '#C9A227',
  },
  violet: {
    bg: 'linear-gradient(135deg, #8B6B91, #6B4B71)',
    color: '#E8E4DC',
    glow: 'rgba(139,107,145,0.35)',
    subtitleColor: '#8B6B91',
  },
}

export function ReikiLogo({
  iconSize = 32,
  showText = true,
  variant = 'green',
  title = 'Fundación Reiki',
  subtitle = 'Usui Shiki Ryoho',
  href = '/',
  className = '',
}: ReikiLogoProps) {
  const v = VARIANTS[variant]
  const fontSize = Math.round(iconSize * 0.45)
  const borderRadius = Math.round(iconSize * 0.28)

  const icon = (
    <div
      className="flex shrink-0 items-center justify-center font-serif font-bold transition-transform duration-300 select-none group-hover:scale-105"
      style={{
        width: iconSize,
        height: iconSize,
        borderRadius,
        background: v.bg,
        color: v.color,
        fontSize,
        boxShadow: `0 4px 16px ${v.glow}`,
        letterSpacing: '-0.02em',
      }}
      aria-hidden="true"
    >
      霊
    </div>
  )

  const text = showText && (
    <div className="flex flex-col justify-center">
      <span
        className="font-serif leading-none font-bold tracking-wide italic"
        style={{ color: '#E8E4DC', fontSize: Math.round(iconSize * 0.44) }}
      >
        {title}
      </span>
      <span
        className="mt-0.5 leading-none font-black tracking-[0.2em] uppercase"
        style={{
          color: v.subtitleColor,
          fontSize: Math.round(iconSize * 0.25),
        }}
      >
        {subtitle}
      </span>
    </div>
  )

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {icon}
      {text}
    </Link>
  )
}

/**
 * Versión solo ícono (para sidebars colapsados o avatares)
 */
export function ReikiLogoIcon({
  size = 32,
  variant = 'green',
}: {
  size?: number
  variant?: 'green' | 'gold' | 'violet'
}) {
  const v = VARIANTS[variant]
  const fontSize = Math.round(size * 0.45)
  const borderRadius = Math.round(size * 0.28)

  return (
    <div
      className="flex shrink-0 items-center justify-center font-serif font-bold select-none"
      style={{
        width: size,
        height: size,
        borderRadius,
        background: v.bg,
        color: v.color,
        fontSize,
        boxShadow: `0 4px 16px ${v.glow}`,
      }}
      aria-label="Logo Fundación Reiki"
    >
      霊
    </div>
  )
}
