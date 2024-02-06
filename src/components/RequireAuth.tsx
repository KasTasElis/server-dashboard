import { Navigate } from "react-router-dom";
import { useToken } from "../context";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { RequireAuth };
