import { ok, fail, readBody } from './_lib/http.js'
import { supabase } from './_lib/supabase.js'
import { nextMemberId } from './_lib/ids.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed')

  const body = await readBody(req)
  const { full_name, address, blood_group, emergency_contact } = body
  if (!full_name || !address || !blood_group || !emergency_contact) {
    return fail(res, 400, 'full_name, address, blood_group, emergency_contact are required')
  }

  let member_id
  try {
    member_id = await nextMemberId()
  } catch (err) {
    return fail(res, 500, err.message)
  }

  const { data, error } = await supabase
    .from('members')
    .insert({ member_id, full_name, address, blood_group, emergency_contact })
    .select('*')
    .single()

  if (error) return fail(res, 500, error.message)
  return ok(res, data)
}
