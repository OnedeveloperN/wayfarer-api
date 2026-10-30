import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useUsuario } from '@/hooks/useUsuario.js'
import Button from '@/components/Button.jsx'
import AuthModal from '@/components/AuthModal.jsx'

const ENLACES = [
  { to: '/', etiqueta: 'Buscar' },
  { to: '/publicar', etiqueta: 'Publicar viaje' },
]

function Navbar() {
  const { usuarioActual, cerrarSesion } = useUsuario()
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <header className="border-b border-outline-variant bg-surface">
      {/* flex-col en mobile: logo arriba (fila 1), resto abajo (fila 2).
          A partir de "sm" pasa a una sola fila, como en desktop. */}
      <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
        <Link to="/" className="shrink-0">
          <span className="font-display text-lg font-bold text-primary sm:text-xl">
            Wayfarer
          </span>
        </Link>

        {/* Esta fila ocupa TODO el ancho en mobile (w-full + justify-between) */}
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {ENLACES.map(({ to, etiqueta }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `whitespace-nowrap text-sm font-medium transition ${
                    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                  }`
                }
              >
                {etiqueta}
              </NavLink>
            ))}
          </div>

          {usuarioActual ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container font-display text-xs font-semibold text-on-surface-variant sm:h-9 sm:w-9 sm:text-sm">
                {usuarioActual.nombre.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-sm text-on-surface-variant md:inline">
                {usuarioActual.nombre}
              </span>
              <Button
                variant="outline"
                className="whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Button
              className="whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
              onClick={() => setModalAbierto(true)}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </nav>

      {modalAbierto && <AuthModal onClose={() => setModalAbierto(false)} />}
    </header>
  )
}

export default Navbar
