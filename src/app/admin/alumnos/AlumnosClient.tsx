'use client'

import React from 'react'
import {
  UserMinus,
  UserCheck,
  CalendarPlus,
  CalendarMinus,
  Trash2,
  Mail,
  ShieldAlert,
  Clock,
  Search,
  Lock,
  Plus,
  Minus,
} from 'lucide-react'
import { formatDateLatam, getExpirationStatus } from '@/utils/date-format'
// Importamos la acción de registro junto a las demás
import {
  actualizarEstadoAlumnoAction,
  extenderAccesoAction,
  eliminarAlumnoAction,
  registrarAlumnoAction,
} from '../actions'

export default function AlumnosClient({ alumnos }: { alumnos: any[] }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden xl:flex-row">
      {/* ================= LISTADO DE ALUMNOS ================= */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold tracking-tight text-[#E8E4DC] uppercase">
            Comunidad de Estudiantes
          </h2>
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-[#5A5750]"
              size={16}
            />
            <input
              placeholder="Buscar alumno..."
              className="w-64 rounded-full border border-[rgba(74,140,66,0.12)] bg-white py-2 pr-4 pl-10 text-xs shadow-sm outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {alumnos.map((alumno) => (
            <div
              key={alumno.id}
              className={`flex flex-col items-center justify-between gap-6 rounded-[24px] border bg-white p-6 shadow-sm transition-all md:flex-row ${alumno.estado === 'suspendido' ? 'border-red-100 opacity-75' : 'border-[rgba(74,140,66,0.12)] hover:border-[rgba(201,162,39,0.25)]'}`}
            >
              <div className="flex flex-1 items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${alumno.estado === 'suspendido' ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-[#9A9589]'}`}
                >
                  {alumno.nombre
                    ? alumno.nombre.substring(0, 2).toUpperCase()
                    : '??'}
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-[#E8E4DC]">
                    {alumno.nombre}
                    {alumno.estado === 'suspendido' && (
                      <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] text-white uppercase">
                        Acceso Cortado
                      </span>
                    )}
                  </h3>
                  <div className="mt-1 flex items-center gap-4">
                    <p className="flex items-center gap-1 text-xs text-[#5A5750]">
                      <Mail size={12} /> {alumno.email}
                    </p>
                    {(() => {
                      const status = getExpirationStatus(alumno.vencimiento)
                      return (
                        <p
                          className={`flex items-center gap-1 text-xs font-bold ${status.color}`}
                        >
                          <Clock size={12} /> {status.message}
                        </p>
                      )
                    })()}
                  </div>
                </div>
              </div>

              {/* BOTONES DE ADMINISTRACIÓN */}
              <div className="flex shrink-0 items-center gap-3">
                {/* GESTIÓN DE DÍAS (SUMAR/RESTAR) */}
                <div className="flex items-center gap-1 rounded-2xl border border-[rgba(74,140,66,0.12)] bg-stone-50 p-1">
                  <form
                    action={extenderAccesoAction}
                    onSubmit={(e) => {
                      if (
                        !confirm(
                          '¿Estás seguro de RESTAR 30 días de acceso a este alumno?',
                        )
                      )
                        e.preventDefault()
                    }}
                  >
                    <input type="hidden" name="id" value={alumno.id} />
                    <input type="hidden" name="dias" value="-30" />
                    <button
                      type="submit"
                      title="Restar 30 días"
                      className="rounded-xl p-2 text-red-600 transition-all hover:bg-red-50"
                    >
                      <CalendarMinus size={18} />
                    </button>
                  </form>

                  <div className="mx-1 h-4 w-px bg-stone-200"></div>

                  <form
                    action={extenderAccesoAction}
                    onSubmit={(e) => {
                      if (
                        !confirm(
                          '¿Estás seguro de SUMAR 30 días de acceso a este alumno?',
                        )
                      )
                        e.preventDefault()
                    }}
                  >
                    <input type="hidden" name="id" value={alumno.id} />
                    <input type="hidden" name="dias" value="30" />
                    <button
                      type="submit"
                      title="Sumar 30 días"
                      className="rounded-xl p-2 text-green-600 transition-all hover:bg-green-50"
                    >
                      <CalendarPlus size={18} />
                    </button>
                  </form>
                </div>

                <div className="mx-1 hidden h-8 w-px bg-stone-200 md:block"></div>

                <form action={actualizarEstadoAlumnoAction}>
                  <input type="hidden" name="id" value={alumno.id} />
                  <input
                    type="hidden"
                    name="estado"
                    value={alumno.estado === 'activo' ? 'suspendido' : 'activo'}
                  />
                  <button
                    className={`rounded-xl border p-2 transition-all ${alumno.estado === 'activo' ? 'border-[rgba(74,140,66,0.12)] bg-white text-[#5A5750] hover:text-red-600' : 'border-red-600 bg-red-600 text-white hover:bg-red-700'}`}
                  >
                    {alumno.estado === 'activo' ? (
                      <UserMinus size={18} />
                    ) : (
                      <UserCheck size={18} />
                    )}
                  </button>
                </form>

                <form
                  action={eliminarAlumnoAction}
                  onSubmit={(e) => {
                    if (
                      !confirm(
                        '¿Eliminar alumno? Se borrará su acceso de seguridad también.',
                      )
                    )
                      e.preventDefault()
                  }}
                >
                  <input type="hidden" name="id" value={alumno.id} />
                  <button className="rounded-xl p-2 text-stone-300 transition-all hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ASIDE: REGISTRO RÁPIDO ================= */}
      <aside className="w-full shrink-0 space-y-8 border-l border-[rgba(74,140,66,0.12)] bg-white p-8 xl:w-[350px]">
        <div className="rounded-3xl border border-[rgba(74,140,66,0.08)] bg-stone-50 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-[#E8E4DC]">
            <ShieldAlert size={18} className="text-amber-600" /> Registrar
            Alumno
          </h2>
          <p className="mb-6 text-[10px] leading-relaxed text-[#9A9589] italic">
            Al dar de alta, el sistema crea la cuenta de acceso y asigna los
            primeros 30 días automáticamente.
          </p>

          {/* FORMULARIO CONECTADO */}
          <form action={registrarAlumnoAction} className="space-y-4">
            <div>
              <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                Nombre Completo
              </label>
              <input
                name="nombre"
                required
                placeholder="Ej. Juan Pérez"
                className="w-full rounded-xl border border-[rgba(74,140,66,0.12)] bg-white p-3 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                Correo Electrónico
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="alumno@correo.com"
                className="w-full rounded-xl border border-[rgba(74,140,66,0.12)] bg-white p-3 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="ml-1 text-[10px] font-black tracking-widest text-[#5A5750] uppercase">
                Contraseña Inicial
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-[rgba(74,140,66,0.12)] bg-white p-3 pl-10 text-xs outline-none focus:border-amber-500"
                />
                <Lock
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-300"
                  size={14}
                />
              </div>
            </div>

            <button className="w-full rounded-2xl bg-stone-900 py-4 text-xs font-bold text-white shadow-xl transition-all hover:bg-stone-800 active:scale-95">
              Dar de Alta e Iniciar Acceso
            </button>
          </form>
        </div>

        <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <Clock className="shrink-0 text-blue-500" size={16} />
          <p className="text-[10px] leading-relaxed text-blue-700">
            <strong>Maestro Daniel:</strong> Una vez creado, dale el correo y la
            clave al alumno para que entre a su Intranet.
          </p>
        </div>
      </aside>
    </div>
  )
}
