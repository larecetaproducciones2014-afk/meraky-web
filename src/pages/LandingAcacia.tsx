import LandingPage from '../components/landing/LandingPage'
import { getProject } from '../data/projects'

export default function LandingAcacia() {
  const project = getProject('acacia')!
  return (
    <LandingPage
      project={project}
      source="landing_acacia"
      headline="Tu casa propia desde $150,000 — Financiamiento directo"
      cta="Aparta tu casa en Acacia"
      urgencyText="Casas con entrega inmediata. Quedan pocas unidades disponibles."
    />
  )
}
