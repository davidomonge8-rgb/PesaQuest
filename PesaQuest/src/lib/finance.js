import { toIsoDate } from '../data/transactions'

export const DEFAULT_ALLOCATION = 140000
export const ALLOCATION_PRESETS = [120000, 140000, 160000]

const REFERENCE_INCOME = 140000
const REFERENCE = {
  monthlyBudget: 94500,
  emergencyBuffer: 8276,
}

export function daysLeftInMonth(date = new Date()) {
  const [year, month, day] = toIsoDate(date).split('-').map(Number)
  return new Date(Date.UTC(year, month, 0)).getUTCDate() - day
}

export function spentFromTransactions(transactions, date = new Date()) {
  const month = toIsoDate(date).slice(0, 7)

  return transactions.reduce((total, txn) => {
    if (txn.type === 'income') return total
    if (txn.date?.slice(0, 7) !== month) return total
    const amount = Number(txn.amount)
    return total + (Number.isFinite(amount) ? amount : 0)
  }, 0)
}

export function formatKes(amount, decimals = 0) {
  const safe = Number.isFinite(amount) ? amount : 0
  return safe.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function parseKes(value) {
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
  return Number.isFinite(numeric) ? numeric : 0
}

export function compactKes(amount) {
  const thousands = Math.round(amount / 1000)
  return `KES ${thousands}k`
}

function scale(referenceValue, allocation) {
  return (referenceValue / REFERENCE_INCOME) * allocation
}

export function deriveFinance(allocation, targetRate = 25, spentAmount = 0, date = new Date()) {
  const income = Math.max(0, allocation)
  const monthlyBudget = scale(REFERENCE.monthlyBudget, income)
  const spent = Math.max(0, Number(spentAmount) || 0)
  const remaining = monthlyBudget - spent
  const daysLeft = daysLeftInMonth(date)
  const dailySafe = remaining / Math.max(1, daysLeft)
  const emergencyBuffer = scale(REFERENCE.emergencyBuffer, income)
  const savingsTarget = income * (Number(targetRate) / 100)
  const budgetProgress = monthlyBudget > 0 ? Math.min(100, (spent / monthlyBudget) * 100) : 0

  return {
    needs: income * 0.5,
    lifestyle: income * 0.3,
    sacco: income * 0.2,
    monthlyBudget,
    remaining,
    dailySafe,
    emergencyBuffer,
    savingsTarget,
    spent,
    budgetProgress,
    daysLeft,
  }
}
