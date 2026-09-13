import { useState } from 'react'
import Button from '@/components/Button.jsx'

const FILTRO_INICIAL = { origen: '', destino: '' }

function SearchBar({ onBuscar }) {
  // Un único useState agrupando los dos campos relacionados del filtro
  const [filtro, setFiltro] = useState(FILTRO_INICIAL)

  function handleChange(event) {
    const { name, value } = event.target
    setFiltro((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onBuscar(filtro)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="elevation-1 flex flex-col gap-3 rounded-lg bg-surface p-5 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="text-xs font-medium text-on-surface-variant">Origen</label>
        <input
          type="text"
          name="origen"
          value={filtro.origen}
          onChange={handleChange}
          placeholder="Ciudad de origen"
          className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex-1">
        <label className="text-xs font-medium text-on-surface-variant">Destino</label>
        <input
          type="text"
          name="destino"
          value={filtro.destino}
          onChange={handleChange}
          placeholder="Ciudad de destino"
          className="mt-1 w-full rounded-md border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <Button type="submit">Buscar viaje</Button>
    </form>
  )
}

export default SearchBar
