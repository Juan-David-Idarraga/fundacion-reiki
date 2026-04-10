import React from 'react'

/**
 * loading.tsx — Intranet Layout Skeleton
 *
 * Next.js App Router muestra automáticamente este componente mientras el
 * Server Component del layout (que hace await supabase.auth.getUser()) está
 * resolviendo. Esto elimina el error de "Uncached data outside <Suspense>"
 * y permite que la navegación se transmita (stream) correctamente sin
 * bloquear el renderizado.
 */
export default function IntranetLoading() {
  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ backgroundColor: '#1A1C18', color: '#E8E4DC' }}
    >
      {/* ── SIDEBAR SKELETON ── */}
      <aside
        className="hidden w-64 shrink-0 flex-col lg:flex"
        style={{ backgroundColor: '#141510', borderRight: '1px solid #2A2C24' }}
      >
        {/* Logo placeholder */}
        <div
          className="flex h-16 shrink-0 items-center px-5"
          style={{ borderBottom: '1px solid #2A2C24' }}
        >
          <div className="flex w-full items-center gap-3">
            <div
              className="h-8 w-8 shrink-0 animate-pulse rounded-xl"
              style={{ backgroundColor: '#272A23' }}
            />
            <div className="flex flex-1 flex-col gap-1.5">
              <div
                className="h-3 w-24 animate-pulse rounded-full"
                style={{ backgroundColor: '#272A23' }}
              />
              <div
                className="h-2 w-16 animate-pulse rounded-full"
                style={{ backgroundColor: '#1E2019' }}
              />
            </div>
          </div>
        </div>

        {/* Nav links placeholder */}
        <nav className="flex-1 space-y-2 px-3 py-6">
          <div
            className="mb-4 ml-4 h-2 w-20 animate-pulse rounded-full"
            style={{ backgroundColor: '#1E2019' }}
          />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-3 rounded-xl px-4 py-2.5"
              style={{ backgroundColor: i === 1 ? '#1E2019' : 'transparent' }}
            >
              <div
                className="h-4 w-4 shrink-0 rounded-lg"
                style={{ backgroundColor: '#272A23' }}
              />
              <div
                className="h-2.5 rounded-full"
                style={{
                  backgroundColor: '#272A23',
                  width: `${[70, 85, 75, 65, 55][i - 1]}%`,
                }}
              />
            </div>
          ))}
        </nav>

        {/* User info placeholder */}
        <div
          className="m-3 animate-pulse rounded-2xl p-4"
          style={{ backgroundColor: '#1E2019' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 shrink-0 rounded-xl"
              style={{ backgroundColor: '#272A23' }}
            />
            <div className="flex flex-1 flex-col gap-1.5">
              <div
                className="h-2.5 w-20 rounded-full"
                style={{ backgroundColor: '#272A23' }}
              />
              <div
                className="h-2 w-28 rounded-full"
                style={{ backgroundColor: '#272A23' }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT SKELETON ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header placeholder */}
        <header
          className="flex h-16 shrink-0 items-center justify-between px-6 lg:px-10"
          style={{
            backgroundColor: '#1E2019',
            borderBottom: '1px solid #2A2C24',
          }}
        >
          <div className="flex flex-col gap-1.5">
            <div
              className="h-4 w-36 animate-pulse rounded-full"
              style={{ backgroundColor: '#272A23' }}
            />
            <div
              className="h-2.5 w-24 animate-pulse rounded-full"
              style={{ backgroundColor: '#272A23' }}
            />
          </div>
          <div
            className="h-8 w-8 animate-pulse rounded-xl"
            style={{ backgroundColor: '#272A23' }}
          />
        </header>

        {/* Content area placeholder */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Stats row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl p-6"
                  style={{ backgroundColor: '#272A23' }}
                >
                  <div
                    className="mb-4 h-10 w-10 rounded-2xl"
                    style={{ backgroundColor: '#1E2019' }}
                  />
                  <div
                    className="mb-2 h-7 w-16 rounded-full"
                    style={{ backgroundColor: '#1E2019' }}
                  />
                  <div
                    className="h-2.5 w-24 rounded-full"
                    style={{ backgroundColor: '#1E2019' }}
                  />
                </div>
              ))}
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl p-6"
                  style={{ backgroundColor: '#272A23' }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-2xl"
                      style={{ backgroundColor: '#1E2019' }}
                    />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div
                        className="h-3 w-28 rounded-full"
                        style={{ backgroundColor: '#1E2019' }}
                      />
                      <div
                        className="h-2 w-20 rounded-full"
                        style={{ backgroundColor: '#1E2019' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-2.5 rounded-full"
                        style={{
                          backgroundColor: '#1E2019',
                          width: `${[90, 75, 60][j - 1]}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
