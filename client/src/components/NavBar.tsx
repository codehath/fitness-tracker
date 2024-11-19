import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function NavBar() {
  const { user } = useUser();
  const clerkId = user?.id;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/search" className="text-white hover:text-gray-300">
            Search
          </Link>
          <Link
            to={`/logs/${clerkId}`}
            className="text-white hover:text-gray-300"
          >
            Workout History
          </Link>
          <Link
            to={`/account/${clerkId}`}
            className="text-white hover:text-gray-300"
          >
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
