import { Routes, Route, Navigate } from "react-router-dom";
import { useToken } from "./context";
import { useRestoreSession } from "./hooks";
import { ServerPage, SignInPage } from "./pages";

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const App = () => {
  useRestoreSession();

  return (
    <Routes>
      <Route index element={<SignInPage />} />
      <Route
        path="/servers"
        element={
          <RequireAuth>
            <ServerPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<SignInPage />} />
    </Routes>
  );
};

export default App;
