import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { TRANSACTION_CATEGORIES } from './constants'
import { filterValidTransactions } from './utils'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = useMemo(() => {
    let filtered = filterValidTransactions(transactions);
    if (filterType !== "all") {
      filtered = filtered.filter(t => t.type === filterType);
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter(t => t.category === filterCategory);
    }
    return filtered;
  }, [transactions, filterType, filterCategory]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {TRANSACTION_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No transactions found. {filterType !== "all" || filterCategory !== "all" ? "Try adjusting your filters." : "Add one to get started!"}
              </td>
            </tr>
          ) : (
            filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(Math.abs(t.amount))}
                </td>
                <td>
                  <button
                    className="delete-icon"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this transaction?")) {
                        onDelete(t.id);
                      }
                    }}
                    title="Delete transaction"
                    aria-label={`Delete transaction: ${t.description}`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 6h18v2H3V6zm2 3h14l-1 11H6L5 9zm3-6h8l1 2H7l1-2z"/></svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['income', 'expense']).isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
