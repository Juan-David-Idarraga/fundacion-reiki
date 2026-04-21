'use client'

import { useState, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {/* Envolver children en Suspense soluciona el error de build en Next.js */}
      <Suspense fallback={<div>Cargando...</div>}>
        {children}
      </Suspense>
    </QueryClientProvider>
  )
}

export default ReactQueryProvider