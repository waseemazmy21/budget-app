import BudgetCard from './BudgetCard';
import { useBudget } from '../contexts/BudgetContext';

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudget();

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (amount === 0) return null;

  return <BudgetCard gray hideButtons name='Total' amount={amount} max={max} />;
};

export default TotalBudgetCard;
