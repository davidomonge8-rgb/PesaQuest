import '../componentscss/TopBar.css'

function TopBar({ balancesVisible, onToggleBalances, user }) {
  return (
    <div className="topbar">
      <button
        type="button"
        className="topbar-visibility"
        onClick={onToggleBalances}
        aria-pressed={balancesVisible}
      >
        {balancesVisible ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path
              d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6 0 9.5 7 9.5 7a16.6 16.6 0 0 1-3.1 3.9M6.1 6.7C3.9 8.5 2.5 12 2.5 12S6 19 12 19c1.3 0 2.5-.3 3.6-.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
        {balancesVisible ? 'Balances visible' : 'Balances hidden'}
      </button>

      <div className="topbar-user">
        <div className="topbar-profile">
          <div>
            <span className="topbar-name">{user.name}</span>
          </div>
          <span className="topbar-avatar" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M5.5 19c1.3-3 3.7-4.5 6.5-4.5s5.2 1.5 6.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
