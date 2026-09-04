import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { initSmoothScroll } from './lib/animations'

import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import LandingSilencia from './pages/LandingSilencia'
import LandingCentenario from './pages/LandingCentenario'
import LandingAcacia from './pages/LandingAcacia'
import CRMLogin from './pages/crm/CRMLogin'
import CRMDashboard from './pages/crm/CRMDashboard'
import CRMPipeline from './pages/crm/CRMPipeline'
import CRMLeads from './pages/crm/CRMLeads'

export default function App() {
  useEffect(() => {
    const lenis = initSmoothScroll()
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A2E',
            color: '#F8F6F2',
            border: '1px solid #C9A96E',
          },
        }}
      />
      <Routes>
        {/* Sitio principal */}
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        <Route path="/contacto" element={<Contact />} />

        {/* Landing pages Meta Ads */}
        <Route path="/landing/silencia" element={<LandingSilencia />} />
        <Route path="/landing/centenario" element={<LandingCentenario />} />
        <Route path="/landing/acacia" element={<LandingAcacia />} />

        {/* CRM */}
        <Route path="/crm" element={<CRMLogin />} />
        <Route path="/crm/dashboard" element={<CRMDashboard />} />
        <Route path="/crm/pipeline" element={<CRMPipeline />} />
        <Route path="/crm/leads" element={<CRMLeads />} />
      </Routes>
    </BrowserRouter>
  )
}
