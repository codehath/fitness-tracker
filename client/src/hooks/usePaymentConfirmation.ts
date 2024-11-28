import { useEffect, useState } from 'react';
import { paymentService } from '../services/paymentService';

const usePaymentConfirmation = (sessionId: string | null) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) return;

      try {
        const session = await paymentService.getCheckoutSession(sessionId);
        setPaymentInfo(session);
      } catch (error) {
        console.error('Error confirming payment:', error);
        setError('Failed to confirm payment.');
      }
    };

    confirmPayment();
  }, [sessionId]);

  return { paymentInfo, error };
};

export default usePaymentConfirmation;
