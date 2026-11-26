import { useEffect, useState } from 'react'
import Dashboard from './Pages/Dashboard/dashboard.jsx'
import Transactions from './Pages/Transactions/transactions.jsx'
import Budget from './Pages/Budget/budget.jsx'
import LoginPage from './Pages/LoginPage/login.jsx'
import { FinanceProvider } from './context/FinanceContext'
import { useFinance } from './context/useFinance'
import { supabase } from './lib/supabase'
import './App.css'

const pages = { dashboard: Dashboard, transactions: Transactions, budgets: Budget }

function AccountScreen({ children }) {
  return <main className="account-screen"><div className="account-card">{children}</div></main>
}

function FinanceApp({ user }) {
  const [{ page, log }, setView] = useState({ page: 'dashboard', log: false })
  const [authError, setAuthError] = useState('')
  const [signingOut, setSigningOut] = useState(false)
  const { loading, saving, error, ready, refresh } = useFinance()
  const Page = pages[page]

  async function signOut() {
    setSigningOut(true)
    setAuthError('')
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error
    } catch (err) {
      setAuthError(err.message || 'Could not sign out.')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="connection-bar">
        <span>{user.email}</span>
        {loading && <span role="status">Loading financial data…</span>}
        {saving && <span role="status">Saving…</span>}
        <button type="button" disabled={loading || saving || signingOut} onClick={() => void refresh()}>
          Refresh
        </button>
        <button type="button" disabled={saving || signingOut} onClick={signOut}>Sign out</button>
      </div>
      {(error || authError) && <p className="connection-error" role="alert">{authError || error}</p>}
      {ready && <Page activeItem={page} onNavigate={(next, log = false) => setView({ page: next, log })}
        initialLogOpen={log} user={{ name: user.email }} />}
    </div>
  )
}

function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if (!supabase) return
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => subscription.unsubscribe()
  }, [])

  if (!supabase) {
    return (
      <AccountScreen>
        <h1>PesaQuest</h1>
        <p role="alert">Add the Supabase project URL and public key to PesaQuest/.env.local, then restart the app.</p>
      </AccountScreen>
    )
  }
  if (session === undefined) return <AccountScreen><p role="status">Checking your session…</p></AccountScreen>
  if (!session) return <LoginPage />

  return (
    <FinanceProvider key={session.user.id} owner={session.user.id}>
      <FinanceApp user={session.user} />
    </FinanceProvider>
  )
}

export default App
