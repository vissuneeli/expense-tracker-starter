import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Summary from './Summary'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import ConfirmDialog from './ConfirmDialog'

function App() {
  const [transactions, setTransactions] = useState([
    { id: "550e8400-e29b-41d4-a716-446655440001", description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: "550e8400-e29b-41d4-a716-446655440002", description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: "550e8400-e29b-41d4-a716-446655440003", description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: "550e8400-e29b-41d4-a716-446655440004", description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: "550e8400-e29b-41d4-a716-446655440005", description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: "550e8400-e29b-41d4-a716-446655440006", description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: "550e8400-e29b-41d4-a716-446655440007", description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: "550e8400-e29b-41d4-a716-446655440008", description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, transactionId: null, description: null });

  const handleAdd = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteClick = (id, description) => {
    setConfirmDialog({ isOpen: true, transactionId: id, description });
  };

  const handleConfirmDelete = () => {
    const id = confirmDialog.transactionId;
    setTransactions(transactions.filter(t => t.id !== id));
    setConfirmDialog({ isOpen: false, transactionId: null, description: null });
  };

  const handleCancelDelete = () => {
    setConfirmDialog({ isOpen: false, transactionId: null, description: null });
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />
      <TransactionForm onAdd={handleAdd} />
      <TransactionList transactions={transactions} onDelete={handleDeleteClick} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${confirmDialog.description}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App

App.propTypes = {
  // App component has no props
};
