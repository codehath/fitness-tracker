import React from 'react';
import PaymentDetails from './PaymentDetails';

interface SuccessMessageProps {
  paymentInfo: any;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ paymentInfo }) => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase!</p>
      <PaymentDetails paymentInfo={paymentInfo} />
    </div>
  );
};

export default SuccessMessage;
