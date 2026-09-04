import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Users, Kanban, LogOut, MessageCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { cn, daysSince, formatDate } from '../../lib/utils'
import type { Lead, LeadStage } from '../../types'

const STAGES: { slug: LeadStage; label: string; color: string; bg: string }[] = [
  { slug: 'nuevo', label: '🆕 Nuevo', color: 'text-blue-400', bg: 'border-t-blue-500' },
  { slug: 'contactado', label: '📞 Contactado', color: 'text-yellow-400', bg: 'border-t-yellow-500' },
  { slug: 'cotizacion', label: '📋 Cotización', color: 'text-orange-400', bg: 'border-t-orange-500' },
  { slug: 'seguimiento', label: '🔁 Seguimiento', color: 'text-purple-400', bg: 'border-t-purple-500' },
  { slug: 'ganado', label: '✅ Ganado', color: 'text-green-400', bg: 'border-t-green-500' },
  { slug: 'perdido', label: '❌ Perdido', color: 'text-red-400', bg: 'border-t-red-500' },
]

export default function CRMPipeline() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }

  const moveStage = async (leadId: string, newStage: LeadStage) => {
    await supabase.from('leads').update({ stage: newStage }).eq('id', leadId)
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/crm')
  }

  const leadsBy = (stage: LeadStage) => leads.filter((l) => l.stage === stage)

  return (
    <div className="min-h-screen bg-dark text-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary border-r border-secondary/10 flex flex-col shrink-0">
        <div className="p-8 border-b border-secondary/10">
          <h1 className="font-heading text-2xl text-secondary">MERAKY</h1>
          <p className="font-body text-xs text-accent/40 uppercase tracking-widest mt-1">CRM</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {[
            { href: '/crm/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
            { href: '/crm/pipeline', icon: <Kanban size={16} />, label: 'Pipeline', active: true },
            { href: '/crm/leads', icon: <Users size={16} />, label: 'Todos los leads' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-body uppercase tracking-wider transition-colors',
                item.active
                  ? 'text-secondary bg-secondary/10'
                  : 'text-accent/70 hover:text-secondary hover:bg-secondary/5'
              )}
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

      {/* Kanban board */}
      <main className="flex-1 overflow-x-auto p-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl text-light mb-1">Pipeline de Ventas</h2>
          <p className="font-body text-xs text-accent/40 uppercase tracking-widest">
            {leads.length} leads totales
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-accent/40">Cargando leads...</div>
        ) : (
          <div className="flex gap-4 min-w-max pb-8">
            {STAGES.map((stage) => {
              const stageLeads = leadsBy(stage.slug)
              return (
                <div key={stage.slug} className="w-72 shrink-0">
                  {/* Column header */}
                  <div className={cn('bg-primary border border-secondary/10 border-t-2 p-4 mb-3', stage.bg)}>
                    <div className="flex items-center justify-between">
                      <span className={cn('font-body text-xs uppercase tracking-wider', stage.color)}>
                        {stage.label}
                      </span>
                      <span className="font-heading text-lg text-light">{stageLeads.length}</span>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {stageLeads.map((lead) => {
                      const days = daysSince(lead.created_at)
                      const isStale = stage.slug === 'nuevo' && days > 3
                      return (
                        <div
                          key={lead.id}
                          className="bg-primary border border-secondary/10 p-4 hover:border-secondary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-body text-sm text-light font-medium">{lead.name}</p>
                              <p className="font-body text-xs text-accent/40 mt-0.5">{lead.phone}</p>
                            </div>
                            {isStale && (
                              <span title={`${days} días sin contacto`}>
                                <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                              </span>
                            )}
                          </div>

                          {lead.project_slug && (
                            <span className="inline-block font-body text-xs bg-secondary/10 text-secondary px-2 py-0.5 mb-3 uppercase tracking-wider">
                              {lead.project_slug}
                            </span>
                          )}

                          <p className="font-body text-xs text-accent/30 mb-3">
                            {formatDate(lead.created_at)}
                          </p>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/52${lead.phone.replace(/\D/g, '')}?text=Hola+${encodeURIComponent(lead.name)},+soy+de+Meraky+Inmobiliaria`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs transition-colors"
                            >
                              <MessageCircle size={12} />
                              WhatsApp
                            </a>
                            <select
                              value={lead.stage}
                              onChange={(e) => moveStage(lead.id, e.target.value as LeadStage)}
                              className="ml-auto bg-dark border border-secondary/10 text-accent/60 text-xs px-2 py-1 focus:outline-none focus:border-secondary"
                            >
                              {STAGES.map((s) => (
                                <option key={s.slug} value={s.slug}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )
                    })}

                    {stageLeads.length === 0 && (
                      <div className="border border-dashed border-secondary/10 p-8 text-center">
                        <p className="font-body text-xs text-accent/20">Sin leads</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
