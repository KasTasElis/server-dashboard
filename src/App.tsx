import { Routes, Route } from "react-router-dom";
import { useRestoreSession } from "./hooks";
import { ServerPage, SignInPage } from "./pages";
import { RequireAuth } from "./components";

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
