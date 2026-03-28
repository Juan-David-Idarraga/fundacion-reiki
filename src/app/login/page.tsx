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
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-stone-50 to-amber-50/30 font-sans text-stone-800 selection:bg-amber-200 selection:text-stone-900 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-200/10 rounded-full blur-[80px] mix-blend-multiply"></div>
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-amber-100/15 rounded-full blur-[90px] mix-blend-multiply"></div>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Tarjeta de login */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_40px_rgba(217,119,6,0.1)] border border-stone-200/50 transition-all duration-300 hover:shadow-[0_25px_50px_rgba(217,119,6,0.15)]">
          
          {/* Header con logo y título */}
          <div className="mb-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 flex items-center justify-center text-amber-950 font-serif font-bold text-lg shadow-lg shadow-amber-300/50 border border-amber-100 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                CR
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
                Acceso <span className="text-amber-600">Alumnos</span>
              </h1>
              <p className="text-sm md:text-base text-stone-600 font-light">
                Ingresa con las credenciales entregadas por tu maestro
              </p>
            </div>
          </div>

          {/* Mensaje de error */}
          {params.error && (
            <div className="mb-6 rounded-xl border border-red-200/50 bg-red-50/80 backdrop-blur-sm p-4 text-center space-y-1 animate-pulse">
              <p className="text-sm font-semibold text-red-700">{params.error}</p>
              <p className="text-xs text-red-600 font-light">Por favor, verifica tus datos e intenta nuevamente</p>
            </div>
          )}

          {/* Formulario */}
          <form action={loginAction} className="space-y-5">
            
            {/* Campo de email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-stone-700" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  required
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 group-hover:border-stone-300 group-hover:bg-stone-50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v-1.5a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v1.5m19.5 0h-15m0 0H3.75m15 0H9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-stone-700" htmlFor="password">
                Contraseña
              </label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 group-hover:border-stone-300 group-hover:bg-stone-50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full mt-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-600/30 transition-all duration-300 hover:from-amber-500 hover:to-amber-400 hover:shadow-amber-600/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-amber-600/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
            <span className="text-xs text-stone-400 font-light">o</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
          </div>

          {/* Enlace a página principal */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:text-amber-600 hover:gap-3 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver a la página principal
            </Link>
          </div>

        </div>

        {/* Footer informativo */}
        <div className="mt-6 text-center text-xs text-stone-500 font-light">
          <p>¿Problemas para acceder? Contacta con tu maestro</p>
        </div>

      </div>

    </div>
  );
}
