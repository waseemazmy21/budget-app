import { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useBudget } from '../contexts/BudgetContext';

const AddBudgetModal = ({ showModal, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value.toLowerCase(),
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Budget Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter budget name'
              name='name'
              ref={nameRef}
              required
            />
          </Form.Group>

          <Form.Group controlId='max' className='mb-3'>
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter maximum spending'
              name='max'
              ref={maxRef}
              required
              min={0}
              step={0.01}
            />
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

AddBudgetModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

export default AddBudgetModal;
