import { useParams } from "react-router-dom";
import AllLogs from "../components/allLogs";

function AllLogs() {
  const { userId } = useParams();
  const testUserId = "67387608e70d4a5c4f187b57";
  const finalUserId = userId || testUserId;

  return (
    <div>
      <AllLogs userId={finalUserId} />
    </div>
  );
}

export default AllLogs;