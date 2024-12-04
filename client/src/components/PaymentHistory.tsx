import React from 'react';
import WorkoutPlanName from './WorkoutPlanName';

interface Payment {
  date: string;
  amount: number;
  itemType: string;
  itemId: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <div>
      <h3>Payment History</h3>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <li key={index}>
              {new Date(payment.date).toLocaleDateString()} -{' '}
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(payment.amount / 100)}{' '}
              - {payment.itemType}: <WorkoutPlanName planId={payment.itemId} />
            </li>
          ))
        ) : (
          <li>No payment history found</li>
        )}
      </ul>
    </div>
  );
};

export default PaymentHistory;
