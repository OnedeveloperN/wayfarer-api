import { useContext } from 'react'
import { UsuarioContext } from '@/context/UsuarioContext.jsx'

export function useUsuario() {
  const contexto = useContext(UsuarioContext)

  // Esto detecta que falte el <UsuarioProvider> envolviendo la app
  // (un error de programación). Ya NO significa "no hay usuario logueado":
  // eso ahora se revisa mirando contexto.usuarioActual, que puede ser null
  // perfectamente (alguien navegando sin haber iniciado sesión).
  if (contexto === null) {
    throw new Error('useUsuario debe usarse dentro de un UsuarioProvider')
  }

  return contexto
}
