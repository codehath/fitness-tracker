import React from 'react';
import WorkoutPlanName from './WorkoutPlanName';

interface PaymentInfo {
  amount_total: number;
  currency: string;
  payment_method_types: string[];
  metadata: {
    workoutPlanName: string;
    planId: string;
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
      <p>Workout Plan:</p>
      <WorkoutPlanName planId={paymentInfo.metadata.planId} />
    </div>
  );
};

export default PaymentDetails;
