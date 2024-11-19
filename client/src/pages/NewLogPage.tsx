import { useParams } from "react-router-dom";
import LogFull from "../components/logNew";

function FullLog() {
  const { userId, logId } = useParams();
  const testUserId = "67387608e70d4a5c4f187b57";
  const testLogID = "67387609e70d4a5c4f187b6c"
  const finalUserId = userId || testUserId;
  const finalLogId = logId || testLogID;

  return (
    <div>
      <LogFull userId={finalUserId} logId={finalLogId} />
    </div>
  );
}

export default FullLog;