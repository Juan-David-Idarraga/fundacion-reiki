'use client'

/**
 * MobileNav — Componente de navegación móvil (drawer lateral)
 *
 * IMPORTANTE: Este es un Client Component. Next.js App Router prohíbe pasar
 * componentes React (como íconos de Lucide) desde Server Components a Client
 * Components como props, porque no son objetos planos serializables.
 *
 * Solución: los íconos se resuelven INTERNAMENTE mediante un mapa de strings
 * (iconId → componente). Los layouts solo pasan strings en sus navLinks.
 */

import React, { useState, useEffect, startTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  LogOut,
  BookOpen,
  Calendar,
  User,
  FolderOpen,
  MonitorPlay,
  Activity,
  Users,
  Video,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react'

// ── Mapa de íconos disponibles (solo strings se pasan como props) ──────────
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Calendar,
  User,
  FolderOpen,
  MonitorPlay,
  Activity,
  Users,
  Video,
  Bell,
  Settings,
}

// ── Tipos serializables (sin componentes React) ───────────────────────────
export interface NavLinkPlain {
  href: string
  label: string
  iconId: string // clave del ICON_MAP
  iconColor?: string
}

interface MobileNavProps {
  links: NavLinkPlain[]
  userName: string
  userRole: string
  avatarInitials: string
  avatarGradient: string
  roleColor: string
  title?: string
  titleColor?: string
  /** Slot para el botón de logout (evita pasar Server Actions como props) */
  logoutSlot?: React.ReactNode
}

export function MobileNav({
  links,
  userName,
  userRole,
  avatarInitials,
  avatarGradient,
  roleColor,
  title = 'Fundación Reiki',
  titleColor = '#4A8C42',
  logoutSlot,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Cierra el drawer al navegar
  useEffect(() => {
    startTransition(() => setIsOpen(false))
  }, [pathname])

  // Bloquea scroll del body mientras el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('overlay-active')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('overlay-active')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('overlay-active')
    }
  }, [isOpen])

  return (
    <>
      {/* ── BOTÓN HAMBURGUESA (solo visible en < lg) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú de navegación"
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-all active:scale-95 lg:hidden"
        style={{
          backgroundColor: 'var(--color-surface-card)',
          color: 'var(--color-reiki-white)',
          border: '1px solid var(--color-border)',
          zIndex: 'var(--z-index-persistent-bars)',
        }}
      >
        <Menu size={18} />
      </button>

      {/* ── OVERLAY OSCURO ── */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 'var(--z-index-overlay)',
          }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── DRAWER LATERAL ── */}
      <div
        className="fixed inset-y-0 left-0 flex w-72 flex-col transition-transform duration-300 ease-in-out lg:hidden"
        style={{
          backgroundColor: 'var(--color-sidebar)',
          borderRight: '1px solid var(--color-sidebar-border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isOpen ? '4px 0 32px rgba(0,0,0,0.5)' : 'none',
          zIndex: 'var(--z-index-sidebar)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header del drawer */}
        <div
          className="flex h-16 shrink-0 items-center justify-between px-5"
          style={{ borderBottom: '1px solid #2A2C24' }}
        >
          <span
            className="font-serif text-base font-bold italic"
            style={{ color: '#E8E4DC' }}
          >
            Fundación <span style={{ color: titleColor }}>Reiki</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
            className="flex h-8 w-8 items-center justify-center rounded-xl transition-all active:scale-95"
            style={{ backgroundColor: '#272A23', color: '#9A9589' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Subtítulo del panel */}
        <div className="px-5 pt-4 pb-2">
          <p
            className="text-[9px] font-black tracking-[0.25em] uppercase"
            style={{ color: '#5A5750' }}
          >
            {title}
          </p>
        </div>

        {/* Links de navegación */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {links.map(({ href, label, iconId, iconColor }) => {
            const Icon = ICON_MAP[iconId]
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase transition-all hover:bg-[#272A23] focus-visible:ring-2 focus-visible:ring-[#4A8C42] focus-visible:outline-none active:bg-[#363830]"
                style={{
                  color: isActive ? '#E8E4DC' : '#9A9589',
                  backgroundColor: isActive ? '#272A23' : 'transparent',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {Icon && (
                  <Icon
                    size={16}
                    className="shrink-0"
                    style={{ color: iconColor || '#4A8C42' }}
                  />
                )}
                <span className="truncate">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer: usuario + logout */}
        <div
          className="shrink-0 p-4"
          style={{ borderTop: '1px solid #2A2C24' }}
        >
          <div
            className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3"
            style={{ backgroundColor: '#1E2019' }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-md"
              style={{ background: avatarGradient, color: '#E8E4DC' }}
            >
              {avatarInitials}
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-xs font-bold"
                style={{ color: '#E8E4DC' }}
              >
                {userName}
              </p>
              <p
                className="text-[8px] font-black tracking-widest uppercase"
                style={{ color: roleColor }}
              >
                {userRole}
              </p>
            </div>
          </div>
          {/* logoutSlot: se inyecta desde el layout (LogoutButtonIntranet o LogoutButtonAdmin) */}
          {logoutSlot}
        </div>
      </div>
    </>
  )
}
