import { createContext, useEffect, useState } from 'react'

const CLAVE_STORAGE = 'wayfarer_usuario'

export const UsuarioContext = createContext(null)

export function UsuarioProvider({ children }) {
  // Al cargar la app, si había una sesión guardada en localStorage, la recuperamos.
  // Si no hay nadie, arrancamos en null: eso ahora es un estado válido
  // ("navegando sin usuario"), no un error.
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    return guardado ? JSON.parse(guardado) : null
  })

  // Cada vez que cambia el usuario actual, sincronizamos con localStorage,
  // así la sesión persiste si recargás la página.
  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarioActual))
    } else {
      localStorage.removeItem(CLAVE_STORAGE)
    }
  }, [usuarioActual])

  function iniciarSesion(usuario) {
    setUsuarioActual(usuario)
  }

  function cerrarSesion() {
    setUsuarioActual(null)
  }

  return (
    <UsuarioContext.Provider value={{ usuarioActual, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  )
}
