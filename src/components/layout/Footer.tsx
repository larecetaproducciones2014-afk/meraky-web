import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../../data/projects'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-accent/70">
      <div className="container-meraky py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-3xl text-secondary font-medium mb-4">MERAKY</h3>
            <p className="font-accent text-lg italic text-accent/60 mb-6">
              Desarrolladora inmobiliaria en Querétaro, México.
            </p>
            <p className="font-body text-sm leading-relaxed max-w-md">
              Creamos desarrollos residenciales con financiamiento directo, sin intermediarios.
              Tu patrimonio en las mejores ubicaciones de Querétaro.
            </p>
          </div>

          {/* Proyectos */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-secondary mb-6">
              Desarrollos
            </h4>
            <ul className="space-y-3">
              {[
                { slug: 'silencia', name: 'Silencia' },
                { slug: 'centenario', name: 'El Centenario' },
                { slug: 'acacia', name: 'Acacia' },
              ].map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/proyectos/${p.slug}`}
                    className="font-body text-sm hover:text-secondary transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contacto"
                  className="font-body text-sm hover:text-secondary transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-secondary mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={getWhatsAppLink('Hola, me interesa información sobre sus desarrollos')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"
                >
                  <MessageCircle size={16} className="text-secondary shrink-0" />
                  +52 (442) 711 19 60
                </a>
              </li>
              <li>
                <a
                  href="tel:+524427111960"
                  className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"
                >
                  <Phone size={16} className="text-secondary shrink-0" />
                  +52 (442) 711 19 60
                </a>
              </li>
              <li>
                <a
                  href="mailto:ventas@meraky.mx"
                  className="flex items-center gap-3 text-sm hover:text-secondary transition-colors"
                >
                  <Mail size={16} className="text-secondary shrink-0" />
                  ventas@meraky.mx
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                Querétaro, México
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-accent/40">
            © {year} Meraky Inmobiliaria. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-accent/30">
            Desarrollado por{' '}
            <span className="text-secondary/60">Design X AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
