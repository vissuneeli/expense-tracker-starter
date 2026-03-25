export const isValidTransaction = (transaction) => {
  if (!transaction || typeof transaction !== 'object') {
    return false;
  }

  const {
    id,
    description,
    amount,
    type,
    category,
    date,
  } = transaction;

  return (
    typeof id === 'string' &&
    typeof description === 'string' &&
    typeof amount === 'number' &&
    amount >= 0 &&
    typeof type === 'string' &&
    ['income', 'expense'].includes(type) &&
    typeof category === 'string' &&
    typeof date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(date)
  );
};

export const filterValidTransactions = (transactions) => {
  if (!Array.isArray(transactions)) {
    return [];
  }
  return transactions.filter(isValidTransaction);
};
