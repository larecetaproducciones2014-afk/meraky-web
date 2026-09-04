import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { countUpAnimation } from '../../lib/animations'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 3, suffix: '', label: 'Desarrollos activos', description: 'En Querétaro y zona metropolitana' },
  { value: 150, suffix: 'm²', label: 'Lotes desde', description: 'Con libre construcción' },
  { value: 0, suffix: '%', label: 'Intereses', description: 'Financiamiento directo sin intermediarios' },
  { value: 100, suffix: '%', label: 'Escrituración', description: 'Incluida en todos los desarrollos' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
        }
      )
    }

    numberRefs.current.forEach((el, i) => {
      if (!el) return
      countUpAnimation(el, stats[i].value)
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-primary py-24">
      <div className="container-meraky">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-heading text-4xl md:text-5xl text-light mb-4">
            ¿Por qué elegir <span className="text-gradient-gold">Meraky</span>?
          </h2>
          <p className="font-body text-accent/60 max-w-md mx-auto">
            Más de 3 años desarrollando patrimonio con financiamiento accesible y transparente.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-secondary/10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center px-6 py-8">
              <div className="font-heading text-5xl lg:text-6xl text-secondary font-medium mb-2">
                <span ref={(el) => { numberRefs.current[i] = el }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="font-body text-sm text-light uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="font-body text-xs text-accent/40 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-16 border-t border-secondary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Financiamiento Directo', body: 'Sin bancos, sin trámites complicados. Aparta con enganche mínimo y paga mensualidades accesibles.' },
              { title: 'Sin Intereses', body: 'Todos nuestros planes de financiamiento son libres de intereses. Lo que ves es lo que pagas.' },
              { title: 'Escrituración Incluida', body: 'Proceso legal completo incluido. Tu propiedad queda a tu nombre desde el primer día.' },
            ].map((item) => (
              <div key={item.title} className="px-4">
                <h3 className="font-heading text-xl text-secondary mb-3">{item.title}</h3>
                <p className="font-body text-sm text-accent/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
