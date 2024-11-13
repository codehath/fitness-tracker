import { Routes, Route, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header>
        <SignedOut>
          <button onClick={() => navigate("/sign-in")}>Sign In</button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
