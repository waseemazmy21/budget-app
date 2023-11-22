import { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useBudget, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

const AddExpenseModal = ({ showModal, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value.toLowerCase(),
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    console.log(budgetIdRef.current.value);
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='description' className='mb-3'>
            <Form.Label>Expense description</Form.Label>
            <Form.Control
              type='text'
              name='description'
              ref={descriptionRef}
              required
            />
          </Form.Group>

          <Form.Group controlId='amount' className='mb-3'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type='number'
              name='max'
              ref={amountRef}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>

          <Form.Group controlId='budgetId' className='mb-3'>
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddExpenseModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  defaultBudgetId: PropTypes.string.isRequired,
};

export default AddExpenseModal;
