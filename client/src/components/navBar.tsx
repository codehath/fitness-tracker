import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/search" className="text-white hover:text-gray-300">
            Discover
          </Link>
          <Link to={`/logs`} className="text-white hover:text-gray-300">
            Workout History
          </Link>
          <Link to={`/account`} className="text-white hover:text-gray-300">
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
