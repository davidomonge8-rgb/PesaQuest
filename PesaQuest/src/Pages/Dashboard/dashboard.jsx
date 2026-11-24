import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import ActivityList from '../../components/ActivityList'
import AllocationModal from '../../components/AllocationModal'
import { useFinance } from '../../context/FinanceContext'
import { formatKes } from '../../lib/finance'
import './dashboard.css'

const USER = {
  firstName: 'Wanjiku',
  name: 'Wanjiku Karanja',
  role: 'Private Wealth',
}

const ACTIVITY = [
  {
    id: 'retainer',
    title: 'Client Retainer Deposit',
    source: 'Equity Bank',
    date: 'Yesterday',
    amount: '+KES 120,000.00',
    credit: true,
    icon: 'inflow',
  },
  {
    id: 'sacco',
    title: 'Stima SACCO Deposit',
    source: 'Standing Order',
    date: '24 Oct',
    amount: 'KES 15,000.00',
    icon: 'standing',
  },
  {
    id: 'naivas',
    title: 'Naivas Supermarket',
    source: 'M-Pesa Till 48201',
    date: '23 Oct',
    amount: 'KES 4,820.00',
    icon: 'shop',
  },
  {
    id: 'kplc',
    title: 'KPLC Prepaid Tokens',
    source: 'M-Pesa Paybill',
    date: '22 Oct',
    amount: 'KES 2,500.00',
    icon: 'utility',
  },
]

function maskAmount(value, visible) {
  return visible ? value : '••••••'
}

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [balancesVisible, setBalancesVisible] = useState(true)
  const [allocationOpen, setAllocationOpen] = useState(false)
  const {
    allocation,
    setAllocation,
    targetRate,
    setTargetRate,
    monthlyBudget,
    remaining,
    dailySafe,
    emergencyBuffer,
    savingsTarget,
    budgetProgress,
    daysLeft,
  } = useFinance()

  return (
    <div className="dashboard">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <TopBar
            balancesVisible={balancesVisible}
            onToggleBalances={() => setBalancesVisible((open) => !open)}
            user={USER}
          />
        </div>

        <div className="dashboard-greeting">
          <div className="dashboard-greeting-copy">
            <p className="dashboard-status">
              October 2026
              <span className="dashboard-status-dot" />
              <span className="dashboard-status-sync">All accounts synchronized</span>
            </p>
            <h2 className="dashboard-hello">Good morning, {USER.firstName}</h2>
          </div>
          <button type="button" className="dashboard-log-btn">
            <span aria-hidden="true">+</span>
            Log Transaction
          </button>
        </div>

        <div className="dashboard-income">
          <div className="income-header">
            <div className="income-intro">
              <p className="income-kicker">
                Monthly inflow allocation <span>• October 2026</span>
              </p>
              <h3 className="income-title">Estimated Monthly Income &amp; Allowance</h3>
              <p className="income-copy">
                Set your expected baseline income for October 2026 to calibrate daily
                safe-to-spend targets, savings velocity, and budget pacing.
              </p>
            </div>
            <div className="income-badge">
              Regular
              <br />
              Allowance
            </div>
          </div>

          <div className="income-amount-row">
            <div className="income-amount">
              <span className="income-currency">KES</span>
              <span className="income-value">{maskAmount(formatKes(allocation, 2), balancesVisible)}</span>
            </div>
            <button
              type="button"
              className="income-update-btn"
              onClick={() => setAllocationOpen(true)}
            >
              Update Allocation
            </button>
          </div>
        </div>

        <div className="dashboard-metrics">
          <div className="metric-card metric-budget">
            <p className="metric-kicker">Monthly budget</p>
            <p className="metric-value">
              {maskAmount(`KES ${formatKes(Math.round(monthlyBudget))}`, balancesVisible)}{' '}
              <span>/ {formatKes(Math.round(allocation))}</span>
            </p>
            <div className="metric-progress">
              <div className="metric-progress-track" aria-hidden="true">
                <div className="metric-progress-fill" style={{ width: `${budgetProgress}%` }} />
              </div>
              <p className="metric-footnote">
                {maskAmount(`KES ${formatKes(remaining, 2)}`, balancesVisible)} remaining{' '}
                <strong>{daysLeft} days left</strong>
              </p>
            </div>
          </div>

          <div className="metric-card metric-safe">
            <p className="metric-kicker">Safe-to-spend daily</p>
            <p className="metric-value">
              {maskAmount(`KES ${formatKes(Math.round(dailySafe))}`, balancesVisible)} <span>/ day</span>
            </p>
            <div className="metric-safe-note">
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3 5 6.5v5.2c0 4.3 2.8 7.3 7 8.8 4.2-1.5 7-4.5 7-8.8V6.5L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                Rebalanced daily
              </p>
              <p>Emergency buffer {maskAmount(`KES ${formatKes(emergencyBuffer, 2)}`, balancesVisible)}</p>
            </div>
          </div>

          <div className="metric-card metric-target">
            <div className="metric-target-head">
              <p className="metric-kicker">Salary target</p>
              <span className="metric-rec">20–30% Rec.</span>
            </div>
            <p className="metric-target-title">Save for Future Wealth</p>
            <div className="metric-rate-row">
              <span>Target rate</span>
              <select value={targetRate} onChange={(event) => setTargetRate(event.target.value)}>
                <option value="20">20% of salary</option>
                <option value="25">25% of salary</option>
                <option value="30">30% of salary</option>
              </select>
            </div>
            <div className="metric-target-footer">
              <p>
                ≈ {maskAmount(`KES ${formatKes(Math.round(savingsTarget))}`, balancesVisible)} / mo
              </p>
              <button type="button" className="metric-set-btn">
                Set Target
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-activity">
          <ActivityList
            items={ACTIVITY.map((item) => ({
              ...item,
              amount: balancesVisible ? item.amount : '••••••',
            }))}
          />
        </div>
      </div>

      {allocationOpen ? (
        <AllocationModal
          open={allocationOpen}
          allocation={allocation}
          targetRate={targetRate}
          onClose={() => setAllocationOpen(false)}
          onSave={(value) => {
            setAllocation(value)
            setAllocationOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

export default Dashboard
