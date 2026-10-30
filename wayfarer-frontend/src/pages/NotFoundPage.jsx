import { Link } from 'react-router-dom'
import Button from '@/components/Button.jsx'

function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-on-surface">
        Página no encontrada
      </h1>
      <p className="text-sm text-on-surface-variant">
        La ruta que buscás no existe.
      </p>
      <Link to="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
