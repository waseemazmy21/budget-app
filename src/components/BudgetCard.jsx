import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import { currencyFormater } from '../util';
import PropTypes from 'prop-types';

const BudgetCard = ({ name, amount, max, gray, onAddExpenseClick }) => {
  const classNames = [];
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (gray) {
    classNames.push('bg-light');
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center gap-2 fw-normal mb-3'>
          <p className='mb-0'>{name}</p>
          <div className='d-flex align-items-center'>
            {currencyFormater.format(amount)}/
            <span className='fs-6 ms-1 text-muted'>
              {currencyFormater.format(max)}
            </span>
          </div>
        </Card.Title>
        <ProgressBar
          className='rounded-pill'
          min={0}
          max={max}
          now={amount}
          variant={getProgressBarVariant(amount, max)}
        />
        <Stack direction='horizontal' gap='2' className='mt-4'>
          <Button
            variant='outline-primary'
            className='ms-auto'
            onClick={onAddExpenseClick}
          >
            Add Expense
          </Button>
          <Button variant='outline-secondary'>View Expenses</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return 'primary';
  if (ratio < 0.75) return 'warning';
  return 'danger';
}

BudgetCard.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  gray: PropTypes.bool,
  onAddExpenseClick: PropTypes.func.isRequired,
};

export default BudgetCard;
