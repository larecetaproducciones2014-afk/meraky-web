import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import ProjectsShowcase from '../components/home/ProjectsShowcase'
import StatsSection from '../components/home/StatsSection'
import ContactCTA from '../components/home/ContactCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsShowcase />
        <StatsSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
