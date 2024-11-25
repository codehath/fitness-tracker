import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import EditProfilePage from '../pages/EditProfilePage';
import OnboardingPage from '../pages/OnboardingPage';
import WorkoutHistoryPage from '../pages/WorkoutHistoryPage';
import WorkoutLogPage from '../pages/WorkoutLogPage';
import NewLogPage from '../pages/NewLogPage';
import AccountPage from '../pages/AccountPage';
import DiscoverPage from '../pages/DiscoverPage';

export default function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/logs" element={<WorkoutHistoryPage />} />
          <Route path="/logs/:clerkId/:logId" element={<WorkoutLogPage />} />
          <Route path="/logs/new" element={<NewLogPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<DiscoverPage />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Navigate to="/welcome" replace />
      </SignedOut>
    </>
  );
}
