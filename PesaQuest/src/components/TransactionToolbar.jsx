import { SOURCE_FILTERS } from '../data/transactions'
import '../componentscss/TransactionToolbar.css'

function TransactionToolbar({ query, source, onQueryChange, onSourceChange }) {
  return (
    <div className="txn-toolbar">
      <label className="txn-search">
        <span className="visually-hidden">Search by merchant or description</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          placeholder="Search by merchant or description..."
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <div className="txn-filters" role="group" aria-label="Filter by source">
        {SOURCE_FILTERS.map((item) => {
          const active = source === item
          return (
            <button
              key={item}
              type="button"
              className={`txn-filter${active ? ' is-active' : ''}`}
              aria-pressed={active}
              onClick={() => onSourceChange(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionToolbar
