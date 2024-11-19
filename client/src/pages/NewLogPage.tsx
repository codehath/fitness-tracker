import { useParams } from 'react-router-dom';
import LogFull from '../components/logNew';

function NewLogPage() {
  const { clerkId, logId } = useParams();

  return (
    <div>
      <LogFull clerkId={clerkId} logId={logId} />
    </div>
  );
}

export default NewLogPage;
