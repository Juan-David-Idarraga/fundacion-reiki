export default function Loading() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: '#1A1C18' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4"
          style={{
            borderColor: 'rgba(74,140,66,0.2)',
            borderTopColor: '#4A8C42',
          }}
        />
        <p
          className="font-serif text-sm font-bold tracking-widest uppercase italic"
          style={{ color: '#5A5750' }}
        >
          Conectando con tu energía...
        </p>
      </div>
    </div>
  )
}
