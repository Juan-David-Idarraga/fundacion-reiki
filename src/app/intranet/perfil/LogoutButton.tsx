'use client'

import React, { useState } from 'react'
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  logoutAction: (formData: FormData) => Promise<void>
}

export default function LogoutButton({ logoutAction }: LogoutButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="group flex items-center gap-2 rounded-xl px-6 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all active:scale-[0.98]"
        style={{
          backgroundColor: 'rgba(192,57,43,0.08)',
          color: isHovered ? '#E07060' : '#9A9589',
          border: `1px solid ${isHovered ? 'rgba(192,57,43,0.35)' : 'rgba(192,57,43,0.15)'}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LogOut
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Cerrar Sesión
      </button>
    </form>
  )
}
