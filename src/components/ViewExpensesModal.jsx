import { Modal, Button, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useBudget, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';
import { currencyFormater } from '../util';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudget();

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId !== undefined} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal' gap={2}>
            <div>{budget?.name} - Expenses</div>
            {budget?.id !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant='outline-danger'
                onClick={() => {
                  deleteBudget(budget?.id);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={3}>
          {expenses.map((expense) => (
            <Stack key={expense.id} direction='horizontal' gap={2}>
              <div className='fs-4 me-auto'>{expense.description}</div>
              <div className='fs-5'>
                {currencyFormater.format(expense.amount)}
              </div>
              <Button
                variant='outline-danger'
                onClick={() => deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

ViewExpensesModal.propTypes = {
  budgetId: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default ViewExpensesModal;
