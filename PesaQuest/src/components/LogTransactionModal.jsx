import { useEffect, useId, useRef, useState } from 'react'
import {
  ALLOCATION_CATEGORIES,
  formatKesAmount,
  parseAmount,
} from '../data/transactions'
import '../componentscss/LogTransactionModal.css'

const TABS = [
  { id: 'expense', label: 'Expense' },
  { id: 'income', label: 'Income' },
  { id: 'transfer', label: 'Transfer' },
]

const QUICK_ADDS = [
  { label: '+500', value: 500 },
  { label: '+1,000', value: 1000 },
  { label: '+5,000', value: 5000 },
]

function LogTransactionModal({ open, onClose, onSubmit }) {
  const titleId = useId()
  const amountId = useId()
  const errorId = useId()
  const amountRef = useRef(null)
  const [type, setType] = useState('expense')
  const [amountInput, setAmountInput] = useState('0.00')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => amountRef.current?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  if (!open) return null

  const addAmount = (delta) => {
    setError('')
    setAmountInput((current) => formatKesAmount(parseAmount(current) + delta))
  }

  const submit = (event) => {
    event.preventDefault()
    const amount = parseAmount(amountInput)

    if (amount <= 0) {
      setError('Enter an amount greater than zero.')
      amountRef.current?.focus()
      return
    }

    if (!category) {
      setError('Select a category before logging this transaction.')
      return
    }

    onSubmit({ amount, type, category })
  }

  return (
    <div className="log-overlay" onClick={onClose} role="presentation">
      <div
        className="log-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={submit}>
          <div className="log-body">
            <div className="log-header">
              <div>
                <p className="log-kicker">
                  <span aria-hidden="true">• </span>
                  Manual entry
                </p>
                <h2 id={titleId} className="log-title">
                  Log Transaction
                </h2>
                <p className="log-subtitle">Record an expense, income, or account transfer</p>
              </div>
              <button type="button" className="log-close" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="log-tabs" role="tablist" aria-label="Transaction type">
              {TABS.map((tab) => {
                const active = type === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    className={`log-tab${active ? ' is-active' : ''}`}
                    aria-selected={active}
                    onClick={() => setType(tab.id)}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="log-amount-head">
              <label htmlFor={amountId}>Total amount</label>
              <span>Kenyan Shilling</span>
            </div>
            <div className="log-amount-box">
              <span className="log-currency" aria-hidden="true">
                KES
              </span>
              <input
                ref={amountRef}
                id={amountId}
                className="log-amount-input"
                inputMode="decimal"
                autoComplete="off"
                value={amountInput}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                onChange={(event) => {
                  const raw = event.target.value.replace(/[^0-9.]/g, '')
                  const [whole, ...fraction] = raw.split('.')
                  const next = fraction.length === 0 ? whole : `${whole}.${fraction.join('').slice(0, 2)}`
                  setError('')
                  setAmountInput(next)
                }}
                onFocus={() => {
                  const value = parseAmount(amountInput)
                  setAmountInput(value === 0 ? '' : String(Math.round(value * 100) / 100))
                }}
                onBlur={() => setAmountInput(formatKesAmount(parseAmount(amountInput)))}
              />
            </div>

            <div className="log-quick">
              <span className="log-quick-label">Quick Add:</span>
              {QUICK_ADDS.map((chip) => (
                <button
                  key={chip.value}
                  type="button"
                  className="log-chip"
                  onClick={() => addAmount(chip.value)}
                >
                  {chip.label}
                </button>
              ))}
              <button
                type="button"
                className="log-chip log-chip-clear"
                onClick={() => {
                  setError('')
                  setAmountInput('0.00')
                }}
              >
                Clear
              </button>
            </div>

            <p className="log-section-label" id={`${amountId}-categories`}>
              Funds allocation
            </p>
            <div className="log-categories" role="group" aria-labelledby={`${amountId}-categories`}>
              {ALLOCATION_CATEGORIES.map((item) => {
                const active = category === item
                return (
                  <button
                    key={item}
                    type="button"
                    className={`log-chip${active ? ' is-active' : ''}`}
                    aria-pressed={active}
                    onClick={() => {
                      setError('')
                      setCategory(item)
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            {error ? (
              <p className="log-error" id={errorId} role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="log-footer">
            <button type="button" className="log-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="log-submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13.2 9.2 17.5 19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Log Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogTransactionModal
