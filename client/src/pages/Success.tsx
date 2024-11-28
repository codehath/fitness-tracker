import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/axios.config';
import PaymentDetails from '../components/PaymentDetails';
import WorkoutPlanName from '../components/WorkoutPlanName';

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // Fetch the session details from your server
        const response = await api.get(`/checkout-session/${sessionId}`);
        const session = response.data;

        console.log('Session data:', session); // Log the session data for debugging

        // Update payment info state
        setPaymentInfo(session);
      } catch (error) {
        console.error('Error confirming payment:', error);
        setError('Failed to confirm payment.');
      }
    };

    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId]);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {paymentInfo ? (
        <div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase!</p>
          <p>
            Workout Plan:{' '}
            <WorkoutPlanName planId={paymentInfo.metadata.planId} />
          </p>
          <PaymentDetails paymentInfo={paymentInfo} />
        </div>
      ) : (
        <h1>Processing your payment...</h1>
      )}
    </div>
  );
};

export default SuccessPage;
