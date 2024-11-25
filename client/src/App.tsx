import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/protectedRoutes';
import PublicRoute from './components/publicRoutes';
import NavBar from './components/navBar';

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
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
