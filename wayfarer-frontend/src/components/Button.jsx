const VARIANTES = {
  primary: 'bg-primary text-on-primary hover:bg-on-primary-container',
  secondary: 'bg-secondary text-on-secondary hover:bg-on-secondary-container',
  outline:
    'border border-outline-variant text-on-surface hover:bg-surface-container',
}

function Button({ variant = 'primary', className = '', children, ...props }) {
  const estiloVariante = VARIANTES[variant] ?? VARIANTES.primary

  return (
    <button
      className={`rounded-full px-6 py-3 text-sm font-semibold font-display transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${estiloVariante} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
