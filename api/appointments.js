import { ok, fail, readBody } from './_lib/http.js'
import { supabase } from './_lib/supabase.js'
import { nextAppointmentNo } from './_lib/ids.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed')

  const body = await readBody(req)
  const { full_name, designation, from_date, duration } = body
  if (!full_name || !designation || !from_date || !duration) {
    return fail(res, 400, 'full_name, designation, from_date, duration are required')
  }

  let appointment_no
  try {
    appointment_no = await nextAppointmentNo()
  } catch (err) {
    return fail(res, 500, err.message)
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert({ appointment_no, full_name, designation, from_date, duration })
    .select('*')
    .single()

  if (error) return fail(res, 500, error.message)
  return ok(res, data)
}
