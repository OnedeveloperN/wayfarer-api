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
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/">
          <span className="font-display text-xl font-bold text-primary">Wayfarer</span>
        </Link>

        <div className="flex items-center gap-6">
          {ENLACES.map(({ to, etiqueta }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {etiqueta}
            </NavLink>
          ))}

          {usuarioActual ? (
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container font-display text-sm font-semibold text-on-surface-variant">
                {usuarioActual.nombre.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-sm text-on-surface-variant sm:inline">
                {usuarioActual.nombre}
              </span>
              <Button variant="outline" className="px-4 py-2" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Button className="px-4 py-2" onClick={() => setModalAbierto(true)}>
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
