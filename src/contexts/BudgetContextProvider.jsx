import { BudgetContext } from './BudgetContext';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
// budget
// {
//   id,
//   name,
//   max
// }

// expense
// {
//   id,
//   budgetId,
//   descreption,
//   amount
// }

const BudgetContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (budgets.find((budget) => budget.name === name)) {
        alert(`Budget ${name} is already exists`);
        return prevBudgets;
      } else {
        return [
          ...prevBudgets,
          {
            id: uuidv4(),
            name,
            max,
          },
        ];
      }
    });
  }

  function addExpense({ budgetId, description, amount }) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: uuidv4(),
        budgetId,
        amount,
        description,
      },
    ]);
  }

  function deleteBudget(id) {
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== id)
    );
  }

  function deleteExpense(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }

  function getBudgetExpenses(id) {
    return expenses.filter((expense) => expense.budgetId === id);
  }

  function calcBudgetAmount(id) {
    const expenses = getBudgetExpenses(id);
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
        getBudgetExpenses,
        calcBudgetAmount,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

BudgetContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BudgetContextProvider;
