import { supabase } from './supabase.js'

const pad = (n) => String(n).padStart(4, '0')

async function nextId(name, prefix) {
  const { data, error } = await supabase.rpc('next_sequence', { p_name: name })
  if (error) throw error
  return `${prefix}-${new Date().getFullYear()}-${pad(data)}`
}

export function nextMemberId() {
  return nextId('members', 'RHRS')
}

export function nextAppointmentNo() {
  return nextId('appointments', 'RHRS-APT')
}

export function nextReceiptNo() {
  return nextId('payments', 'RHRS-RCT')
}
