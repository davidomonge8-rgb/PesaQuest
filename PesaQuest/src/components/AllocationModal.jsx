import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  ALLOCATION_PRESETS,
  compactKes,
  deriveFinance,
  formatKes,
  parseKes,
} from '../lib/finance'
import '../componentscss/AllocationModal.css'

function AllocationModal({ open, allocation, targetRate, onClose, onSave }) {
  const titleId = useId()
  const inputRef = useRef(null)
  const [draft, setDraft] = useState(allocation)
  const [inputValue, setInputValue] = useState(formatKes(allocation, 2))

  useEffect(() => {
    if (!open) return undefined
    setDraft(allocation)
    setInputValue(formatKes(allocation, 2))

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, allocation, onClose])

  const preview = useMemo(() => deriveFinance(draft, targetRate), [draft, targetRate])

  if (!open) return null

  const commitInput = () => {
    const next = parseKes(inputValue)
    setDraft(next)
    setInputValue(formatKes(next, 2))
  }

  const applyPreset = (value) => {
    setDraft(value)
    setInputValue(formatKes(value, 2))
  }

  return (
    <div
      className="allocation-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="allocation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="allocation-body">
          <div className="allocation-header">
            <div>
              <p className="allocation-kicker">Capital planning</p>
              <h2 id={titleId} className="allocation-title">
                Update Monthly
                <br />
                Allocation
              </h2>
            </div>
            <button type="button" className="allocation-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="allocation-field-label">Expected baseline inflow (KES)</p>
          <div className="allocation-input-wrap">
            <span className="allocation-currency">KES</span>
            <input
              ref={inputRef}
              className="allocation-input"
              value={inputValue}
              inputMode="decimal"
              aria-label="Expected baseline inflow"
              onChange={(event) => {
                const nextValue = event.target.value
                setInputValue(nextValue)
                setDraft(parseKes(nextValue))
              }}
              onBlur={commitInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  commitInput()
                }
              }}
            />
            <button
              type="button"
              className="allocation-edit"
              aria-label="Edit amount"
              onClick={() => inputRef.current?.focus()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 20h4.2L19.4 8.8a1.9 1.9 0 0 0 0-2.7L17.9 4.6a1.9 1.9 0 0 0-2.7 0L4 15.8V20Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="allocation-presets">
            {ALLOCATION_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`allocation-preset${draft === preset ? ' is-active' : ''}`}
                onClick={() => applyPreset(preset)}
              >
                {compactKes(preset)}
              </button>
            ))}
          </div>

          <p className="allocation-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="8" r="0.9" fill="currentColor" />
            </svg>
            <span>
              Sets safe-to-spend pacing (KES {formatKes(Math.round(preview.dailySafe))}/day) &amp; target
              savings velocity.
            </span>
          </p>

          <div className="allocation-split">
            <div className="allocation-split-head">
              <p className="allocation-split-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 4v8l5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Framework split
              </p>
              <p className="allocation-split-rule">
                50 / 30 / 20 rule
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h10M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M16 5l4 2-4 2M16 15l4 2-4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </div>
            <div className="allocation-split-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="allocation-split-grid">
              <div className="allocation-bucket">
                <p className="allocation-bucket-label">
                  <span className="allocation-dot needs" />
                  Needs (50%)
                </p>
                <p className="allocation-bucket-value">KES {formatKes(Math.round(preview.needs))}</p>
                <p className="allocation-bucket-note">Housing, Utilities</p>
              </div>
              <div className="allocation-bucket">
                <p className="allocation-bucket-label">
                  <span className="allocation-dot lifestyle" />
                  Lifestyle (30%)
                </p>
                <p className="allocation-bucket-value">KES {formatKes(Math.round(preview.lifestyle))}</p>
                <p className="allocation-bucket-note">Dining, Fuel</p>
              </div>
              <div className="allocation-bucket">
                <p className="allocation-bucket-label">
                  <span className="allocation-dot sacco" />
                  SACCO (20%)
                </p>
                <p className="allocation-bucket-value">KES {formatKes(Math.round(preview.sacco))}</p>
                <p className="allocation-bucket-note">Stima &amp; Shares</p>
              </div>
            </div>
          </div>
        </div>

        <div className="allocation-footer">
          <button type="button" className="allocation-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="allocation-save"
            onClick={() => {
              const next = parseKes(inputValue)
              onSave(next)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13.2 9.2 17.5 19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save Allocation
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllocationModal
