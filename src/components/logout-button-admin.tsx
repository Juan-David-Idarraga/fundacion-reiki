'use client'

import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'

export function LogoutButtonAdmin() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all hover:text-[#E07060]"
        style={{ color: '#5A5750' }}
      >
        <LogOut size={14} /> Cerrar Sesión
      </button>
    </form>
  )
}
