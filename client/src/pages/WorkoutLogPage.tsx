import { useParams } from 'react-router-dom';
import LogFull from '../components/logFull';

function WorkoutLogPage() {
  const { clerkId, logId } = useParams();

  return (
    <div>
      <LogFull clerkId={clerkId} logId={logId} />
    </div>
  );
}

export default WorkoutLogPage;
