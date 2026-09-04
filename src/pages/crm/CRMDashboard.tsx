import { Link } from 'react-router-dom'
import { LayoutDashboard, Users, Kanban, LogOut, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

const stages = [
  { slug: 'nuevo', label: 'Nuevos', color: 'bg-blue-500', icon: <Users size={20} /> },
  { slug: 'contactado', label: 'Contactados', color: 'bg-yellow-500', icon: <Clock size={20} /> },
  { slug: 'seguimiento', label: 'En seguimiento', color: 'bg-purple-500', icon: <TrendingUp size={20} /> },
  { slug: 'ganado', label: 'Ganados', color: 'bg-green-500', icon: <CheckCircle size={20} /> },
  { slug: 'perdido', label: 'Perdidos', color: 'bg-red-500', icon: <XCircle size={20} /> },
]

export default function CRMDashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/crm')
  }

  return (
    <div className="min-h-screen bg-dark text-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary border-r border-secondary/10 flex flex-col">
        <div className="p-8 border-b border-secondary/10">
          <h1 className="font-heading text-2xl text-secondary">MERAKY</h1>
          <p className="font-body text-xs text-accent/40 uppercase tracking-widest mt-1">CRM</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {[
            { href: '/crm/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
            { href: '/crm/pipeline', icon: <Kanban size={16} />, label: 'Pipeline' },
            { href: '/crm/leads', icon: <Users size={16} />, label: 'Todos los leads' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-body text-accent/70 hover:text-secondary hover:bg-secondary/5 transition-colors uppercase tracking-wider"
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
      <main className="flex-1 p-10">
        <div className="mb-10">
          <h2 className="font-heading text-4xl text-light mb-2">Dashboard</h2>
          <p className="font-body text-accent/40 text-sm">Resumen del pipeline de ventas</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {stages.map((stage) => (
            <div key={stage.slug} className="bg-primary border border-secondary/10 p-6">
              <div className={`${stage.color} text-white w-10 h-10 flex items-center justify-center mb-4`}>
                {stage.icon}
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-accent/40 mb-1">
                {stage.label}
              </p>
              <p className="font-heading text-3xl text-light">—</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/crm/pipeline"
            className="bg-primary border border-secondary/10 p-8 hover:border-secondary/30 transition-colors group"
          >
            <Kanban size={24} className="text-secondary mb-4" />
            <h3 className="font-heading text-xl text-light mb-2">Ver Pipeline</h3>
            <p className="font-body text-sm text-accent/40">Tablero Kanban con todos los leads</p>
          </Link>
          <Link
            to="/crm/leads"
            className="bg-primary border border-secondary/10 p-8 hover:border-secondary/30 transition-colors group"
          >
            <Users size={24} className="text-secondary mb-4" />
            <h3 className="font-heading text-xl text-light mb-2">Lista de Leads</h3>
            <p className="font-body text-sm text-accent/40">Ver y gestionar todos los prospectos</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
