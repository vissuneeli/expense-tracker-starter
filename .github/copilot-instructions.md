# Copilot Instructions for Expense Tracker

## Quick Start

```bash
npm install       # Install dependencies (required first time)
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint on all .js and .jsx files
```

## Project Architecture

**Tech Stack:** React 19 + Vite (no routing, no external state management, no backend)

**Component Structure:**
```
App (root state container)
├── Summary (displays totals: income, expenses, balance)
├── TransactionForm (controlled form for adding transactions)
└── TransactionList (table view with type/category filtering)
```

**Data Model:**
- All transaction data lives in `App.jsx` state
- Transaction object: `{ id, description, amount, type, category, date }`
- `type` is either `"income"` or `"expense"`
- `category` is one of: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`
- `date` is formatted as `YYYY-MM-DD`

**State & Data Flow:**
- `App` owns the `transactions` array and passes it down as props
- `Summary` computes totals (income, expenses, balance) from the transactions array
- `TransactionForm` manages only its own form fields internally; calls `onAdd()` callback to update App state
- `TransactionList` manages only its own filter state (filterType, filterCategory); receives read-only transaction data

## Key Conventions

**ID Generation:** Transactions use `Date.now()` as ID. This is quick but not collision-proof if multiple transactions are added in rapid succession.

**Categories are duplicated:** The same category list is defined in both `TransactionForm.jsx` and `TransactionList.jsx`. Changes to categories must be made in both files.

**Styling:** All styles are in `src/App.css`. No CSS frameworks or CSS-in-JS. Use flexbox for layouts.

**Amount handling:** The form input accepts a string but should be converted to a number when stored. Verify this is happening in TransactionForm.

**ESLint config:** Custom rule ignores unused variables that start with capital letters or underscores (useful for React imports like `import { useState }`).

## Known Issues in Starter Code

This is an intentional starter project with deliberate bugs and code quality issues that students fix:

1. **ID collision risk:** Using `Date.now()` can generate duplicate IDs if transactions are added very quickly
2. **No data persistence:** All data is lost on page refresh (consider adding localStorage for improvement)
3. **Amount type coercion:** Form inputs store amounts as strings; should explicitly convert to numbers
4. **Duplicate category lists:** Categories are hardcoded in two separate components
5. **Sample data bug:** Transaction ID 4 ("Freelance Work") is marked as "expense" but likely should be "income"

## Testing & Validation

No test suite is configured. To validate changes:
1. Run `npm run lint` to check for code quality issues
2. Manually test the app with `npm run dev` at http://localhost:5173
3. Test adding transactions, filtering by type and category, and deleting transactions

## Build Output

Production builds output to the `dist/` directory. Use `npm run build` to generate and `npm run preview` to test the production version locally before deployment.
