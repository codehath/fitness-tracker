import { Routes, Route } from 'react-router-dom';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import PublicRoute from './components/PublicRoutes';
import NavBar from './components/NavBar';
import AllLogs from './pages/AllLogs';
import FullLog from './pages/FullLog';
import NewLogPage from './pages/NewLogPage';
import Account from './pages/Account';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={<PublicRoute page="welcome" />} />
        <Route path="/sign-in/*" element={<PublicRoute page="sign-in" />} />
        <Route path="/sign-up/*" element={<PublicRoute page="sign-up" />} />

        {/* Protected Routes */}
        <Route path="/*" element={<AuthenticatedRoutes />} />

        {/* Feature Routes */}
        <Route path="/logs/:userId" element={<AllLogs />} />
        <Route path="/logs/:userId/:logId" element={<FullLog />} />
        <Route path="/logs/new" element={<NewLogPage />} />
        <Route path="/account/:userId" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
