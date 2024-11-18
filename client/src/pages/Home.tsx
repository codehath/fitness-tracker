import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching the message:", error));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      <Link to="/profile">
        <button>Go to Profile</button>
      </Link>
    </div>
  );
}

export default Home;
