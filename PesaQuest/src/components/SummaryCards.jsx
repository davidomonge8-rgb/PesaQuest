import {
  depositCaption,
  formatNetKes,
  formatSignedKes,
  outflowCaption,
  savingsRateLabel,
} from '../data/transactions'
import '../componentscss/SummaryCards.css'

function DownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 14.5 12 19.5l5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 9.5 12 4.5l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="6.5" width="17" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10.5h17" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.2" cy="14.2" r="1" fill="currentColor" />
    </svg>
  )
}

function SummaryCard({ kicker, value, caption, icon }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top">
        <p className="summary-kicker">{kicker}</p>
        <span className="summary-icon">{icon}</span>
      </div>
      <p className="summary-value">{value}</p>
      <p className="summary-caption">{caption}</p>
    </article>
  )
}

function SummaryCards({ summary, visible }) {
  const mask = '••••••'

  return (
    <section className="summary-grid" aria-label="Ledger summary">
      <SummaryCard
        kicker="Total inflow"
        value={visible ? formatSignedKes(summary.inflow, 'income') : mask}
        caption={depositCaption(summary.deposits)}
        icon={<DownIcon />}
      />
      <SummaryCard
        kicker="Total outflow"
        value={visible ? formatSignedKes(summary.outflow, 'expense') : mask}
        caption={outflowCaption(summary.outflowCount)}
        icon={<UpIcon />}
      />
      <SummaryCard
        kicker="Net balance / saved"
        value={visible ? formatNetKes(summary.net) : mask}
        caption={savingsRateLabel(summary.inflow, summary.net)}
        icon={<WalletIcon />}
      />
    </section>
  )
}

export default SummaryCards
