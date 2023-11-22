import { Container, Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import { useState } from 'react';
import { useBudget, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetContext';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(
    UNCATEGORIZED_BUDGET_ID
  );

  const { budgets, calcBudgetAmount } = useBudget();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap={3}>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          className='mt-5'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'start',
          }}
        >
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={calcBudgetAmount(budget.id)}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            />
          ))}
          <UncategorizedBudgetCard
            onAddExpenseClick={() =>
              openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        showModal={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        showModal={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
    </>
  );
};

export default App;
