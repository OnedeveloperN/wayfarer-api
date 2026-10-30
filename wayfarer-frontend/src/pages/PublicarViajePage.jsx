import { useNavigate } from 'react-router-dom'
import { useViajes } from '@/hooks/useViajes.js'
import { useUsuario } from '@/hooks/useUsuario.js'
import ViajeForm from '@/components/ViajeForm.jsx'

function PublicarViajePage() {
  const { crearViaje } = useViajes()
  const { usuarioActual } = useUsuario()
  const navigate = useNavigate()

  // Ya no asumimos que siempre hay alguien logueado: si no hay usuario,
  // mostramos un mensaje en vez del formulario.
  if (!usuarioActual) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8 text-center">
        <h1 className="font-display text-2xl font-bold text-on-surface">
          Iniciá sesión para publicar un viaje
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Usá el botón "Iniciar sesión" en la barra superior para elegir tu usuario o crear uno nuevo.
        </p>
      </div>
    )
  }

  async function handleCrear(datos) {
    await crearViaje({ ...datos, conductor: usuarioActual._id })
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-on-surface">Publicar viaje</h1>
      <p className="mt-1 text-sm text-on-surface-variant">
        Completa los datos y tu viaje quedará visible al instante.
      </p>

      <div className="mt-6">
        <ViajeForm onSubmit={handleCrear} textoBoton="Publicar viaje" />
      </div>
    </div>
  )
}

export default PublicarViajePage
