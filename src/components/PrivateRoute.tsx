import type { ReactNode } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session } = UserAuth();

  return <>{session ? <>{children}</> : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;
