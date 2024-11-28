import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Cancelled</h1>
      <p>
        Your payment was not completed. If you have any questions, please
        contact support.
      </p>
      <p>
        You can return to the <Link to="/">home page</Link> or try purchasing
        the workout plan again.
      </p>
    </div>
  );
};

export default CancelPage;
