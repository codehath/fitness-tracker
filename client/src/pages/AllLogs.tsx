import { useUser } from '@clerk/clerk-react';
import LogList from '../components/logList';
import Error from '../components/common/Error';
function AllLogs() {
  const { user } = useUser();
  const clerkId = user?.id;

  if (!clerkId) return <Error message="User not found" />;

  return (
    <div>
      <LogList clerkId={clerkId} />
    </div>
  );
}

export default AllLogs;
