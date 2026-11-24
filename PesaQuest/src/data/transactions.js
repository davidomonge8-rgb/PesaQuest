export const LEDGER_TODAY = '2026-10-25'
export const LEDGER_MONTH_LABEL = 'October 2026'
export const PAGE_SIZE = 8

export const SOURCE_FILTERS = ['All', 'M-Pesa', 'Equity Bank', 'Stima SACCO']

export const ALLOCATION_CATEGORIES = [
  'Groceries',
  'Dining & Food',
  'Fuel & Commute',
  'Utilities & Bills',
  'Entertainment',
  'SACCO Contribution',
  'Shopping',
]

const CATEGORY_ICONS = {
  Groceries: 'basket',
  Dining: 'utensils',
  'Dining & Food': 'utensils',
  Transport: 'fuel',
  'Fuel & Commute': 'fuel',
  Utilities: 'bolt',
  'Utilities & Bills': 'bolt',
  Consulting: 'cash',
  Investment: 'piggy',
  'SACCO Contribution': 'piggy',
  Yield: 'trend',
  Entertainment: 'entertainment',
  Shopping: 'bag',
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const SEED_TRANSACTIONS = [
  {
    id: 'naivas-kilimani',
    merchant: 'Naivas Supermarket Kilimani',
    description: 'incl. KES 34.00 tariff',
    amount: 4820,
    type: 'expense',
    category: 'Groceries',
    source: 'M-Pesa',
    date: '2026-10-25',
    time: '18:42',
    icon: 'basket',
  },
  {
    id: 'kplc-tokens',
    merchant: 'KPLC Prepaid Tokens',
    description: 'Meter 37190–281',
    amount: 3500,
    type: 'expense',
    category: 'Utilities',
    source: 'M-Pesa',
    date: '2026-10-25',
    time: '14:15',
    icon: 'bolt',
  },
  {
    id: 'client-retainer',
    merchant: 'Client Retainer Deposit',
    description: 'Net received',
    amount: 120000,
    type: 'income',
    category: 'Consulting',
    source: 'Equity Bank',
    date: '2026-10-25',
    time: '09:12',
    icon: 'cash',
  },
  {
    id: 'stima-contribution',
    merchant: 'Stima SACCO Monthly Contribution',
    description: 'Share capital',
    amount: 25000,
    type: 'expense',
    category: 'Investment',
    source: 'Stima SACCO',
    date: '2026-10-24',
    time: '16:40',
    icon: 'piggy',
  },
  {
    id: 'totalenergies',
    merchant: 'TotalEnergies Hurlingham',
    description: 'Debit Card',
    amount: 6500,
    type: 'expense',
    category: 'Transport',
    source: 'Equity Bank',
    date: '2026-10-24',
    time: '08:22',
    icon: 'fuel',
  },
  {
    id: 'safaricom-fibre',
    merchant: 'Safaricom Home Fibre',
    description: 'Monthly 50Mbps',
    amount: 5000,
    type: 'expense',
    category: 'Utilities',
    source: 'M-Pesa',
    date: '2026-10-22',
    time: '11:05',
    icon: 'wifi',
  },
  {
    id: 'artcaffe',
    merchant: 'Artcaffé Grand Oval',
    description: 'Business Lunch',
    amount: 3250,
    type: 'expense',
    category: 'Dining',
    source: 'M-Pesa',
    date: '2026-10-22',
    time: '13:30',
    icon: 'utensils',
  },
  {
    id: 'tbill-coupon',
    merchant: 'Treasury Bill Coupon Repayment',
    description: 'CBK Ref 88219',
    amount: 20000,
    type: 'income',
    category: 'Yield',
    source: 'Equity Bank',
    date: '2026-10-22',
    time: '10:00',
    icon: 'trend',
  },
  {
    id: 'java-kimathi',
    merchant: 'Java House Kimathi',
    description: 'Coffee meeting',
    amount: 1850,
    type: 'expense',
    category: 'Dining',
    source: 'M-Pesa',
    date: '2026-10-21',
    time: '12:40',
    icon: 'utensils',
  },
  {
    id: 'bolt-westlands',
    merchant: 'Bolt Ride to Westlands',
    description: 'Trip fare',
    amount: 640,
    type: 'expense',
    category: 'Transport',
    source: 'M-Pesa',
    date: '2026-10-21',
    time: '09:15',
    icon: 'fuel',
  },
  {
    id: 'carrefour',
    merchant: 'Carrefour Two Rivers',
    description: 'Household restock',
    amount: 9480,
    type: 'expense',
    category: 'Shopping',
    source: 'Equity Bank',
    date: '2026-10-20',
    time: '17:05',
    icon: 'bag',
  },
  {
    id: 'zuku',
    merchant: 'Zuku Home Internet',
    description: 'Monthly plan',
    amount: 4299,
    type: 'expense',
    category: 'Utilities',
    source: 'Equity Bank',
    date: '2026-10-20',
    time: '08:00',
    icon: 'wifi',
  },
  {
    id: 'shell-langata',
    merchant: 'Shell Langata Road',
    description: 'V-Power',
    amount: 3750,
    type: 'expense',
    category: 'Transport',
    source: 'Equity Bank',
    date: '2026-10-18',
    time: '19:22',
    icon: 'fuel',
  },
  {
    id: 'quickmart',
    merchant: 'Quickmart Kilimani',
    description: 'Weekly shop',
    amount: 2140,
    type: 'expense',
    category: 'Groceries',
    source: 'M-Pesa',
    date: '2026-10-18',
    time: '13:10',
    icon: 'basket',
  },
  {
    id: 'netflix',
    merchant: 'Netflix Subscription',
    description: 'Standard plan',
    amount: 1100,
    type: 'expense',
    category: 'Entertainment',
    source: 'Equity Bank',
    date: '2026-10-18',
    time: '06:12',
    icon: 'entertainment',
  },
  {
    id: 'artcaffe-junction',
    merchant: 'Artcaffé Junction',
    description: 'Afternoon coffee',
    amount: 980,
    type: 'expense',
    category: 'Dining',
    source: 'M-Pesa',
    date: '2026-10-16',
    time: '15:45',
    icon: 'utensils',
  },
  {
    id: 'naivas-lavington',
    merchant: 'Naivas Lavington',
    description: 'Groceries',
    amount: 2675,
    type: 'expense',
    category: 'Groceries',
    source: 'M-Pesa',
    date: '2026-10-16',
    time: '11:20',
    icon: 'basket',
  },
  {
    id: 'safaricom-airtime',
    merchant: 'Safaricom Airtime',
    description: 'Airtime top up',
    amount: 500,
    type: 'expense',
    category: 'Utilities',
    source: 'M-Pesa',
    date: '2026-10-15',
    time: '18:02',
    icon: 'bolt',
  },
  {
    id: 'uber-airport',
    merchant: 'Uber Airport',
    description: 'JKIA drop-off',
    amount: 1850,
    type: 'expense',
    category: 'Transport',
    source: 'M-Pesa',
    date: '2026-10-15',
    time: '07:30',
    icon: 'fuel',
  },
  {
    id: 'stima-shares',
    merchant: 'Stima SACCO Shares',
    description: 'Additional shares',
    amount: 8000,
    type: 'expense',
    category: 'Investment',
    source: 'Stima SACCO',
    date: '2026-10-14',
    time: '10:00',
    icon: 'piggy',
  },
  {
    id: 'kplc-postpaid',
    merchant: 'KPLC Postpaid',
    description: 'Account 44120',
    amount: 2200,
    type: 'expense',
    category: 'Utilities',
    source: 'M-Pesa',
    date: '2026-10-14',
    time: '09:40',
    icon: 'bolt',
  },
  {
    id: 'total-ngong',
    merchant: 'TotalEnergies Ngong',
    description: 'Fuel',
    amount: 3200,
    type: 'expense',
    category: 'Transport',
    source: 'Equity Bank',
    date: '2026-10-12',
    time: '16:18',
    icon: 'fuel',
  },
  {
    id: 'textbook-centre',
    merchant: 'Text Book Centre',
    description: 'Stationery',
    amount: 2466,
    type: 'expense',
    category: 'Shopping',
    source: 'Equity Bank',
    date: '2026-10-12',
    time: '14:05',
    icon: 'bag',
  },
  {
    id: 'java-yaya',
    merchant: 'Java House Yaya',
    description: 'Team lunch',
    amount: 1300,
    type: 'expense',
    category: 'Dining',
    source: 'M-Pesa',
    date: '2026-10-10',
    time: '12:10',
    icon: 'utensils',
  },
]

export function iconForCategory(category) {
  return CATEGORY_ICONS[category] || 'basket'
}

export function parseAmount(value) {
  const cleaned = String(value ?? '').replace(/[^0-9.]/g, '')
  if (!cleaned) return 0
  const numeric = Number(cleaned)
  return Number.isFinite(numeric) ? numeric : 0
}

export function formatKesAmount(amount) {
  const safe = Number.isFinite(amount) ? Math.abs(amount) : 0
  return safe.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatSignedKes(amount, type) {
  const prefix = type === 'income' ? '+' : '-'
  return `${prefix}KES ${formatKesAmount(amount)}`
}

export function formatNetKes(amount) {
  const prefix = amount > 0 ? '+' : amount < 0 ? '-' : ''
  return `${prefix}KES ${formatKesAmount(amount)}`
}

export function currentTimeLabel(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function parseIsoDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function startOfWeekMonday(date) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const offset = (copy.getDay() + 6) % 7
  copy.setDate(copy.getDate() - offset)
  return copy.getTime()
}

function formatGroupDate(iso) {
  const date = parseIsoDate(iso)
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function groupTitle(iso, todayIso = LEDGER_TODAY) {
  const date = parseIsoDate(iso)
  const today = parseIsoDate(todayIso)
  const diffDays = Math.round((today.getTime() - date.getTime()) / 86400000)
  const pretty = formatGroupDate(iso)

  if (diffDays === 0) return `Today — ${pretty}`
  if (diffDays === 1) return `Yesterday — ${pretty}`
  if (diffDays > 1 && startOfWeekMonday(date) === startOfWeekMonday(today)) {
    return `Earlier this week — ${pretty}`
  }
  return `${WEEKDAYS[date.getDay()]} — ${pretty}`
}

export function groupTransactions(items, todayIso = LEDGER_TODAY) {
  const groups = []

  items.forEach((item) => {
    const current = groups[groups.length - 1]
    if (!current || current.date !== item.date) {
      groups.push({
        date: item.date,
        title: groupTitle(item.date, todayIso),
        items: [item],
      })
    } else {
      current.items.push(item)
    }
  })

  return groups
}

export function summarize(transactions) {
  return transactions.reduce(
    (summary, txn) => {
      if (txn.type === 'income') {
        summary.inflow += txn.amount
        summary.deposits += 1
      } else {
        summary.outflow += txn.amount
        summary.outflowCount += 1
      }
      summary.net = summary.inflow - summary.outflow
      return summary
    },
    { inflow: 0, outflow: 0, net: 0, deposits: 0, outflowCount: 0 },
  )
}

export function savingsRateLabel(inflow, net) {
  if (inflow <= 0) return '0% monthly savings rate'
  const rate = Math.round((net / inflow) * 1000) / 10
  const text = Number.isInteger(rate) ? String(rate) : rate.toFixed(1)
  return `${text}% monthly savings rate`
}

export function depositCaption(count) {
  return `Across ${count} ${count === 1 ? 'deposit' : 'deposits'}`
}

export function outflowCaption(count) {
  return `Across ${count} ${count === 1 ? 'transaction' : 'transactions'}`
}
