import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, formatPrice } from '../../data/projects'
import { cn } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const projectBgColors: Record<string, string> = {
  silencia: 'bg-silencia',
  centenario: 'bg-centenario',
  acacia: 'bg-acacia',
}

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-light py-24 lg:py-32">
      <div className="container-meraky">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-secondary mb-4">
            Nuestros Desarrollos
          </p>
          <h2 className="section-title text-primary mb-6">
            Proyectos que transforman vidas
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto leading-relaxed">
            Tres desarrollos únicos en Querétaro, cada uno diseñado para diferentes metas
            y presupuestos. Financiamiento directo, sin intermediarios.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className="group relative bg-primary overflow-hidden cursor-pointer"
            >
              {/* Image placeholder with gradient */}
              <div
                className={cn(
                  'relative h-64 overflow-hidden',
                  projectBgColors[project.slug] || 'bg-primary'
                )}
              >
                {project.hero_image_url ? (
                  <img
                    src={project.hero_image_url}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <span className="font-heading text-6xl text-light">{project.name[0]}</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                {/* Type badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-xs uppercase tracking-widest bg-secondary text-primary px-3 py-1">
                    {project.type === 'lote' ? 'Lotes' : 'Casas'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-heading text-2xl text-light mb-2">{project.name}</h3>
                <p className="font-accent text-secondary italic text-sm mb-4">{project.tagline}</p>

                <div className="flex items-center gap-2 text-accent/60 text-xs mb-6">
                  <MapPin size={12} />
                  <span className="font-body">{project.location}</span>
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between items-center border-b border-secondary/10 pb-2">
                    <span className="font-body text-xs text-accent/50 uppercase tracking-wider">Enganche desde</span>
                    <span className="font-heading text-secondary text-lg">{formatPrice(project.down_payment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-xs text-accent/50 uppercase tracking-wider">Mensualidad desde</span>
                    <span className="font-heading text-secondary text-lg">{formatPrice(project.monthly_payment)}/mes</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="flex items-center justify-between w-full border border-secondary/30 text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 px-6 py-3 group/btn"
                >
                  <span className="font-body text-sm uppercase tracking-widest">Ver proyecto</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
