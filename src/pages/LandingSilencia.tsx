import LandingPage from '../components/landing/LandingPage'
import { getProject } from '../data/projects'

export default function LandingSilencia() {
  const project = getProject('silencia')!
  return (
    <LandingPage
      project={project}
      source="landing_silencia"
      headline="Lotes desde $3,500/mes — Sin intereses"
      cta="Aparta tu lote en Silencia"
      urgencyText="Disponibilidad limitada. Aparta hoy con solo $26,000."
    />
  )
}
