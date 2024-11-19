import { useUser } from '@clerk/clerk-react';
import UserDataEdit from '../components/profileForm';

function EditAccountPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  return (
    <div>
      <UserDataEdit clerkId={clerkId} />
    </div>
  );
}

export default EditAccountPage;
