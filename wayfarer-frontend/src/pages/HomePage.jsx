import { useState } from 'react'
import { useViajes } from '@/hooks/useViajes.js'
import { useUsuario } from '@/hooks/useUsuario.js'
import SearchBar from '@/components/SearchBar.jsx'
import ViajeCard from '@/components/ViajeCard.jsx'
import { LoadingState, ErrorState, EmptyState } from '@/components/EstadoCarga.jsx'

const FILTRO_INICIAL = { origen: '', destino: '' }

function HomePage() {
  const { viajes, loading, error, recargar, eliminarViaje } = useViajes()
  const { usuarioActual } = useUsuario()

  const [filtro, setFiltro] = useState(FILTRO_INICIAL)

  const viajesFiltrados = viajes.filter((viaje) => {
    const coincideOrigen = viaje.origen
      .toLowerCase()
      .includes(filtro.origen.toLowerCase())
    const coincideDestino = viaje.destino
      .toLowerCase()
      .includes(filtro.destino.toLowerCase())
    return coincideOrigen && coincideDestino
  })

  async function handleEliminar(id) {
    // El botón "Eliminar" solo se muestra si el viaje es del usuario actual
    // (ver ViajeCard), así que acá siempre debería haber un usuarioActual.
    // Igual el backend vuelve a verificar la propiedad, por las dudas.
    await eliminarViaje(id, usuarioActual?._id)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-on-surface">¿A dónde quieres ir?</h1>
      <p className="mt-1 text-sm text-on-surface-variant">
        Encuentra conductores de confianza para tu próximo viaje.
      </p>

      <div className="mt-6">
        <SearchBar onBuscar={setFiltro} />
      </div>

      <div className="mt-8">
        {loading && <LoadingState mensaje="Cargando viajes..." />}

        {!loading && error && <ErrorState mensaje={error} onReintentar={recargar} />}

        {!loading && !error && viajesFiltrados.length === 0 && (
          <EmptyState mensaje="No hay viajes que coincidan con tu búsqueda." />
        )}

        {!loading && !error && viajesFiltrados.length > 0 && (
          <>
            <p className="mb-4 text-sm text-on-surface-variant">
              {viajesFiltrados.length} viaje{viajesFiltrados.length !== 1 && 's'} encontrado
              {viajesFiltrados.length !== 1 && 's'}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {viajesFiltrados.map(({ _id, ...viaje }) => (
                <ViajeCard key={_id} _id={_id} {...viaje} onEliminar={handleEliminar} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
