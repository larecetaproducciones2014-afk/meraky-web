import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { MapPin, ArrowLeft, MessageCircle, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { getProject, formatPrice, getWhatsAppLink } from '../data/projects'
import { cn } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const projectColors: Record<string, string> = {
  silencia: 'text-silencia',
  centenario: 'text-centenario',
  acacia: 'text-acacia',
}

const projectBg: Record<string, string> = {
  silencia: 'bg-silencia/10',
  centenario: 'bg-centenario/10',
  acacia: 'bg-acacia/10',
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug || '')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!contentRef.current) return
    const items = contentRef.current.querySelectorAll('.fade-up')
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          delay: i * 0.05,
        }
      )
    })
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const whatsappText = `Hola, me interesa el desarrollo ${project.name}. ¿Pueden darme más información?`
  const colorClass = projectColors[project.slug] || 'text-secondary'
  const bgClass = projectBg[project.slug] || 'bg-secondary/10'

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] bg-primary flex items-end pb-16 pt-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-dark opacity-95" />
          {project.hero_image_url && (
            <img
              src={project.hero_image_url}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
            />
          )}
          <div className="relative z-10 container-meraky">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent/50 hover:text-secondary transition-colors text-sm mb-8 font-body uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Inicio
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className={cn('font-body text-xs uppercase tracking-widest', colorClass)}>
                {project.type === 'lote' ? 'Lotes residenciales' : 'Casas habitación'}
              </span>
              <span className="w-8 h-px bg-secondary/40" />
              <span className="font-body text-xs text-accent/50 uppercase tracking-widest">
                {project.location}
              </span>
            </div>
            <h1 className="font-heading text-6xl md:text-8xl text-light font-medium mb-4">
              {project.name}
            </h1>
            <p className="font-accent text-2xl italic text-secondary">{project.tagline}</p>
          </div>
        </section>

        <div ref={contentRef}>
          {/* Info & Pricing */}
          <section className="bg-light py-20">
            <div className="container-meraky grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Description */}
              <div>
                <p className="fade-up font-body text-xs uppercase tracking-[0.4em] text-secondary mb-4">
                  Sobre el desarrollo
                </p>
                <h2 className="fade-up font-heading text-4xl text-primary mb-6">
                  Tu inversión, a tu ritmo
                </h2>
                <p className="fade-up font-body text-muted leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="fade-up flex items-center gap-2 text-muted text-sm mb-8">
                  <MapPin size={14} className="text-secondary shrink-0" />
                  {project.distance_info}
                </div>

                {/* Highlights */}
                <ul className="fade-up space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-sm font-body text-text-main">
                      <CheckCircle size={16} className={cn('shrink-0', colorClass)} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Pricing card */}
              <div className="fade-up">
                <div className="bg-primary p-10">
                  <h3 className="font-body text-xs uppercase tracking-widest text-secondary mb-8">
                    Condiciones de compra
                  </h3>
                  <div className="space-y-6">
                    <div className="border-b border-secondary/10 pb-6">
                      <p className="font-body text-xs text-accent/40 uppercase tracking-wider mb-2">Enganche desde</p>
                      <p className="font-heading text-5xl text-secondary">{formatPrice(project.down_payment)}</p>
                    </div>
                    <div className="border-b border-secondary/10 pb-6">
                      <p className="font-body text-xs text-accent/40 uppercase tracking-wider mb-2">Mensualidad desde</p>
                      <p className="font-heading text-4xl text-light">
                        {formatPrice(project.monthly_payment)}
                        <span className="text-xl text-accent/40">/mes</span>
                      </p>
                    </div>
                    {project.total_price && (
                      <div className="border-b border-secondary/10 pb-6">
                        <p className="font-body text-xs text-accent/40 uppercase tracking-wider mb-2">Precio total</p>
                        <p className="font-heading text-3xl text-light">{formatPrice(project.total_price)}</p>
                      </div>
                    )}
                    <div>
                      <p className="font-body text-xs text-accent/50 leading-relaxed">{project.financing_info}</p>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-secondary text-primary font-semibold px-8 py-4 mt-8 hover:bg-accent transition-colors uppercase tracking-widest text-sm w-full"
                  >
                    <MessageCircle size={18} />
                    Apartar ahora
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Amenidades */}
          <section className="bg-primary py-20">
            <div className="container-meraky">
              <p className="fade-up font-body text-xs uppercase tracking-[0.4em] text-secondary mb-4 text-center">
                Amenidades
              </p>
              <h2 className="fade-up font-heading text-4xl text-light mb-12 text-center">
                Todo lo que necesitas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className={cn('fade-up p-8 border border-secondary/10 text-center', bgClass)}
                  >
                    <p className="font-heading text-xl text-light">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="bg-light py-20">
            <div className="container-meraky text-center">
              <h2 className="fade-up font-heading text-4xl md:text-5xl text-primary mb-6">
                ¿Listo para invertir en <span className={colorClass}>{project.name}</span>?
              </h2>
              <p className="fade-up font-body text-muted max-w-md mx-auto mb-10">
                Habla con uno de nuestros asesores y encuentra el plan ideal para ti.
              </p>
              <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppLink(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 transition-colors uppercase tracking-widest text-sm w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={18} />
                  Contactar por WhatsApp
                </a>
                <Link
                  to="/contacto"
                  className="border border-primary/20 text-primary hover:bg-primary hover:text-light transition-all duration-300 px-10 py-4 font-semibold uppercase tracking-widest text-sm w-full sm:w-auto text-center"
                >
                  Enviar mensaje
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
