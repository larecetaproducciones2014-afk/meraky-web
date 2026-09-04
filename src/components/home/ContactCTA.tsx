import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getWhatsAppLink } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.animate-in'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="bg-light py-24 lg:py-32">
      <div className="container-meraky text-center">
        <p className="animate-in font-body text-xs uppercase tracking-[0.4em] text-secondary mb-4">
          Contáctanos
        </p>
        <h2 className="animate-in section-title text-primary mb-6 max-w-3xl mx-auto">
          Da el primer paso hacia tu nuevo patrimonio
        </h2>
        <p className="animate-in font-body text-muted max-w-lg mx-auto leading-relaxed mb-12">
          Nuestro equipo está listo para asesorarte sin compromiso. Encuentra el desarrollo
          ideal para tu presupuesto y metas.
        </p>

        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink('Hola, me interesa información sobre sus desarrollos en Querétaro')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 transition-colors duration-300 uppercase tracking-widest text-sm w-full sm:w-auto justify-center"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>
          <a
            href="tel:+524427111960"
            className="flex items-center gap-3 border border-primary/20 text-primary hover:bg-primary hover:text-light transition-all duration-300 px-10 py-4 font-semibold uppercase tracking-widest text-sm w-full sm:w-auto justify-center"
          >
            <Phone size={18} />
            Llamar ahora
          </a>
        </div>

        <p className="animate-in font-body text-xs text-muted mt-8">
          O visita nuestra{' '}
          <Link to="/contacto" className="text-secondary hover:underline">
            página de contacto
          </Link>
          {' '}para enviarnos un mensaje.
        </p>

        {/* Contact info strip */}
        <div className="animate-in mt-16 pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-secondary" />
            +52 (442) 711 19 60
          </span>
          <span className="hidden sm:block w-px h-4 bg-primary/10" />
          <span className="flex items-center gap-2">
            <MessageCircle size={14} className="text-secondary" />
            ventas@meraky.mx
          </span>
          <span className="hidden sm:block w-px h-4 bg-primary/10" />
          <span>Querétaro, México</span>
        </div>
      </div>
    </section>
  )
}
