import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUp fallbackRedirectUrl="/onboarding" signInFallbackRedirectUrl="/" />
    </div>
  );
}

export default SignUpPage;
