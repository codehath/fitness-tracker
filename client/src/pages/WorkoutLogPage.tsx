import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import LogFull from '../components/logFull';

function WorkoutLogPage() {
  const { logId } = useParams();
  const { user } = useUser();
  const clerkId = user?.id;

  return (
    <div>
      <LogFull clerkId={clerkId} logId={logId} />
    </div>
  );
}

export default WorkoutLogPage;
