import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Kanban, LogOut, MessageCircle, Download } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { cn, formatDate, daysSince } from '../../lib/utils'
import type { Lead, LeadStage } from '../../types'

const stageLabels: Record<LeadStage, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  cotizacion: 'Cotización',
  seguimiento: 'Seguimiento',
  ganado: 'Ganado',
  perdido: 'Perdido',
}

const stageColors: Record<LeadStage, string> = {
  nuevo: 'bg-blue-500/10 text-blue-400',
  contactado: 'bg-yellow-500/10 text-yellow-400',
  cotizacion: 'bg-orange-500/10 text-orange-400',
  seguimiento: 'bg-purple-500/10 text-purple-400',
  ganado: 'bg-green-500/10 text-green-400',
  perdido: 'bg-red-500/10 text-red-400',
}

export default function CRMLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStage, setFilterStage] = useState<LeadStage | ''>('')
  const [filterProject, setFilterProject] = useState('')

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/crm')
  }

  const exportCSV = () => {
    const headers = ['Nombre', 'Teléfono', 'Email', 'Proyecto', 'Etapa', 'Fuente', 'Fecha']
    const rows = filtered.map((l) => [
      l.name, l.phone, l.email || '', l.project_slug || '',
      l.stage, l.source, formatDate(l.created_at),
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meraky-leads-${Date.now()}.csv`
    a.click()
  }

  const filtered = leads.filter((l) => {
    if (filterStage && l.stage !== filterStage) return false
    if (filterProject && l.project_slug !== filterProject) return false
    return true
  })

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
            { href: '/crm/pipeline', icon: <Kanban size={16} />, label: 'Pipeline' },
            { href: '/crm/leads', icon: <Users size={16} />, label: 'Todos los leads', active: true },
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

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl text-light mb-1">Leads</h2>
            <p className="font-body text-xs text-accent/40 uppercase tracking-widest">
              {filtered.length} de {leads.length} prospectos
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border border-secondary/20 text-secondary hover:bg-secondary hover:text-primary transition-colors px-4 py-2 text-xs uppercase tracking-widest"
          >
            <Download size={14} />
            Exportar CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value as LeadStage | '')}
            className="bg-primary border border-secondary/10 text-accent/70 text-xs px-4 py-2 focus:outline-none focus:border-secondary"
          >
            <option value="">Todas las etapas</option>
            {Object.entries(stageLabels).map(([slug, label]) => (
              <option key={slug} value={slug}>{label}</option>
            ))}
          </select>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="bg-primary border border-secondary/10 text-accent/70 text-xs px-4 py-2 focus:outline-none focus:border-secondary"
          >
            <option value="">Todos los proyectos</option>
            <option value="silencia">Silencia</option>
            <option value="centenario">El Centenario</option>
            <option value="acacia">Acacia</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-accent/40">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary/10">
                  {['Nombre', 'Teléfono', 'Proyecto', 'Etapa', 'Fuente', 'Días', 'Acciones'].map((h) => (
                    <th key={h} className="text-left font-body text-xs uppercase tracking-widest text-accent/30 pb-4 pr-6">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-primary/30 transition-colors">
                    <td className="py-4 pr-6">
                      <div>
                        <p className="font-body text-light text-sm">{lead.name}</p>
                        {lead.email && <p className="font-body text-xs text-accent/30 mt-0.5">{lead.email}</p>}
                      </div>
                    </td>
                    <td className="py-4 pr-6 font-body text-accent/60 text-xs">{lead.phone}</td>
                    <td className="py-4 pr-6">
                      {lead.project_slug && (
                        <span className="font-body text-xs bg-secondary/10 text-secondary px-2 py-0.5 uppercase tracking-wider">
                          {lead.project_slug}
                        </span>
                      )}
                    </td>
                    <td className="py-4 pr-6">
                      <span className={cn('font-body text-xs px-2 py-0.5 uppercase tracking-wider', stageColors[lead.stage])}>
                        {stageLabels[lead.stage]}
                      </span>
                    </td>
                    <td className="py-4 pr-6 font-body text-xs text-accent/40">{lead.source}</td>
                    <td className="py-4 pr-6 font-body text-xs text-accent/40">{daysSince(lead.created_at)}d</td>
                    <td className="py-4">
                      <a
                        href={`https://wa.me/52${lead.phone.replace(/\D/g, '')}?text=Hola+${encodeURIComponent(lead.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs transition-colors"
                      >
                        <MessageCircle size={12} />
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-accent/20">
                <p className="font-body text-sm">No hay leads con estos filtros</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
