import { API_BASE_URL } from '@/config/constants.js'

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.mensaje || 'Ocurrió un error inesperado')
  }
  return data
}

function getHeaders() {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// VIAJES
export function getViajes() {
  return fetch(`${API_BASE_URL}/viajes`).then(parseResponse)
}

export function getViajeById(id) {
  return fetch(`${API_BASE_URL}/viajes/${id}`).then(parseResponse)
}

export function crearViaje(datosViaje) {
  return fetch(`${API_BASE_URL}/viajes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datosViaje),
  }).then(parseResponse)
}

export function actualizarViaje(id, cambios) {
  return fetch(`${API_BASE_URL}/viajes/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(cambios),
  }).then(parseResponse)
}

export function eliminarViaje(id) {
  return fetch(`${API_BASE_URL}/viajes/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(parseResponse)
}

// USUARIOS & AUTENTICACIÓN
export function loginUsuario(credenciales) {
  return fetch(`${API_BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales),
  }).then(parseResponse)
}

export function crearUsuario(datosUsuario) {
  return fetch(`${API_BASE_URL}/usuarios/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosUsuario),
  }).then(parseResponse)
}

export function getUsuarios() {
  return fetch(`${API_BASE_URL}/usuarios`, {
    headers: getHeaders(),
  }).then(parseResponse)
}