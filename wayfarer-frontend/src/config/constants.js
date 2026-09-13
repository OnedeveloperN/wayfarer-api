// Constantes de configuración del entorno.
// Siempre en UPPER_SNAKE_CASE, nunca escritas directamente en los componentes.

export const API_BASE_URL = import.meta.env.VITE_API_URL

export const ESTADOS_VIAJE = {
  ACTIVO: 'activo',
  COMPLETO: 'completo',
  CANCELADO: 'cancelado',
  FINALIZADO: 'finalizado',
}
