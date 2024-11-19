import { useParams } from 'react-router-dom';
import UserData from '../components/userData';

function Account() {
  const { userId } = useParams();
  const testUserId = '67387608e70d4a5c4f187b57';
  const finalUserId = userId || testUserId;

  return (
    <div>
      <UserData userId={finalUserId} />
    </div>
  );
}

export default Account;
