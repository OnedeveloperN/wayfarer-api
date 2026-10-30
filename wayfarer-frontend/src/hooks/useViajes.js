import { useCallback, useEffect, useState } from 'react'
import * as api from '@/services/api.js'

const ESTADO_INICIAL = {
  viajes: [],
  loading: true,
  error: null,
}

export function useViajes() {
  const [estado, setEstado] = useState(ESTADO_INICIAL)

  const cargarViajes = useCallback(() => {
    setEstado((prev) => ({ ...prev, loading: true, error: null }))

    api
      .getViajes()
      .then((viajes) => setEstado({ viajes, loading: false, error: null }))
      .catch((error) =>
        setEstado({ viajes: [], loading: false, error: error.message })
      )
  }, [])

  useEffect(() => {
    cargarViajes()
  }, [cargarViajes])

  async function crearViaje(datosViaje) {
    const nuevoViaje = await api.crearViaje(datosViaje)
    cargarViajes()
    return nuevoViaje
  }

  async function actualizarViaje(id, cambios, usuarioId) {
    const viajeActualizado = await api.actualizarViaje(id, cambios, usuarioId)
    cargarViajes()
    return viajeActualizado
  }

  async function eliminarViaje(id, usuarioId) {
    await api.eliminarViaje(id, usuarioId)
    cargarViajes()
  }

  return {
    ...estado,
    recargar: cargarViajes,
    crearViaje,
    actualizarViaje,
    eliminarViaje,
  }
}
