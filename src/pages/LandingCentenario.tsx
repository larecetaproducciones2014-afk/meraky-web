import LandingPage from '../components/landing/LandingPage'
import { getProject } from '../data/projects'

export default function LandingCentenario() {
  const project = getProject('centenario')!
  return (
    <LandingPage
      project={project}
      source="landing_centenario"
      headline="Tu lote desde $20,000 de enganche"
      cta="Quiero información de El Centenario"
      urgencyText="Últimos lotes disponibles. Precio total $340,000."
    />
  )
}
