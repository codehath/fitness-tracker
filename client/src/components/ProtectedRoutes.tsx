import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProfilePage from '../pages/Profile';
import OnboardingPage from '../pages/Onboarding';
import AllLogs from '../pages/AllLogs';
import FullLog from '../pages/FullLog';
import NewLogPage from '../pages/NewLogPage';
import Account from '../pages/Account';

export default function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/logs/:userId" element={<AllLogs />} />
          <Route path="/logs/:userId/:logId" element={<FullLog />} />
          <Route path="/logs/new" element={<NewLogPage />} />
          <Route path="/account/:userId" element={<Account />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Navigate to="/welcome" replace />
      </SignedOut>
    </>
  );
}
