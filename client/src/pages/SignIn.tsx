import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/onboarding" />
    </div>
  );
}

export default SignInPage;
