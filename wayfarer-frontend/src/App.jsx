import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar.jsx'
import { LoadingState } from '@/components/EstadoCarga.jsx'

// Carga perezosa de cada página: cada una se descarga sólo
// cuando el usuario navega a esa ruta.
const HomePage = lazy(() => import('@/pages/HomePage.jsx'))
const PublicarViajePage = lazy(() => import('@/pages/PublicarViajePage.jsx'))
const EditarViajePage = lazy(() => import('@/pages/EditarViajePage.jsx'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'))

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Suspense fallback={<LoadingState mensaje="Cargando página..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publicar" element={<PublicarViajePage />} />
            <Route path="/viajes/:id/editar" element={<EditarViajePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
