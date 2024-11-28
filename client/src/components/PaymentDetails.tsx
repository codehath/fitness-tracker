import React from 'react';

interface PaymentInfo {
  amount_total: number;
  currency: string;
  payment_method_types: string[];
  metadata: {
    workoutPlanName: string;
  };
}

const PaymentDetails: React.FC<{ paymentInfo: PaymentInfo }> = ({
  paymentInfo,
}) => {
  return (
    <div>
      <h2>Payment Details:</h2>
      <p>Amount: ${paymentInfo.amount_total / 100}</p>
      <p>Currency: {paymentInfo.currency.toUpperCase()}</p>
      <p>Payment Method: {paymentInfo.payment_method_types.join(', ')}</p>
      <p>Workout Plan: {paymentInfo.metadata.workoutPlanName}</p>
    </div>
  );
};

export default PaymentDetails;
