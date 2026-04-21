import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // 1. Obtenemos las variables de forma segura (Lee ambas por si acaso)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    // Si por alguna razón Vercel no lee las variables, evitamos el colapso 500
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Advertencia: Variables de Supabase no encontradas en el Middleware.')
      return response
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Redirigir a /login si no hay usuario y se intenta acceder a rutas protegidas
    if (
      !user &&
      (pathname.startsWith('/admin') || pathname.startsWith('/intranet'))
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirigir a /intranet si hay usuario y se intenta acceder a /login
    if (user && pathname === '/login') {
      return NextResponse.redirect(new URL('/intranet', request.url))
    }

    return response
    
  } catch (error) {
    // 2. CHALECO ANTIBALAS: Si algo falla, dejamos pasar la petición para no dar pantalla blanca
    console.error('Error en el Middleware de Supabase:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // 3. CORRECCIÓN SINTÁCTICA: Doble barra invertida (\\.) para Vercel Edge Runtime
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}