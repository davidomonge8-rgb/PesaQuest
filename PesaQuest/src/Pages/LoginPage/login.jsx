import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import './login.css'

export default function LoginPage() {
  const [creating, setCreating] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    const fields = new FormData(event.currentTarget)
    const credentials = {
      email: fields.get('email').trim(),
      password: fields.get('password'),
    }
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const { data, error } = creating
        ? await supabase.auth.signUp({
          ...credentials,
          options: { emailRedirectTo: window.location.origin },
        })
        : await supabase.auth.signInWithPassword(credentials)
      if (error) throw error
      if (creating && !data.session) {
        setNotice('Check your email for a confirmation link, then sign in.')
        setCreating(false)
      }
    } catch (err) {
      setError(err.message || 'Could not sign in. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="account-screen">
      <div className="account-card">
        <h1>PesaQuest</h1>
        <h2>{creating ? 'Create an account' : 'Sign in'}</h2>
        <form onSubmit={submit}>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>
            Password
            <input name="password" type="password" autoComplete={creating ? 'new-password' : 'current-password'}
              minLength={creating ? 8 : undefined} required />
          </label>
          {error && <p role="alert">{error}</p>}
          {notice && <p role="status">{notice}</p>}
          <button type="submit" disabled={busy}>
            {busy ? 'Please wait…' : creating ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <button type="button" className="account-switch" disabled={busy} onClick={() => {
          setCreating(!creating)
          setError('')
          setNotice('')
        }}>
          {creating ? 'Back to sign in' : 'Create an account'}
        </button>
      </div>
    </main>
  )
}
