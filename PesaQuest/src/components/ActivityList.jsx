import '../componentscss/ActivityList.css'

function ActivityIcon({ type }) {
  if (type === 'inflow') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M12 19l-4.5-4.5M12 19l4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'standing') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'shop') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 9h12l-1 11H7L6 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 3 6 14h5l-1 7 8-12h-5l0-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function ActivityList({ items }) {
  return (
    <section className="activity-card">
      <div className="activity-header">
        <p className="activity-kicker">Recent key activity</p>
        <p className="activity-meta">Last {items.length} items</p>
      </div>

      <div className="activity-list">
        {items.map((item) => (
          <div className="activity-item" key={item.id}>
            <span className="activity-icon" aria-hidden="true">
              <ActivityIcon type={item.icon} />
            </span>
            <div className="activity-copy">
              <p className="activity-title">{item.title}</p>
              <p className="activity-subtitle">
                {item.source} • {item.date}
              </p>
            </div>
            <p className={`activity-amount${item.credit ? ' is-credit' : ''}`}>
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ActivityList
