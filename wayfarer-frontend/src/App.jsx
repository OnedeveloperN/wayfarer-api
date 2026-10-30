import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import { LoadingState } from '@/components/EstadoCarga.jsx'
import SobreNosotrosPage from './pages/SobreNosotrosPage'

// Carga perezosa de cada página
const HomePage = lazy(() => import('@/pages/HomePage.jsx'))
const PublicarViajePage = lazy(() => import('@/pages/PublicarViajePage.jsx'))
const EditarViajePage = lazy(() => import('@/pages/EditarViajePage.jsx'))
const SobreNosotros = lazy(() => import('@/pages/SobreNosotrosPage.jsx'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'))
const LegalesPage = lazy(() => import('@/pages/LegalesPage.jsx'))

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<LoadingState mensaje="Cargando página..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publicar" element={<PublicarViajePage />} />
            <Route path="/viajes/:id/editar" element={<EditarViajePage />} />
            <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/terminos" element={<LegalesPage />} />
            <Route path="/privacidad" element={<LegalesPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App