import { Link } from 'react-router-dom';
import UserData from '../components/profile';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div>
      <UserData clerkId={clerkId} />
      <Link to="/profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default AccountPage;
