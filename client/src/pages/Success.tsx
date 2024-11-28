import { useLocation } from 'react-router-dom';
import SuccessMessage from '../components/SuccessMessage';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import usePaymentConfirmation from '../hooks/usePaymentConfirmation';

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  const { paymentInfo, error } = usePaymentConfirmation(sessionId);

  return (
    <div>
      {error ? (
        <Error message={error} />
      ) : paymentInfo ? (
        <SuccessMessage paymentInfo={paymentInfo} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SuccessPage;
