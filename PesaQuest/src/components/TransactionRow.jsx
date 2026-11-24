import { formatSignedKes, iconForCategory } from '../data/transactions'
import '../componentscss/TransactionRow.css'

function RowIcon({ name }) {
  if (name === 'bolt') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 3 6 13.2h6L11 21l8-11.2h-6L13 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'cash') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.2" y="6.2" width="17.6" height="11.6" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6.2 9.2h.01M17.8 14.8h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'piggy') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 10.2c.4-1.8 2-3 4-3 2.6 0 4.2 1.4 4.6 3.4H18a2 2 0 0 1 2 2v1.2a2 2 0 0 1-1.4 1.9l-.8 2.1a1 1 0 0 1-.9.6h-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.2 17.8 7.4 20M13.6 17.6 14.4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5.8 13.2a4.8 4.8 0 0 0 4.6 4.4h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="14.4" cy="12.1" r="0.7" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'fuel') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="3.5" width="9" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 7.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13.5 8.5h2.1A1.8 1.8 0 0 1 17.4 10v4.2a1.5 1.5 0 0 0 3 0V8.2L18.2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'wifi') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.8 10a10 10 0 0 1 14.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7.6 13a6 6 0 0 1 8.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10.3 15.8a2.4 2.4 0 0 1 3.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="18.2" r="0.9" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'utensils') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 3.5v7.2c0 1.2.7 2 1.8 2.1V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 7.2h1.8M9.8 3.5v7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 3.5c1.8 2 1.8 4.2 0 6.2V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'trend') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 16.5 9.2 11l3.3 3.2L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.2 7H20v5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'entertainment') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.2 9.2v5.6l5-2.8-5-2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'bag') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.2 8.2h11.6l-1 11.2a1.4 1.4 0 0 1-1.4 1.2H8.6a1.4 1.4 0 0 1-1.4-1.2L6.2 8.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 8.2V7a3 3 0 0 1 6 0v1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.8 9.2h14.4l-1.2 9.4a1.5 1.5 0 0 1-1.5 1.3H7.5a1.5 1.5 0 0 1-1.5-1.3L4.8 9.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.4 9.3 9.7 5.6A1.2 1.2 0 0 1 10.8 4.8h2.4a1.2 1.2 0 0 1 1.1.8l1.3 3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TransactionRow({ txn, visible }) {
  const income = txn.type === 'income'

  return (
    <article className="txn-row">
      <span className="txn-icon" aria-hidden="true">
        <RowIcon name={txn.icon || iconForCategory(txn.category)} />
      </span>

      <div className="txn-copy">
        <p className="txn-merchant">{txn.merchant}</p>
        <p className="txn-meta">
          <time dateTime={`${txn.date}T${txn.time}`}>{txn.time}</time>
          <span aria-hidden="true"> • </span>
          <span className="txn-source">{txn.source}</span>
        </p>
      </div>

      <span className={`txn-pill${income ? ' is-income' : ''}`}>{txn.category}</span>

      <div className="txn-amount-block">
        <p className={`txn-amount${income ? ' is-income' : ''}`}>
          {visible ? formatSignedKes(txn.amount, txn.type) : '••••••'}
        </p>
        <p className="txn-note">{txn.description}</p>
      </div>
    </article>
  )
}

export default TransactionRow
