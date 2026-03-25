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

React 19 + Vite app. No routing, no external state management, no backend — all data is in-memory.

**Component tree:**
- `App` — holds the `transactions` array in state; passes it down and handles `onAdd`
  - `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, `balance` internally
  - `TransactionForm` — owns its own form state (description, amount, type, category); calls `onAdd(transaction)` on submit
  - `TransactionList` — receives `transactions`, owns filter state (filterType, filterCategory) internally

**Transaction shape:** `{ id, description, amount (number), type ("income"|"expense"), category, date (YYYY-MM-DD) }`

Categories are defined locally in both `TransactionForm` and `TransactionList`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`

Styling is in `src/App.css`.
