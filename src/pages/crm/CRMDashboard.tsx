import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Users, Kanban, LogOut, TrendingUp, Clock, CheckCircle, XCircle, Star, AlertCircle, MessageCircle, FileDown, HelpCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

const STAGES = [
  { slug: 'nuevo',       label: 'Nuevos',        color: 'bg-blue-500',   icon: <Star size={18} /> },
  { slug: 'contactado',  label: 'Contactados',    color: 'bg-yellow-500', icon: <Clock size={18} /> },
  { slug: 'cotizacion',  label: 'Cotización',     color: 'bg-orange-500', icon: <TrendingUp size={18} /> },
  { slug: 'seguimiento', label: 'Seguimiento',    color: 'bg-purple-500', icon: <TrendingUp size={18} /> },
  { slug: 'ganado',      label: 'Ganados',        color: 'bg-green-500',  icon: <CheckCircle size={18} /> },
  { slug: 'perdido',     label: 'Perdidos',       color: 'bg-red-500',    icon: <XCircle size={18} /> },
]

const NAV = [
  { href: '/crm/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true },
  { href: '/crm/pipeline',  icon: <Kanban size={16} />,          label: 'Pipeline' },
  { href: '/crm/leads',     icon: <Users size={16} />,           label: 'Todos los leads' },
]

const GUIDE = [
  {
    icon: <Star size={20} className="text-blue-400" />,
    title: '1. Nuevo lead entra',
    desc: 'Cada vez que alguien llena el formulario de una landing (Silencia, Centenario o Acacia), aparece automáticamente aquí con etapa "Nuevo". También puedes ver el proyecto y el mensaje que dejó.',
  },
  {
    icon: <MessageCircle size={20} className="text-green-400" />,
    title: '2. Contactar por WhatsApp',
    desc: 'En el Pipeline, cada tarjeta tiene un botón de WhatsApp que abre una conversación lista con el nombre del lead. Contáctalo lo antes posible (¡menos de 3 días!) para maximizar la conversión.',
  },
  {
    icon: <AlertCircle size={20} className="text-red-400" />,
    title: '3. Alerta de seguimiento',
    desc: 'Si un lead lleva más de 3 días en etapa "Nuevo" sin contacto, aparece un ícono rojo en su tarjeta. Prioriza esos leads de inmediato — la tasa de conversión baja drásticamente después del tercer día.',
  },
  {
    icon: <Kanban size={20} className="text-purple-400" />,
    title: '4. Mover en el Pipeline',
    desc: 'En la vista Pipeline usa el selector de cada tarjeta para cambiar de etapa: Nuevo → Contactado → Cotización → Seguimiento → Ganado o Perdido. Esto actualiza el CRM en tiempo real.',
  },
  {
    icon: <FileDown size={20} className="text-secondary" />,
    title: '5. Exportar a Excel',
    desc: 'En "Todos los leads" hay un botón "Exportar CSV" que descarga la lista completa con todos los datos: nombre, teléfono, email, proyecto, etapa y fecha. Abre el archivo en Excel o Google Sheets.',
  },
  {
    icon: <HelpCircle size={20} className="text-accent/60" />,
    title: 'Fuentes de leads',
    desc: '"meta_ads" = llegó por anuncio de Facebook/Instagram. "web" = llegó por la página principal. "whatsapp" = llegó directo por WhatsApp. "referido" = lo recomendó alguien. Usa estos datos para saber qué campaña funciona mejor.',
  },
]

export default function CRMDashboard() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data } = await supabase.from('leads').select('stage')
    if (data) {
      const c: Record<string, number> = {}
      data.forEach((l) => { c[l.stage] = (c[l.stage] || 0) + 1 })
      setCounts(c)
      setTotal(data.length)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/crm')
  }

  return (
    <div className="min-h-screen bg-dark text-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary border-r border-secondary/10 flex flex-col shrink-0">
        <div className="p-8 border-b border-secondary/10">
          <h1 className="font-heading text-2xl text-secondary">MERAKY</h1>
          <p className="font-body text-xs text-accent/40 uppercase tracking-widest mt-1">CRM</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-body uppercase tracking-wider transition-colors ${
                item.active
                  ? 'text-secondary bg-secondary/10'
                  : 'text-accent/70 hover:text-secondary hover:bg-secondary/5'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-secondary/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-accent/40 hover:text-secondary transition-colors text-xs uppercase tracking-widest"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="mb-10">
          <h2 className="font-heading text-4xl text-light mb-2">Dashboard</h2>
          <p className="font-body text-accent/40 text-sm">
            {loading ? 'Cargando...' : `${total} leads en total`}
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {STAGES.map((stage) => (
            <div key={stage.slug} className="bg-primary border border-secondary/10 p-6">
              <div className={`${stage.color} text-white w-10 h-10 flex items-center justify-center mb-4`}>
                {stage.icon}
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-accent/40 mb-1">
                {stage.label}
              </p>
              <p className="font-heading text-3xl text-light">
                {loading ? '—' : (counts[stage.slug] || 0)}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            to="/crm/pipeline"
            className="bg-primary border border-secondary/10 p-8 hover:border-secondary/30 transition-colors"
          >
            <Kanban size={24} className="text-secondary mb-4" />
            <h3 className="font-heading text-xl text-light mb-2">Pipeline Kanban</h3>
            <p className="font-body text-sm text-accent/40">
              Arrastra y mueve leads entre etapas. Contacta por WhatsApp con un clic.
            </p>
          </Link>
          <Link
            to="/crm/leads"
            className="bg-primary border border-secondary/10 p-8 hover:border-secondary/30 transition-colors"
          >
            <Users size={24} className="text-secondary mb-4" />
            <h3 className="font-heading text-xl text-light mb-2">Lista de Leads</h3>
            <p className="font-body text-sm text-accent/40">
              Filtra por proyecto o etapa. Exporta a CSV para Excel o Google Sheets.
            </p>
          </Link>
        </div>

        {/* ——— GUÍA DE USO ——— */}
        <div className="border-t border-secondary/10 pt-10">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-secondary mb-2">Guía rápida</p>
          <h3 className="font-heading text-2xl text-light mb-8">¿Cómo usar el CRM?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {GUIDE.map((step) => (
              <div key={step.title} className="bg-primary border border-secondary/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <h4 className="font-body text-sm text-light font-medium">{step.title}</h4>
                </div>
                <p className="font-body text-xs text-accent/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Stages legend */}
          <div className="mt-8 bg-primary border border-secondary/10 p-6">
            <h4 className="font-body text-xs uppercase tracking-widest text-secondary mb-5">Etapas del pipeline</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { stage: 'Nuevo',       color: 'bg-blue-500',   desc: 'Acaba de llegar, aún no contactado' },
                { stage: 'Contactado',  color: 'bg-yellow-500', desc: 'Ya hablaste con él al menos una vez' },
                { stage: 'Cotización',  color: 'bg-orange-500', desc: 'Te pidió precio o propuesta formal' },
                { stage: 'Seguimiento', color: 'bg-purple-500', desc: 'En proceso de decisión, requiere seguimiento' },
                { stage: 'Ganado',      color: 'bg-green-500',  desc: 'Apartó o firmó contrato ¡Cierre exitoso!' },
                { stage: 'Perdido',     color: 'bg-red-500',    desc: 'No avanzó. Anota el motivo para mejorar' },
              ].map((s) => (
                <div key={s.stage}>
                  <div className={`${s.color} h-1 mb-2`} />
                  <p className="font-body text-xs text-light font-medium mb-1">{s.stage}</p>
                  <p className="font-body text-xs text-accent/40 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
