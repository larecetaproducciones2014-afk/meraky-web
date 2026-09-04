import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function CRMLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      navigate('/crm/pipeline')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl text-secondary mb-2">MERAKY</h1>
          <p className="font-body text-xs uppercase tracking-widest text-accent/40">CRM · Panel de ventas</p>
        </div>

        {/* Card */}
        <div className="bg-dark border border-secondary/10 p-10">
          <div className="flex items-center gap-3 mb-8">
            <Lock size={16} className="text-secondary" />
            <h2 className="font-body text-sm uppercase tracking-widest text-accent/70">
              Acceso restringido
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@meraky.mx"
                required
                className="w-full bg-primary border border-secondary/20 text-light px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-primary border border-secondary/20 text-light px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-secondary text-primary font-semibold px-8 py-4 hover:bg-accent transition-colors uppercase tracking-widest text-sm w-full mt-8 disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? 'Ingresando...' : 'Ingresar al CRM'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
