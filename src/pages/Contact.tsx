import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { supabase } from '../lib/supabase'
import { getWhatsAppLink } from '../data/projects'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', project: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Por favor completa nombre y teléfono')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        project_slug: form.project || null,
        message: form.message,
        source: 'web',
        stage: 'nuevo',
        priority: 'normal',
      })
      if (error) throw error
      toast.success('¡Mensaje enviado! Te contactaremos pronto.')
      setForm({ name: '', phone: '', project: '', message: '' })
    } catch {
      toast.error('Hubo un error. Contáctanos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Header */}
        <section className="bg-primary py-20">
          <div className="container-meraky text-center">
            <p className="font-body text-xs uppercase tracking-[0.4em] text-secondary mb-4">
              Contáctanos
            </p>
            <h1 className="font-heading text-5xl md:text-7xl text-light mb-4">
              Hablemos
            </h1>
            <p className="font-accent text-xl italic text-secondary">
              Tu asesor personal está a un mensaje
            </p>
          </div>
        </section>

        <section className="bg-light py-20">
          <div className="container-meraky grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-heading text-3xl text-primary mb-8">Información de contacto</h2>
              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: <MessageCircle size={20} className="text-secondary" />,
                    label: 'WhatsApp',
                    value: '+52 (442) 711 19 60',
                    href: getWhatsAppLink('Hola, me interesa información sobre sus desarrollos'),
                  },
                  {
                    icon: <Phone size={20} className="text-secondary" />,
                    label: 'Teléfono',
                    value: '+52 (442) 711 19 60',
                    href: 'tel:+524427111960',
                  },
                  {
                    icon: <Mail size={20} className="text-secondary" />,
                    label: 'Email',
                    value: 'ventas@meraky.mx',
                    href: 'mailto:ventas@meraky.mx',
                  },
                  {
                    icon: <MapPin size={20} className="text-secondary" />,
                    label: 'Ubicación',
                    value: 'Querétaro, México',
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-6 bg-white border border-primary/5">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="font-body text-primary hover:text-secondary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppLink('Hola, me interesa información sobre sus desarrollos en Querétaro')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 transition-colors uppercase tracking-widest text-sm w-full"
              >
                <MessageCircle size={18} />
                Escribir por WhatsApp ahora
              </a>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-heading text-3xl text-primary mb-8">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full border border-primary/10 bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+52 (442) 000 0000"
                    required
                    className="w-full border border-primary/10 bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                    Proyecto de interés
                  </label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full border border-primary/10 bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="">Todos los proyectos</option>
                    <option value="silencia">Silencia</option>
                    <option value="centenario">El Centenario</option>
                    <option value="acacia">Acacia</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                    Mensaje
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    rows={5}
                    className="w-full border border-primary/10 bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-secondary text-primary font-semibold px-8 py-4 hover:bg-accent transition-colors uppercase tracking-widest text-sm w-full disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
