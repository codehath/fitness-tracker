import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import WelcomePage from '../pages/Welcome';
import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';

interface PublicRouteProps {
  page: 'welcome' | 'sign-in' | 'sign-up';
}

export default function PublicRoute({ page }: PublicRouteProps) {
  const components = {
    welcome: WelcomePage,
    'sign-in': SignInPage,
    'sign-up': SignUpPage,
  };

  const Component = components[page];

  return (
    <>
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
      <SignedOut>
        <Component />
      </SignedOut>
    </>
  );
}
