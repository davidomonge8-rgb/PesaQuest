import { useState } from 'react'
import Dashboard from './Pages/Dashboard/dashboard.jsx'
import Transactions from './Pages/Transactions/transactions.jsx'
import Budget from './Pages/Budget/budget.jsx'
import { FinanceProvider } from './context/FinanceContext'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

  const pages = {
    dashboard: Dashboard,
    transactions: Transactions,
    budgets: Budget,
  }
  const Page = pages[page] ?? Dashboard

  return (
    <FinanceProvider>
      <div className="app-shell">
        <Page activeItem={page} onNavigate={setPage} />
      </div>
    </FinanceProvider>
  )
}

export default App
