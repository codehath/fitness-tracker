import { useParams } from "react-router-dom";
import LogList from "../components/logList";

function AllLogs() {
  const { userId } = useParams();
  const testUserId = "67387608e70d4a5c4f187b57";
  const finalUserId = userId || testUserId;

  return (
    <div>
      <LogList userId={finalUserId} />
    </div>
  );
}

export default AllLogs;