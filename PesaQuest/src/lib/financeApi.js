import { iconForCategory } from '../data/transactions'
import { supabase } from './supabase'

const budgetFields = 'id, allocation, target_rate'
const transactionFields = 'id, merchant, description, amount, type, category, source, occurred_on, occurred_at, created_at'

function mapTransaction(row) {
  return {
    id: row.id,
    merchant: row.merchant,
    description: row.description ?? '',
    amount: Number(row.amount),
    type: row.type,
    category: row.category,
    source: row.source,
    date: row.occurred_on,
    time: row.occurred_at.slice(0, 5),
    occurredAt: row.occurred_at,
    createdAt: row.created_at,
    icon: iconForCategory(row.category),
  }
}

export async function fetchBudget(owner) {
  const query = () => supabase.from('budgets').select(budgetFields).eq('owner_key', owner)
  const { data, error } = await query().maybeSingle()
  if (error) throw error
  if (data) return data

  const { error: insertError } = await supabase.from('budgets')
    .upsert({ owner_key: owner }, { onConflict: 'owner_key', ignoreDuplicates: true })
  if (insertError) throw insertError

  const { data: created, error: readError } = await query().single()
  if (readError) throw readError
  return created
}

export async function saveBudget(owner, changes) {
  const { data, error } = await supabase.from('budgets')
    .update({ ...changes, updated_at: new Date().toISOString() })
    .eq('owner_key', owner)
    .select(budgetFields)
    .single()
  if (error) throw error
  return data
}

export function compareTransactions(a, b) {
  return b.date.localeCompare(a.date)
    || b.occurredAt.localeCompare(a.occurredAt)
    || b.createdAt.localeCompare(a.createdAt)
    || b.id.localeCompare(a.id)
}

export async function fetchTransactions(owner) {
  const transactions = []
  let lastId
  // A stable ID cursor keeps pages from shifting when other devices add entries.
  while (true) {
    let query = supabase.from('transactions')
      .select(transactionFields)
      .eq('owner_key', owner)
      .order('id')
      .limit(500)
    if (lastId) query = query.gt('id', lastId)

    const { data, error } = await query
    if (error) throw error
    if (data.length === 0) return transactions.sort(compareTransactions)
    transactions.push(...data.map(mapTransaction))
    lastId = data.at(-1).id
  }
}

export async function insertTransaction(owner, entry) {
  const { error } = await supabase.from('transactions')
    .upsert({
      id: entry.id,
      owner_key: owner,
      merchant: entry.merchant,
      description: entry.description,
      amount: entry.amount,
      type: entry.type,
      category: entry.category,
      source: entry.source,
      occurred_on: entry.date,
      occurred_at: entry.time,
    }, { onConflict: 'id', ignoreDuplicates: true })
  if (error) throw error

  const { data, error: readError } = await supabase.from('transactions')
    .select(transactionFields)
    .eq('owner_key', owner)
    .eq('id', entry.id)
    .single()
  if (readError) throw readError
  return mapTransaction(data)
}
