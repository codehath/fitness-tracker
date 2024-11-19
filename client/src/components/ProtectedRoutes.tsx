import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import EditAccountPage from '../pages/EditAccountPage';
import OnboardingPage from '../pages/OnboardingPage';
import WorkoutHistoryPage from '../pages/WorkoutHistoryPage';
import WorkoutLogPage from '../pages/WorkoutLogPage';
import NewLogPage from '../pages/NewLogPage';
import AccountPage from '../pages/AccountPage';

export default function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<EditAccountPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/logs/:userId" element={<WorkoutHistoryPage />} />
          <Route path="/logs/:userId/:logId" element={<WorkoutLogPage />} />
          <Route path="/logs/new" element={<NewLogPage />} />
          <Route path="/account/:userId" element={<AccountPage />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Navigate to="/welcome" replace />
      </SignedOut>
    </>
  );
}
