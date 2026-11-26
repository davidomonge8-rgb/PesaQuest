import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

function isPublicKey(value) {
  if (!value || value === 'sb_publishable_your_key') return false
  if (/^sb_publishable_[\w-]+$/.test(value)) return true
  try {
    const payload = value.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')
    return JSON.parse(atob(payload)).role === 'anon'
  } catch {
    return false
  }
}

function connect() {
  if (!isPublicKey(key)) return null
  try {
    const endpoint = new URL(url)
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname)
    const secure = endpoint.protocol === 'https:' || (local && endpoint.protocol === 'http:')
    if (!secure || endpoint.hostname === 'your-project-ref.supabase.co') return null
    return createClient(endpoint.origin, key)
  } catch {
    return null
  }
}

export const supabase = connect()
