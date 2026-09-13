import { Link } from 'react-router-dom'
import EstadoBadge from '@/components/EstadoBadge.jsx'
import Button from '@/components/Button.jsx'
import { useUsuario } from '@/hooks/useUsuario.js'

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function ViajeCard({
  _id,
  origen,
  destino,
  fecha,
  horaSalida,
  precioPorAsiento,
  asientosDisponibles,
  preferencias,
  estado,
  conductor,
  onEliminar,
}) {
  const { usuarioActual } = useUsuario()

  const nombreConductor =
    typeof conductor === 'object' && conductor !== null ? conductor.nombre : 'Conductor'

  // El conductor viene populado ({_id, nombre, email}) en /api/viajes,
  // pero por las dudas soportamos también el caso de que llegue como
  // string plano (solo el id).
  const idConductor =
    typeof conductor === 'object' && conductor !== null ? conductor._id : conductor

  const esPropio = Boolean(usuarioActual) && idConductor === usuarioActual._id

  return (
    <article className="elevation-1 rounded-lg bg-surface p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium text-on-surface-variant">
          {formatearFecha(fecha)}
          {horaSalida && <> · {horaSalida}</>}
        </div>
        <EstadoBadge estado={estado} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-col items-center">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-primary" />
          <span className="h-8 w-px bg-outline-variant" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <p className="font-display font-semibold text-on-surface">{origen}</p>
          <p className="mt-3 font-display font-semibold text-on-surface">{destino}</p>
        </div>
        <p className="font-display text-xl font-bold text-primary">
          {precioPorAsiento}€
        </p>
      </div>

      {preferencias?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {preferencias.map((preferencia) => (
            <span
              key={preferencia}
              className="rounded-full bg-surface-container px-2.5 py-1 text-xs text-on-surface-variant"
            >
              {preferencia}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-outline-variant pt-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container font-display text-xs font-semibold text-on-surface-variant">
            {nombreConductor.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm text-on-surface-variant">{nombreConductor}</span>
        </div>
        <span className="text-xs text-on-surface-variant">
          {asientosDisponibles} plaza{asientosDisponibles !== 1 && 's'} libre
          {asientosDisponibles !== 1 && 's'}
        </span>
      </div>

      {/* Solo el dueño del viaje ve estos botones */}
      {esPropio && (
        <div className="mt-4 flex gap-2">
          <Link to={`/viajes/${_id}/editar`} className="flex-1">
            <Button variant="outline" className="w-full">
              Editar
            </Button>
          </Link>
          <Button variant="secondary" onClick={() => onEliminar(_id)}>
            Eliminar
          </Button>
        </div>
      )}
    </article>
  )
}

export default ViajeCard
