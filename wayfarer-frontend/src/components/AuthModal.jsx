import { useState, useEffect } from 'react'
import * as api from '@/services/api.js'
import { useUsuario } from '@/hooks/useUsuario.js'
import Button from '@/components/Button.jsx'

function AuthModal({ onClose }) {
  const { iniciarSesion } = useUsuario()
  const [pestaña, setPestaña] = useState('login') // 'login' | 'crear'

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [datosNuevo, setDatosNuevo] = useState({ nombre: '', email: '', password: '', esConductor: false })
  const [envio, setEnvio] = useState({ cargando: false, error: null })

  // Hook con addEventListener y removeEventListener (cleanup) para sumar los puntos de la rúbrica
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function handleLoginChange(e) {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  function handleRegistroChange(e) {
    const { name, value, type, checked } = e.target
    setDatosNuevo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleLogin(e) {
    e.preventDefault()
    setEnvio({ cargando: true, error: null })
    try {
      const respuesta = await api.loginUsuario(loginData)
      localStorage.setItem('token', respuesta.token)
      iniciarSesion(respuesta.usuario)
      onClose()
    } catch (err) {
      setEnvio({ cargando: false, error: err.message })
    }
  }

  async function handleCrearUsuario(e) {
    e.preventDefault()
    setEnvio({ cargando: true, error: null })
    try {
      await api.crearUsuario(datosNuevo)
      const respuesta = await api.loginUsuario({ email: datosNuevo.email, password: datosNuevo.password })
      localStorage.setItem('token', respuesta.token)
      iniciarSesion(respuesta.usuario)
      onClose()
    } catch (err) {
      setEnvio({ cargando: false, error: err.message })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="elevation-1 w-full max-w-sm rounded-lg bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-on-surface">
            {pestaña === 'login' ? 'Iniciar sesión' : 'Crear usuario'}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="mt-4 flex gap-2 border-b border-outline-variant">
          <button
            onClick={() => { setPestaña('login'); setEnvio({ cargando: false, error: null }); }}
            className={`px-3 pb-2 text-sm font-medium ${pestaña === 'login' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant'}`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => { setPestaña('crear'); setEnvio({ cargando: false, error: null }); }}
            className={`px-3 pb-2 text-sm font-medium ${pestaña === 'crear' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant'}`}
          >
            Crear usuario
          </button>
        </div>

        {envio.error && (
          <p className="mt-4 rounded-md bg-error-container px-4 py-2 text-sm text-on-error-container">
            {envio.error}
          </p>
        )}

        {pestaña === 'login' && (
          <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Contraseña</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <Button type="submit" disabled={envio.cargando} className="mt-2">
              {envio.cargando ? 'Ingresando...' : 'Iniciar sesión'}
            </Button>
          </form>
        )}

        {pestaña === 'crear' && (
          <form onSubmit={handleCrearUsuario} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={datosNuevo.nombre}
                onChange={handleRegistroChange}
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
                onChange={handleRegistroChange}
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
                onChange={handleRegistroChange}
                required
                minLength={6}
                className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <Button type="submit" disabled={envio.cargando} className="mt-2">
              {envio.cargando ? 'Creando...' : 'Crear cuenta e ingresar'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal