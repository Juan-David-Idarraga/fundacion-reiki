import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
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
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     * - .svg, .png, .jpg, .jpeg, .gif, .webp (image files)
     * - /api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|.*\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}
