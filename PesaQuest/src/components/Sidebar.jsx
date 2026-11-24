import '../componentscss/Sidebar.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'budgets', label: 'Budgets' },
]

function Sidebar({ activeItem = 'dashboard', onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1 className="sidebar-logo">PesaQuest</h1>
      </div>

      <nav className="sidebar-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-nav-item${activeItem === item.id ? ' is-active' : ''}`}
            onClick={() => onNavigate?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-currency">
          <div>
            <span className="sidebar-currency-label">Currency</span>
            <span className="sidebar-currency-value">KES (Nairobi)</span>
          </div>
          <span className="sidebar-currency-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M6 10h.01M18 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
