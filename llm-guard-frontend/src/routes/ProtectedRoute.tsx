import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait until Clerk finishes loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Redirect if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;