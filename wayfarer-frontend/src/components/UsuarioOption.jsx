function UsuarioOption({ _id, nombre, email, onSeleccionar }) {
  return (
    <button
      onClick={() => onSeleccionar({ _id, nombre, email })}
      className="flex w-full items-center gap-3 rounded-md border border-outline-variant px-3 py-2 text-left hover:bg-surface-container"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container font-display text-xs font-semibold text-on-surface-variant">
        {nombre.charAt(0).toUpperCase()}
      </span>
      <span>
        <span className="block text-sm font-medium text-on-surface">{nombre}</span>
        <span className="block text-xs text-on-surface-variant">{email}</span>
      </span>
    </button>
  )
}

export default UsuarioOption
