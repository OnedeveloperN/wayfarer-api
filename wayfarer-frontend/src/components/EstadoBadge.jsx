import { ESTADOS_VIAJE } from '@/config/constants.js'

const ESTILOS_POR_ESTADO = {
  [ESTADOS_VIAJE.ACTIVO]: 'bg-primary-container text-on-primary-container',
  [ESTADOS_VIAJE.COMPLETO]: 'bg-surface-container-high text-on-surface-variant',
  [ESTADOS_VIAJE.CANCELADO]: 'bg-error-container text-on-error-container',
  [ESTADOS_VIAJE.FINALIZADO]: 'bg-surface-container text-on-surface-variant',
}

function EstadoBadge({ estado }) {
  const estilo = ESTILOS_POR_ESTADO[estado] ?? ESTILOS_POR_ESTADO[ESTADOS_VIAJE.ACTIVO]

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${estilo}`}>
      {estado}
    </span>
  )
}

export default EstadoBadge
