import { ok, fail } from '../_lib/http.js'
import { requireAdmin } from '../_lib/auth.js'
import { supabase } from '../_lib/supabase.js'

async function recent(table, limit = 10) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export default async function handler(req, res) {
  if (!(await requireAdmin(req, res))) return
  if (req.method !== 'GET') return fail(res, 405, 'Method not allowed')

  try {
    const [members, appointments, payments] = await Promise.all([
      recent('members'),
      recent('appointments'),
      recent('payments'),
    ])
    return ok(res, { members, appointments, payments })
  } catch (err) {
    return fail(res, 500, err.message)
  }
}
