import { useCallback, useMemo, useRef, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import SummaryCards from '../../components/SummaryCards'
import TransactionToolbar from '../../components/TransactionToolbar'
import TransactionGroup from '../../components/TransactionGroup'
import LogTransactionModal from '../../components/LogTransactionModal'
import {
  LEDGER_MONTH_LABEL,
  LEDGER_TODAY,
  PAGE_SIZE,
  SEED_TRANSACTIONS,
  currentTimeLabel,
  groupTransactions,
  iconForCategory,
  summarize,
} from '../../data/transactions'
import './transactions.css'

const USER = {
  name: 'Wanjiku Karanja',
  role: 'Private Wealth',
}

function Transactions({ activeItem = 'transactions', onNavigate }) {
  const logButtonRef = useRef(null)
  const [balancesVisible, setBalancesVisible] = useState(true)
  const [transactions, setTransactions] = useState(SEED_TRANSACTIONS)
  const [query, setQuery] = useState('')
  const [source, setSource] = useState('All')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return transactions.filter((txn) => {
      const matchesSource = source === 'All' || txn.source === source
      const matchesQuery =
        needle.length === 0 ||
        txn.merchant.toLowerCase().includes(needle) ||
        txn.description.toLowerCase().includes(needle)
      return matchesSource && matchesQuery
    })
  }, [transactions, query, source])

  const summary = useMemo(() => summarize(transactions), [transactions])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE)
  const groups = groupTransactions(pageItems)
  const rangeStart = filtered.length === 0 ? 0 : startIndex + 1
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filtered.length)

  const closeModal = useCallback(() => {
    setModalOpen(false)
    window.requestAnimationFrame(() => logButtonRef.current?.focus())
  }, [])

  const handleLog = ({ amount, type, category }) => {
    const stamp = new Date()
    const entry = {
      id: `txn-${stamp.getTime()}`,
      merchant: category,
      description: type === 'income' ? 'Manual income' : type === 'transfer' ? 'Account transfer' : 'Manual expense',
      amount,
      type,
      category,
      source: 'M-Pesa',
      date: LEDGER_TODAY,
      time: currentTimeLabel(stamp),
      icon: iconForCategory(category),
    }

    setTransactions((current) => [entry, ...current])
    setPage(1)
    setQuery('')
    setSource('All')
    closeModal()
  }

  return (
    <div className="transactions-page">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />

      <div className="transactions-main">
        <div className="transactions-topbar">
          <TopBar
            balancesVisible={balancesVisible}
            onToggleBalances={() => setBalancesVisible((open) => !open)}
            user={USER}
          />
        </div>

        <header className="transactions-header">
          <div>
            <p className="transactions-kicker">Ledger activity • KES Account</p>
            <h2 className="transactions-title">Transactions</h2>
            <p className="transactions-subtitle">
              {LEDGER_MONTH_LABEL} • {transactions.length} total entries recorded
            </p>
          </div>
          <button
            ref={logButtonRef}
            type="button"
            className="transactions-log"
            onClick={() => setModalOpen(true)}
          >
            <span aria-hidden="true">+</span>
            Log Entry
          </button>
        </header>

        <SummaryCards summary={summary} visible={balancesVisible} />

        <TransactionToolbar
          query={query}
          source={source}
          onQueryChange={(value) => {
            setQuery(value)
            setPage(1)
          }}
          onSourceChange={(value) => {
            setSource(value)
            setPage(1)
          }}
        />

        <div className="transactions-groups">
          {groups.length === 0 ? (
            <p className="transactions-empty" role="status">
              No transactions match your search.
            </p>
          ) : (
            groups.map((group) => (
              <TransactionGroup key={group.date} group={group} visible={balancesVisible} />
            ))
          )}
        </div>

        <footer className="transactions-footer">
          <p>
            Showing {rangeStart}–{rangeEnd} of {filtered.length} transactions
          </p>
          <nav className="transactions-pager" aria-label="Transactions pagination">
            <button
              type="button"
              className="transactions-page-btn"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <button
              type="button"
              className="transactions-page-btn"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= pageCount || filtered.length === 0}
            >
              Next
            </button>
          </nav>
        </footer>
      </div>

      {modalOpen ? (
        <LogTransactionModal open={modalOpen} onClose={closeModal} onSubmit={handleLog} />
      ) : null}
    </div>
  )
}

export default Transactions
