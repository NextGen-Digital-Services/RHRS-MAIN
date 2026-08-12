import { useEffect, useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const TOKEN_KEY = 'rhs_admin_token'

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  }, [token])

  if (!token) return <AdminLogin onLogin={setToken} />
  return <AdminDashboard token={token} onLogout={() => setToken(null)} />
}
