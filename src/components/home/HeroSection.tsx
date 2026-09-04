import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { getWhatsAppLink } from '../../data/projects'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter')
      tl.fromTo(
        letters,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' }
      )
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }

    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
        delay: 2,
      })
    }
  }, [])

  const titleLetters = 'MERAKY'.split('')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-dark" />

      {/* Decorative gold lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/30 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-meraky text-center">
        {/* Tagline */}
        <p className="font-body text-xs uppercase tracking-[0.4em] text-secondary/70 mb-8">
          Desarrolladora Inmobiliaria — Querétaro, México
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-heading text-[clamp(5rem,18vw,18rem)] font-medium leading-none text-light mb-6 overflow-hidden"
          aria-label="MERAKY"
        >
          {titleLetters.map((letter, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-accent text-xl md:text-2xl lg:text-3xl italic text-secondary mb-12 max-w-2xl mx-auto"
        >
          Tu patrimonio en el corazón de Querétaro
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/proyectos/silencia"
            className="btn-primary min-w-[220px] text-center"
          >
            Ver Proyectos
          </Link>
          <a
            href={getWhatsAppLink('Hola, me interesa conocer sus desarrollos en Querétaro')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-secondary/50 text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 px-8 py-4 uppercase tracking-widest text-sm font-semibold min-w-[220px] justify-center"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-16 pt-8 border-t border-secondary/10 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '3', label: 'Desarrollos activos' },
            { value: '150m²', label: 'Lotes desde' },
            { value: '0%', label: 'Intereses' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl text-secondary font-medium">{stat.value}</p>
              <p className="font-body text-xs text-accent/50 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary/50 flex flex-col items-center gap-2">
        <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  )
}
