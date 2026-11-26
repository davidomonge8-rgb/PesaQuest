import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_ALLOCATION, deriveFinance, spentFromTransactions } from '../lib/finance'
import { compareTransactions, fetchBudget, fetchTransactions, insertTransaction, saveBudget } from '../lib/financeApi'
import { FinanceContext } from './useFinance'

export function FinanceProvider({ children, owner }) {
  const [budget, setBudget] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const inFlight = useRef(false)

  const loadFinance = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    try {
      const [nextBudget, rows] = await Promise.allSettled([fetchBudget(owner), fetchTransactions(owner)])
      if (nextBudget.status === 'rejected') throw nextBudget.reason
      if (rows.status === 'rejected') throw rows.reason
      setBudget(nextBudget.value)
      setTransactions(rows.value)
      setError('')
    } catch (err) {
      setError(err.message || 'Could not load financial data.')
    } finally {
      inFlight.current = false
      setLoading(false)
    }
  }, [owner])

  useEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (active) void loadFinance()
    })
    return () => { active = false }
  }, [loadFinance])

  function refresh() {
    if (inFlight.current) return
    setLoading(true)
    void loadFinance()
  }

  async function save(operation, fallback, propagate = false) {
    if (inFlight.current || !budget) {
      const message = 'Wait for the current request to finish before saving.'
      setError(message)
      if (propagate) throw new Error(message)
      return false
    }
    inFlight.current = true
    setSaving(true)
    try {
      await operation()
      setError('')
      return true
    } catch (err) {
      const message = err.message || fallback
      setError(message)
      if (propagate) throw new Error(message)
      return false
    } finally {
      inFlight.current = false
      setSaving(false)
    }
  }

  const allocation = Number(budget?.allocation ?? DEFAULT_ALLOCATION)
  const targetRate = String(budget?.target_rate ?? 25)

  const value = {
    allocation,
    targetRate,
    transactions,
    loading,
    saving,
    error,
    ready: Boolean(budget),
    refresh,
    setAllocation: (value) => save(async () => {
      setBudget(await saveBudget(owner, { allocation: value }))
    }, 'Could not save the allocation.'),
    setTargetRate: (value) => save(async () => {
      setBudget(await saveBudget(owner, { target_rate: Number(value) }))
    }, 'Could not save the savings target.'),
    addTransaction: (entry) => save(async () => {
      const row = await insertTransaction(owner, entry)
      setTransactions((current) => [row, ...current.filter((item) => item.id !== row.id)]
        .sort(compareTransactions))
    }, 'Could not save the transaction.', true),
    ...deriveFinance(allocation, targetRate, spentFromTransactions(transactions)),
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
