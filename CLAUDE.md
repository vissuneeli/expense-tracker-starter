# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Architecture

This is a single-component React app (Vite + React 19). All state and logic live in `src/App.jsx`:

- **State**: `transactions` array (id, description, amount, type, category, date), plus form fields and filter state
- **Summary**: `totalIncome`, `totalExpenses`, `balance` computed from `transactions` via `reduce` — note `amount` is stored as a string, so arithmetic on it is buggy (string concatenation instead of numeric addition)
- **Filtering**: `filteredTransactions` derived inline by chaining `.filter()` on `transactions` based on `filterType` and `filterCategory`
- **Form**: `handleSubmit` appends a new transaction to state; `date` is auto-set to today

Styling is in `src/App.css`. No routing, no external state management, no backend — all data is in-memory.
