import { useState } from 'react'
import Dashboard from './Pages/Dashboard/dashboard.jsx'
import Transactions from './Pages/Transactions/transactions.jsx'
import { FinanceProvider } from './context/FinanceContext'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <FinanceProvider>
      <div className="app-shell">
        {page === 'transactions' ? (
          <Transactions activeItem="transactions" onNavigate={setPage} />
        ) : (
          <Dashboard activeItem={page} onNavigate={setPage} />
        )}
      </div>
    </FinanceProvider>
  )
}

export default App
