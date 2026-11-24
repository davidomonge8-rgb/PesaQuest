import Dashboard from './Pages/Dashboard/dashboard.jsx'
import { FinanceProvider } from './context/FinanceContext'
import './App.css'

function App() {
  return (
    <FinanceProvider>
      <div className="app-shell">
        <Dashboard />
      </div>
    </FinanceProvider>
  )
}

export default App
