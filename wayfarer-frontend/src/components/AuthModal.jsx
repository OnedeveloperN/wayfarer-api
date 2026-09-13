import { useEffect, useState } from 'react'
import * as api from '@/services/api.js'
import { useUsuario } from '@/hooks/useUsuario.js'
import Button from '@/components/Button.jsx'
import UsuarioOption from '@/components/UsuarioOption.jsx'

const VALORES_POR_DEFECTO = { nombre: '', email: '', password: '' }

// Agrupamos usuarios + cargando + error en un solo estado: los tres
// describen "cómo va la carga de la lista de usuarios" (mismo patrón
// que ESTADO_INICIAL en useViajes.js).
const ESTADO_USUARIOS_INICIAL = { usuarios: [], cargando: true, error: null }

// Agrupamos enviando + error del formulario de registro: los dos
// describen "cómo va el envío del formulario".
const ENVIO_INICIAL = { enviando: false, error: null }

function AuthModal({ onClose }) {
  const { iniciarSesion } = useUsuario()

  const [pestaña, setPestaña] = useState('elegir') // 'elegir' | 'crear' — no está relacionado a ningún otro estado
  const [estadoUsuarios, setEstadoUsuarios] = useState(ESTADO_USUARIOS_INICIAL)
  const [datosNuevo, setDatosNuevo] = useState(VALORES_POR_DEFECTO)
  const [envio, setEnvio] = useState(ENVIO_INICIAL)

  useEffect(() => {
    api
      .getUsuarios()
      .then((usuarios) => setEstadoUsuarios({ usuarios, cargando: false, error: null }))
      .catch((error) =>
        setEstadoUsuarios({ usuarios: [], cargando: false, error: error.message })
      )
  }, [])

  function handleElegir(usuario) {
    iniciarSesion(usuario)
    onClose()
  }

  function handleChangeNuevo(event) {
    const { name, value } = event.target
    setDatosNuevo((prev) => ({ ...prev, [name]: value }))
  }

  async function handleCrearUsuario(event) {
    event.preventDefault()
    setEnvio({ enviando: true, error: null })

    try {
      const usuarioCreado = await api.crearUsuario(datosNuevo)
      iniciarSesion(usuarioCreado)
      onClose()
    } catch (err) {
      setEnvio({ enviando: false, error: err.message })
    }
  }

  const { usuarios, cargando, error: errorUsuarios } = estadoUsuarios
  const errorVisible = pestaña === 'elegir' ? errorUsuarios : envio.error

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="elevation-1 w-full max-w-sm rounded-lg bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-on-surface">
            {pestaña === 'elegir' ? 'Iniciar sesión' : 'Crear usuario'}
          </h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 border-b border-outline-variant">
          <button
            onClick={() => setPestaña('elegir')}
            className={`px-3 pb-2 text-sm font-medium ${
              pestaña === 'elegir'
                ? 'border-b-2 border-primary text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            Usuario existente
          </button>
          <button
            onClick={() => setPestaña('crear')}
            className={`px-3 pb-2 text-sm font-medium ${
              pestaña === 'crear'
                ? 'border-b-2 border-primary text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            Crear usuario
          </button>
        </div>

        {errorVisible && (
          <p className="mt-4 rounded-md bg-error-container px-4 py-2 text-sm text-on-error-container">
            {errorVisible}
          </p>
        )}

        {/* Pestaña: elegir usuario existente */}
        {pestaña === 'elegir' && (
          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
            {cargando && (
              <p className="text-sm text-on-surface-variant">Cargando usuarios...</p>
            )}

            {!cargando && usuarios.length === 0 && (
              <p className="text-sm text-on-surface-variant">
                Todavía no hay usuarios creados. Probá la pestaña "Crear usuario".
              </p>
            )}

            {usuarios.map(({ _id, ...usuario }) => (
              <UsuarioOption
                key={_id}
                _id={_id}
                {...usuario}
                onSeleccionar={handleElegir}
              />
            ))}
          </div>
        )}

        {/* Pestaña: crear usuario nuevo */}
        {pestaña === 'crear' && (
          <form onSubmit={handleCrearUsuario} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={datosNuevo.nombre}
                onChange={handleChangeNuevo}
                required
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-on-surface-variant">Email</label>
              <input
                type="email"
                name="email"
                value={datosNuevo.email}
                onChange={handleChangeNuevo}
                required
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-on-surface-variant">Contraseña</label>
              <input
                type="password"
                name="password"
                value={datosNuevo.password}
                onChange={handleChangeNuevo}
                required
                minLength={6}
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <Button type="submit" disabled={envio.enviando} className="mt-2">
              {envio.enviando ? 'Creando...' : 'Crear usuario e ingresar'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
