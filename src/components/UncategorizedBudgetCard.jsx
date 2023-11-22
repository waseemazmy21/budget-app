import BudgetCard from './BudgetCard';
import { useBudget, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

const UncategorizedBudgetCard = (props) => {
  const { calcBudgetAmount } = useBudget();
  const amount = calcBudgetAmount(UNCATEGORIZED_BUDGET_ID);

  if (amount === 0) return null;

  return <BudgetCard {...props} gray name='Uncategorized' amount={amount} />;
};

export default UncategorizedBudgetCard;
