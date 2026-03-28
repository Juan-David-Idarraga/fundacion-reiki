export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-stone-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
        <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">Cargando Intranet...</p>
      </div>
    </div>
  );
}