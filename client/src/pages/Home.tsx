import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Home() {
  const [message, setMessage] = useState('');
  const { user } = useUser();

  const clerkId = user.id;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/message`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching the message:', error));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, your Clerk ID is: {clerkId}</p>
      <p>Connected to Backend:</p>
      <p>{message}</p>
      <Link to="/profile">
        <button>Go to Profile</button>
      </Link>
    </div>
  );
}

export default Home;
