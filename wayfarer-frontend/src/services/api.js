import { API_BASE_URL } from '@/config/constants.js'

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.mensaje || 'Ocurrió un error inesperado')
  }

  return data
}

export function getViajes() {
  return fetch(`${API_BASE_URL}/viajes`).then(parseResponse)
}

export function getViajeById(id) {
  return fetch(`${API_BASE_URL}/viajes/${id}`).then(parseResponse)
}

export function crearViaje(datosViaje) {
  return fetch(`${API_BASE_URL}/viajes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosViaje),
  }).then(parseResponse)
}

// Ahora recibe "usuarioId": lo mandamos en un header custom para que el
// backend pueda verificar que quien edita es el dueño del viaje.
export function actualizarViaje(id, cambios, usuarioId) {
  return fetch(`${API_BASE_URL}/viajes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-usuario-id': usuarioId,
    },
    body: JSON.stringify(cambios),
  }).then(parseResponse)
}

export function eliminarViaje(id, usuarioId) {
  return fetch(`${API_BASE_URL}/viajes/${id}`, {
    method: 'DELETE',
    headers: { 'x-usuario-id': usuarioId },
  }).then(parseResponse)
}

// --- Usuarios ---

export function getUsuarios() {
  return fetch(`${API_BASE_URL}/usuarios`).then(parseResponse)
}

export function crearUsuario(datosUsuario) {
  return fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosUsuario),
  }).then(parseResponse)
}
