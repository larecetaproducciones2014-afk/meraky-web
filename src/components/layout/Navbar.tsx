import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getWhatsAppLink } from '../../data/projects'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/proyectos/silencia', label: 'Silencia' },
    { href: '/proyectos/centenario', label: 'El Centenario' },
    { href: '/proyectos/acacia', label: 'Acacia' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-meraky flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="font-heading text-2xl font-semibold text-secondary tracking-wider">
            MERAKY
          </span>
          <span className="hidden sm:block w-px h-6 bg-secondary/40" />
          <span className="hidden sm:block font-body text-xs text-accent/70 uppercase tracking-[0.2em]">
            Inmobiliaria
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'font-body text-sm uppercase tracking-widest transition-colors duration-200',
                location.pathname === link.href
                  ? 'text-secondary'
                  : 'text-accent/80 hover:text-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppLink('Hola, me interesa conocer más sobre sus desarrollos')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-3 px-6"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-accent p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden bg-primary/98 backdrop-blur-md transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-screen py-6' : 'max-h-0'
        )}
      >
        <div className="container-meraky flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-body text-sm uppercase tracking-widest text-accent/80 hover:text-secondary transition-colors py-2 border-b border-secondary/10"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppLink('Hola, me interesa conocer más sobre sus desarrollos')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-3 px-6 text-center mt-2"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
