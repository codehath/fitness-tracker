import { useParams } from 'react-router-dom';
import UserData from '../components/userData';

function AccountPage() {
  const { userId } = useParams();

  return (
    <div>
      <UserData userId={userId} />
    </div>
  );
}

export default AccountPage;
