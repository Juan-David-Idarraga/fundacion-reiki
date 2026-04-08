import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Centro de Reiki | Sanación Energética y Formación en Reiki Usui',
  description: 'Sanación energética integral con Reiki Usui. Terapias presenciales y online, formaciones completas, y acompañamiento personalizado con Daniel Riquelme, maestro certificado.',
  keywords: ['Reiki', 'Sanación', 'Terapia energética', 'Reiki Usui', 'Formación Reiki', 'Rancagua'],
  openGraph: {
    title: 'Centro de Reiki | Sanación Energética',
    description: 'Descubre el poder transformador del Reiki Usui. Terapias y formaciones personalizadas.',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro de Reiki | Sanación Energética',
    description: 'Terapias y formaciones de Reiki Usui con Daniel Riquelme',
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
})

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <NextTopLoader showSpinner={false} height={2} color="#2D5A27" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Analytics />
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
