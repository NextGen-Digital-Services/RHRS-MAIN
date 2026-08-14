import { ok, fail, readBody } from '../_lib/http.js'
import { requireAdmin } from '../_lib/auth.js'
import { supabase } from '../_lib/supabase.js'
import { DESIGNATION_LABELS, DESIGNATION_LEVELS, DESIGNATION_QUOTA } from '../_lib/designations.js'

export default async function handler(req, res) {
  if (!(await requireAdmin(req, res))) return
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed')

  const body = await readBody(req)
  const q = String(body?.q || '').trim()

  let query = supabase.from('members').select('*')
  if (q) {
    const term = `%${q}%`
    query = query.or(`full_name.ilike.${term},emergency_contact.ilike.${term},member_id.ilike.${term}`)
  }
  const { data, error } = await query.order('created_at', { ascending: false }).limit(100)
  if (error) return fail(res, 500, error.message)

  const quotaCounts = {}
  for (const level of DESIGNATION_LEVELS) {
    const { count } = await supabase
      .from('members')
      .select('id', { count: 'exact', head: true })
      .eq('designation_level', level)
    quotaCounts[level] = count || 0
  }

  return ok(res, {
    members: data,
    quota: {
      perLevel: DESIGNATION_QUOTA,
      used: quotaCounts,
      labels: DESIGNATION_LABELS,
    },
  })
}
