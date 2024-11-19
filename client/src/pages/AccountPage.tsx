import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserData from '../components/userData';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const { userId } = useParams();

  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div>
      <UserData userId={user?.id} />
      <Link to="/profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default AccountPage;
