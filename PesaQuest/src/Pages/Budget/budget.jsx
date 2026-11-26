import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import AllocationModal from '../../components/AllocationModal'
import { useFinance } from '../../context/useFinance'
import { formatKes } from '../../lib/finance'
import { monthLabel } from '../../data/transactions'
import './budget.css'

function maskAmount(value, visible) {
  return visible ? value : '••••••'
}

function Budget({ activeItem = 'budgets', onNavigate, user }) {
  const [balancesVisible, setBalancesVisible] = useState(true)
  const [allocationOpen, setAllocationOpen] = useState(false)
  const {
    allocation,
    setAllocation,
    targetRate,
    setTargetRate,
    loading,
    saving,
    error,
    needs,
    lifestyle,
    sacco,
    monthlyBudget,
    remaining,
    spent,
    budgetProgress,
    daysLeft,
    savingsTarget,
  } = useFinance()

  const buckets = [
    {
      id: 'needs',
      label: 'Needs',
      share: '50%',
      amount: needs,
      note: 'Rent, utilities, groceries, transport',
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle',
      share: '30%',
      amount: lifestyle,
      note: 'Dining out, entertainment, personal care',
    },
    {
      id: 'sacco',
      label: 'Savings & SACCO',
      share: '20%',
      amount: sacco,
      note: 'SACCO deposits, emergency fund, investments',
    },
  ]

  return (
    <div className="budget-page">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />

      <div className="budget-main">
        <div className="budget-topbar">
          <TopBar
            balancesVisible={balancesVisible}
            onToggleBalances={() => setBalancesVisible((open) => !open)}
            user={user}
          />
        </div>

        <header className="budget-header">
          <div>
            <p className="budget-kicker">Spending plan • {monthLabel()}</p>
            <h2 className="budget-title">Budgets</h2>
            <p className="budget-subtitle">
              50 / 30 / 20 split on a {maskAmount(`KES ${formatKes(allocation)}`, balancesVisible)} monthly allocation
            </p>
          </div>
          <button
            type="button"
            className="budget-update-btn"
            disabled={loading || saving}
            onClick={() => setAllocationOpen(true)}
          >
            <span aria-hidden="true">+</span>
            Update Allocation
          </button>
        </header>

        <div className="budget-overview">
          <div className="budget-overview-card">
            <p className="budget-overview-kicker">Monthly budget</p>
            <p className="budget-overview-value">
              {maskAmount(`KES ${formatKes(Math.round(monthlyBudget))}`, balancesVisible)}
            </p>
            <p className="budget-overview-note">
              of {maskAmount(`KES ${formatKes(allocation)}`, balancesVisible)} allocated
            </p>
          </div>
          <div className="budget-overview-card">
            <p className="budget-overview-kicker">Spent so far</p>
            <p className="budget-overview-value">
              {maskAmount(`KES ${formatKes(Math.round(spent))}`, balancesVisible)}
            </p>
            <p className="budget-overview-note">{Math.round(budgetProgress)}% of budget used</p>
          </div>
          <div className="budget-overview-card">
            <p className="budget-overview-kicker">Remaining</p>
            <p className="budget-overview-value">
              {maskAmount(`KES ${formatKes(remaining, 2)}`, balancesVisible)}
            </p>
            <p className="budget-overview-note">{daysLeft} days left this month</p>
          </div>
          <div className="budget-overview-card">
            <p className="budget-overview-kicker">Savings target</p>
            <p className="budget-overview-value">
              {maskAmount(`KES ${formatKes(Math.round(savingsTarget))}`, balancesVisible)}
            </p>
            <p className="budget-overview-note">{targetRate}% of income per month</p>
          </div>
        </div>

        <div className="budget-progress-block">
          <div className="budget-progress-head">
            <p>Budget pacing</p>
            <span>{Math.round(budgetProgress)}% used</span>
          </div>
          <div className="budget-progress-track" aria-hidden="true">
            <div className="budget-progress-fill" style={{ width: `${budgetProgress}%` }} />
          </div>
        </div>

        <section className="budget-buckets" aria-label="Budget categories">
          {buckets.map((bucket) => (
            <article key={bucket.id} className="budget-bucket">
              <div className="budget-bucket-head">
                <h3>{bucket.label}</h3>
                <span className="budget-bucket-share">{bucket.share}</span>
              </div>
              <p className="budget-bucket-amount">
                {maskAmount(`KES ${formatKes(Math.round(bucket.amount))}`, balancesVisible)}
              </p>
              <p className="budget-bucket-note">{bucket.note}</p>
            </article>
          ))}
        </section>

        <section className="budget-target">
          <div>
            <h3>Salary target</h3>
            <p>Choose how much of your income goes to future wealth.</p>
          </div>
          <select disabled={loading || saving} value={targetRate} onChange={(event) => setTargetRate(event.target.value)}>
            <option value="20">20% of salary</option>
            <option value="25">25% of salary</option>
            <option value="30">30% of salary</option>
          </select>
        </section>
      </div>

      {allocationOpen ? (
        <AllocationModal
          open={allocationOpen}
          allocation={allocation}
          targetRate={targetRate}
          onClose={() => setAllocationOpen(false)}
          saving={saving || loading}
          error={error}
          onSave={async (value) => {
            if (await setAllocation(value)) setAllocationOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

export default Budget
