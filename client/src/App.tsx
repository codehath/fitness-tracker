import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import WelcomePage from "./pages/Welcome";
import OnboardingPage from "./pages/Onboarding";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes - redirect to home if signed in */}
        <Route
          path="/welcome"
          element={
            <>
              <SignedIn>
                <Navigate to="/" replace />
              </SignedIn>
              <SignedOut>
                <WelcomePage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-in/*"
          element={
            <>
              <SignedIn>
                <Navigate to="/" replace />
              </SignedIn>
              <SignedOut>
                <SignInPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <>
              <SignedIn>
                <Navigate to="/" replace />
              </SignedIn>
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            </>
          }
        />

        {/* Protected routes - redirect to welcome if signed out */}
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                </Routes>
              </SignedIn>
              <SignedOut>
                <Navigate to="/welcome" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
