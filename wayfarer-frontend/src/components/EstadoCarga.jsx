export function LoadingState({ mensaje = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-on-surface-variant">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-outline-variant border-t-primary" />
      <p className="text-sm">{mensaje}</p>
    </div>
  )
}

export function ErrorState({ mensaje, onReintentar }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-error-container px-6 py-10 text-center">
      <p className="font-display font-semibold text-on-error-container">
        Algo salió mal
      </p>
      <p className="text-sm text-on-error-container">{mensaje}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="mt-2 rounded-full bg-on-error-container px-5 py-2 text-sm font-medium text-white hover:cursor-pointer"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ mensaje }) {
  return (
    <div className="rounded-2xl border border-dashed border-outline-variant px-6 py-16 text-center text-sm text-on-surface-variant">
      {mensaje}
    </div>
  )
}
