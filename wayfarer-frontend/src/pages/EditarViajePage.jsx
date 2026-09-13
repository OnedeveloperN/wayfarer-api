import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as api from '@/services/api.js'
import { useUsuario } from '@/hooks/useUsuario.js'
import ViajeForm from '@/components/ViajeForm.jsx'
import { LoadingState, ErrorState } from '@/components/EstadoCarga.jsx'

function EditarViajePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuarioActual } = useUsuario()

  const [estado, setEstado] = useState({ viaje: null, loading: true, error: null })

  useEffect(() => {
    api
      .getViajeById(id)
      .then((viaje) => setEstado({ viaje, loading: false, error: null }))
      .catch((error) => setEstado({ viaje: null, loading: false, error: error.message }))
  }, [id])

  async function handleActualizar(datos) {
    await api.actualizarViaje(id, datos, usuarioActual?._id)
    navigate('/')
  }

  if (estado.loading) return <LoadingState mensaje="Cargando viaje..." />
  if (estado.error) return <ErrorState mensaje={estado.error} />

  // getViajeById no popula "conductor", así que acá es directamente el id (string).
  const esPropio = usuarioActual && estado.viaje.conductor === usuarioActual._id

  if (!esPropio) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8 text-center">
        <h1 className="font-display text-2xl font-bold text-on-surface">
          No podés editar este viaje
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Solo el usuario que publicó el viaje puede modificarlo.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-on-surface">Editar viaje</h1>
      <p className="mt-1 text-sm text-on-surface-variant">
        {estado.viaje.origen} → {estado.viaje.destino}
      </p>

      <div className="mt-6">
        <ViajeForm
          valoresIniciales={estado.viaje}
          onSubmit={handleActualizar}
          textoBoton="Guardar cambios"
        />
      </div>
    </div>
  )
}

export default EditarViajePage
