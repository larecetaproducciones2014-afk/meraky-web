import { useState } from 'react'
import { MessageCircle, CheckCircle, Send, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { formatPrice, getWhatsAppLink } from '../../data/projects'
import type { Project, LeadSource } from '../../types'

interface LandingPageProps {
  project: Project
  source: LeadSource
  headline: string
  cta: string
  urgencyText?: string
}

export default function LandingPage({ project, source, headline, cta, urgencyText }: LandingPageProps) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const whatsappLink = getWhatsAppLink(
    `Hola, me interesa el desarrollo ${project.name}. Vi su publicidad y quiero más información.`
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Por favor completa nombre y teléfono')
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams(window.location.search)
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        message: form.message,
        project_slug: project.slug,
        source,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        stage: 'nuevo',
        priority: 'normal',
      })
      if (error) throw error
      setSubmitted(true)
      // Redirect to WhatsApp after 1.5s
      setTimeout(() => {
        window.open(whatsappLink, '_blank')
      }, 1500)
    } catch {
      toast.error('Hubo un error. Escríbenos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary font-body">
      {/* Header */}
      <header className="py-6 border-b border-secondary/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl text-secondary tracking-wider">MERAKY</span>
            <span className="w-px h-5 bg-secondary/30" />
            <span className="text-xs text-accent/50 uppercase tracking-[0.2em]">Inmobiliaria</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/10 text-secondary text-xs uppercase tracking-widest px-4 py-2 mb-6">
            {project.type === 'lote' ? 'Lotes residenciales' : 'Casas habitación'} · {project.name}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-light leading-tight mb-6">
            {headline}
          </h1>
          <p className="font-accent text-xl italic text-secondary mb-8">{project.tagline}</p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 transition-colors uppercase tracking-widest text-sm"
          >
            <MessageCircle size={20} />
            {cta}
          </a>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-6 mb-12 bg-secondary/5 border border-secondary/10 p-8">
          <div className="text-center">
            <p className="font-heading text-3xl text-secondary mb-1">{formatPrice(project.down_payment)}</p>
            <p className="font-body text-xs text-accent/50 uppercase tracking-wider">Enganche desde</p>
          </div>
          <div className="text-center border-x border-secondary/10">
            <p className="font-heading text-3xl text-secondary mb-1">{formatPrice(project.monthly_payment)}</p>
            <p className="font-body text-xs text-accent/50 uppercase tracking-wider">Mensualidad desde</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl text-secondary mb-1">0%</p>
            <p className="font-body text-xs text-accent/50 uppercase tracking-wider">Sin intereses</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-3 text-accent/80 text-sm">
              <CheckCircle size={16} className="text-secondary shrink-0" />
              {h}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-light rounded-none p-8 mb-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-primary mb-2">¡Mensaje recibido!</h3>
              <p className="font-body text-muted">Redirigiendo a WhatsApp...</p>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-2xl text-primary mb-6 text-center">
                Recibe información ahora
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nombre completo *"
                  required
                  className="w-full border border-primary/10 px-4 py-3 text-sm focus:outline-none focus:border-secondary"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Teléfono / WhatsApp *"
                  required
                  className="w-full border border-primary/10 px-4 py-3 text-sm focus:outline-none focus:border-secondary"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="¿Tienes alguna pregunta? (opcional)"
                  rows={3}
                  className="w-full border border-primary/10 px-4 py-3 text-sm focus:outline-none focus:border-secondary resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-secondary text-primary font-semibold px-8 py-4 hover:bg-accent transition-colors uppercase tracking-widest text-sm w-full disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? 'Enviando...' : 'Quiero más información'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Urgency */}
        {urgencyText && (
          <div className="text-center mb-8 border border-secondary/20 py-4 px-6">
            <p className="text-secondary text-sm font-body">
              <span className="font-semibold">⚡ {urgencyText}</span>
            </p>
          </div>
        )}

        {/* Amenities */}
        <div className="text-center">
          <p className="font-body text-xs uppercase tracking-widest text-secondary mb-6">Incluye</p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.amenities.map((a) => (
              <span key={a} className="flex items-center gap-2 text-accent/70 text-sm">
                <ArrowRight size={12} className="text-secondary" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-secondary/10 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-accent/30 font-body">
          © {new Date().getFullYear()} Meraky Inmobiliaria · ventas@meraky.mx · +52 (442) 711 19 60
        </div>
      </footer>

      {/* Floating WhatsApp button (mobile) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors sm:hidden"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  )
}
