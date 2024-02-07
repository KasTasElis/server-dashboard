import { Routes, Route } from "react-router-dom";
import { ServerPage, SignInPage } from "./pages";
import { RequireAuth } from "./components";

const App = () => {
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
