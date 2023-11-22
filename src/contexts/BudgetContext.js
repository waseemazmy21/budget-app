import { createContext, useContext } from 'react';

// context
export const BudgetContext = createContext();

// hook
export const useBudget = () => useContext(BudgetContext);

// Uncategorized id
export const UNCATEGORIZED_BUDGET_ID = 'uncategorized';
