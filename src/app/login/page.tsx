import Link from "next/link";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await Promise.resolve(searchParams);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-amber-200 selection:text-stone-900 flex overflow-hidden">
      
      {/* ========== LADO IZQUIERDO: VISUAL PREMIUM ========== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800">
        
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Contenido visual */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12 text-center space-y-8">
          
          {/* Logo grande */}
          <div className="space-y-6">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-4xl shadow-2xl shadow-amber-500/50 border border-amber-200/30">
              CR
            </div>
            
            <div className="space-y-3">
              <h2 className="font-serif text-4xl font-bold text-white leading-tight">
                Centro de <span className="text-amber-400">Reiki</span>
              </h2>
              <p className="text-amber-100/70 text-base font-light leading-relaxed max-w-sm mx-auto">
                Accede a tu espacio de aprendizaje y desarrollo espiritual
              </p>
            </div>
          </div>

          {/* Características */}
          <div className="pt-8 space-y-6 max-w-sm">
            {[
              { icon: "✨", text: "Contenido exclusivo" },
              { icon: "🧘", text: "Guías personalizadas" },
              { icon: "📚", text: "Recursos de formación" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-left group">
                <div className="text-2xl transition-transform duration-300 group-hover:scale-125">{item.icon}</div>
                <span className="text-amber-50/80 font-light text-sm">{item.text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      </div>

      {/* ========== LADO DERECHO: FORMULARIO ========== */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        
        <div className="w-full max-w-sm space-y-12">

          {/* Header */}
          <div className="space-y-6 text-center">
            
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-amber-400/30 border border-amber-200/50">
                CR
              </div>
            </div>

            {/* Título */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Bienvenido
              </h1>
              <p className="text-stone-500 text-sm sm:text-base font-light leading-relaxed">
                Ingresa con las credenciales que tu maestro te proporcionó
              </p>
            </div>
          </div>

          {/* Error Message */}
          {params.error && (
            <div className="rounded-lg bg-red-50/80 border border-red-200/50 p-4 sm:p-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-red-700 text-sm sm:text-base font-medium leading-relaxed">
                {params.error}
              </p>
              <p className="text-red-600/70 text-xs sm:text-sm font-light">
                Verifica tus datos e intenta nuevamente
              </p>
            </div>
          )}

          {/* Formulario */}
          <form action={loginAction} className="space-y-8">
            
            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 tracking-wide">
                Correo Electrónico
              </label>
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-5 py-4 text-base text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none hover:border-stone-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-semibold text-stone-700 tracking-wide">
                Contraseña
              </label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-5 py-4 text-base text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none hover:border-stone-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:from-amber-500 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-base tracking-wide"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-xs text-stone-400 font-light">o</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Footer Link */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:text-amber-600 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Volver a la página principal</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
