import Link from "next/link";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  // Truco para leer si hay algún error en la URL (ej: /login?error=...)
  const params = await Promise.resolve(searchParams);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4 font-sans selection:bg-amber-200 selection:text-stone-900">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-stone-100">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-serif font-bold">
            CR
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Acceso Alumnos</h1>
          <p className="mt-2 text-sm text-stone-600">
            Ingresa con las credenciales entregadas por tu maestro.
          </p>
        </div>

        {/* MENSAJE DE ERROR (Solo aparece si pones mal la clave) */}
        {params.error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {params.error}
          </div>
        )}

        {/* FORMULARIO CONECTADO A LA ACCIÓN */}
        <form action={loginAction} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="alumno@correo.com"
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-stone-900 px-4 py-3.5 text-sm font-bold text-amber-400 shadow-md transition-all hover:bg-stone-800 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-stone-500 transition-colors hover:text-amber-700 hover:underline">
            ← Volver a la página principal
          </Link>
        </div>
        
      </div>
    </div>
  );
}