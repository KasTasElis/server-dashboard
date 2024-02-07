import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { RequireAuth };
