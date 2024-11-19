import { useUser } from '@clerk/clerk-react';
import UserDataEdit from '../components/userDataEdit';

function EditAccountPage() {
  const { user } = useUser();

  return (
    <div>
      <UserDataEdit userId={user?.id} />
    </div>
  );
}

export default EditAccountPage;
