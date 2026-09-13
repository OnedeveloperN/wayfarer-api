import { useState } from 'react'
import Button from '@/components/Button.jsx'

function aFormatoInputFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toISOString().slice(0, 10)
}

const VALORES_POR_DEFECTO = {
  origen: '',
  destino: '',
  fecha: '',
  horaSalida: '',
  precioPorAsiento: '',
  asientosDisponibles: '',
  preferencias: '',
}

function ViajeForm({ valoresIniciales, onSubmit, textoBoton = 'Publicar viaje' }) {
  // Un único useState agrupando todos los campos del formulario,
  // en vez de un useState por cada input.
  const [datos, setDatos] = useState({
    ...VALORES_POR_DEFECTO,
    ...valoresIniciales,
    fecha: aFormatoInputFecha(valoresIniciales?.fecha),
    preferencias: Array.isArray(valoresIniciales?.preferencias)
      ? valoresIniciales.preferencias.join(', ')
      : (valoresIniciales?.preferencias ?? ''),
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setDatos((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      await onSubmit({
        ...datos,
        precioPorAsiento: Number(datos.precioPorAsiento),
        asientosDisponibles: Number(datos.asientosDisponibles),
        preferencias: datos.preferencias
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="elevation-1 flex flex-col gap-4 rounded-lg bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-on-surface-variant">Origen</label>
          <input
            type="text"
            name="origen"
            value={datos.origen}
            onChange={handleChange}
            required
            placeholder="Ciudad de origen"
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-on-surface-variant">Destino</label>
          <input
            type="text"
            name="destino"
            value={datos.destino}
            onChange={handleChange}
            required
            placeholder="Ciudad de destino"
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-on-surface-variant">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={datos.fecha}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-on-surface-variant">Hora de salida</label>
          <input
            type="time"
            name="horaSalida"
            value={datos.horaSalida}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-on-surface-variant">
            Asientos disponibles
          </label>
          <input
            type="number"
            name="asientosDisponibles"
            value={datos.asientosDisponibles}
            onChange={handleChange}
            required
            min="1"
            placeholder="3"
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-on-surface-variant">
            Precio por asiento (€)
          </label>
          <input
            type="number"
            name="precioPorAsiento"
            value={datos.precioPorAsiento}
            onChange={handleChange}
            required
            min="0"
            step="0.5"
            placeholder="18.50"
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-on-surface-variant">
            Preferencias (separadas por coma)
          </label>
          <input
            type="text"
            name="preferencias"
            value={datos.preferencias}
            onChange={handleChange}
            placeholder="No fumadores, Mascotas OK, Música permitida"
            className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-md bg-error-container px-4 py-2 text-sm text-on-error-container">
          {error}
        </p>
      )}

      <Button type="submit" disabled={enviando} className="self-start">
        {enviando ? 'Guardando...' : textoBoton}
      </Button>
    </form>
  )
}

export default ViajeForm
