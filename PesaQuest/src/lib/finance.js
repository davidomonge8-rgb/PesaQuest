export const DEFAULT_ALLOCATION = 140000
export const ALLOCATION_PRESETS = [120000, 140000, 160000]
export const DAYS_LEFT = 9
export const STORAGE_KEY = 'pq-monthly-allocation'

const REFERENCE_INCOME = 140000
const REFERENCE = {
  monthlyBudget: 94500,
  remaining: 45500,
  dailySafe: 4136,
  emergencyBuffer: 8276,
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

export function deriveFinance(allocation, targetRate = 25) {
  const income = Math.max(0, allocation)
  const monthlyBudget = scale(REFERENCE.monthlyBudget, income)
  const remaining = scale(REFERENCE.remaining, income)
  const dailySafe = scale(REFERENCE.dailySafe, income)
  const emergencyBuffer = scale(REFERENCE.emergencyBuffer, income)
  const savingsTarget = income * (Number(targetRate) / 100)
  const spent = Math.max(0, monthlyBudget - remaining)
  const budgetProgress = monthlyBudget > 0 ? (spent / monthlyBudget) * 100 : 0

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
    daysLeft: DAYS_LEFT,
  }
}
