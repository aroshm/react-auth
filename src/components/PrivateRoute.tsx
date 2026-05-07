import type { ReactNode } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = UserAuth();

  if (loading) return <p>Loading...</p>;
  if (!session) return <Navigate to="/signin" />;
  return <>{children}</>;
};

export default PrivateRoute;
