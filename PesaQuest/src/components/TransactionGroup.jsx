import TransactionRow from './TransactionRow'
import '../componentscss/TransactionGroup.css'

function TransactionGroup({ group, visible }) {
  const count = group.items.length
  const titleId = `txn-group-${group.date}`

  return (
    <section className="txn-group" aria-labelledby={titleId}>
      <div className="txn-group-head">
        <h3 id={titleId} className="txn-group-title">
          {group.title}
        </h3>
        <p className="txn-group-count">
          {count} {count === 1 ? 'entry' : 'entries'}
        </p>
      </div>
      <div className="txn-group-card">
        {group.items.map((txn) => (
          <TransactionRow key={txn.id} txn={txn} visible={visible} />
        ))}
      </div>
    </section>
  )
}

export default TransactionGroup
