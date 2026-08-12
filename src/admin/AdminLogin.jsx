import { useState } from 'react'
import { login } from './api'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(username, password)
      onLogin(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-saffron/30">
          <div className="h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />
          <div className="p-8">
            <div className="text-center mb-8">
              <img src="/logo.png" alt="RHRS Logo" className="w-16 h-16 mx-auto object-contain mb-4" draggable="false" />
              <h1 className="font-heading text-xl font-bold text-ink">RHRS Admin Panel</h1>
              <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">राष्ट्रीय हिन्दू रक्षक संघ</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5">Username</label>
                <input type="text" required className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5">Password</label>
                <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              </div>
              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2">⚠ {error}</p>}
              <button type="submit" className="w-full btn-saffron" disabled={loading}>
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>
            <a href="/" className="block text-center text-xs text-ink-muted hover:text-saffron mt-6 transition-colors">← Back to website</a>
          </div>
        </div>
      </div>
    </div>
  )
}
