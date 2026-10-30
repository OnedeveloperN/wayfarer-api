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

  const viajesFiltrados = (Array.isArray(viajes) ? viajes : []).filter((viaje) => {
    const coincideOrigen = (viaje.origen || '')
      .toLowerCase()
      .includes(filtro.origen.toLowerCase())
    const coincideDestino = (viaje.destino || '')
      .toLowerCase()
      .includes(filtro.destino.toLowerCase())
    return coincideOrigen && coincideDestino
  })

  async function handleEliminar(id) {
    // El botón "Eliminar" solo se muestra si el viaje es del usuario actual o administrador.
    await eliminarViaje(id, usuarioActual?._id)
  }

  return (
    <div>
      {/* HERO BANNER CON IMAGEN */}
      <section className="relative h-[340px] w-full overflow-hidden bg-slate-900 sm:h-[400px]">
        {/* Imagen de fondo */}
        <img
          src="/hero-banner.webp"
          alt="Personas viajando en auto por la carretera"
          className="h-full w-full object-cover object-center opacity-80"
        />

        {/* Degradado oscuro para asegurar contraste y visibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Título y bajada en Bottom / Left */}
        <div className="absolute bottom-6 left-6 max-w-xl p-2 sm:bottom-10 sm:left-12">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-md">
            ¿A dónde quieres ir?
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-200 sm:text-lg drop-shadow">
            Encuentra conductores de confianza para tu próximo viaje.
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL: BÚSQUEDA Y VIAJES */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mt-2">
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
      </main>
    </div>
  )
}

export default HomePage