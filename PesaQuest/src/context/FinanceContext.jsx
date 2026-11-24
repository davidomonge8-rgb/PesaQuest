import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_ALLOCATION,
  STORAGE_KEY,
  deriveFinance,
} from '../lib/finance'

const FinanceContext = createContext(null)

function readStoredAllocation() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const value = Number(stored)
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_ALLOCATION
  } catch {
    return DEFAULT_ALLOCATION
  }
}

export function FinanceProvider({ children }) {
  const [allocation, setAllocation] = useState(readStoredAllocation)
  const [targetRate, setTargetRate] = useState('25')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(allocation))
    } catch {
      /* ignore quota / private mode */
    }
  }, [allocation])

  const derived = useMemo(
    () => deriveFinance(allocation, targetRate),
    [allocation, targetRate],
  )

  const value = useMemo(
    () => ({
      allocation,
      setAllocation,
      targetRate,
      setTargetRate,
      ...derived,
    }),
    [allocation, derived, targetRate],
  )

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return context
}
