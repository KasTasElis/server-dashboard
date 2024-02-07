import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "../api";

const TOKEN_NAME = "my-auth-token";

type AuthContext = {
  signIn: (credentials: { username: string; password: string }) => void;
  restoreSession: () => void;
  signOut: () => void;
  isLoading: boolean;
  error: string;
  token: string;
};

const initialContext: AuthContext = {
  signIn: () => undefined,
  restoreSession: () => undefined,
  signOut: () => undefined,
  isLoading: false,
  error: "",
  token: "",
};

const AuthContext = createContext(initialContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signOut = useCallback(() => {
    window.localStorage.removeItem(TOKEN_NAME);
    setToken("");
    navigate("/");
  }, [navigate]);

  const restoreSession = useCallback(() => {
    const token = window.localStorage.getItem(TOKEN_NAME);
    if (token) {
      setToken(token);
      navigate("/servers");
    }
  }, [navigate]);

  useEffect(() => {
    // attempt to restore session on mount
    restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(
    async (credentials: { username: string; password: string }) => {
      if (error) {
        setError("");
      }

      setIsLoading(true);

      try {
        const token = await fetchToken(
          credentials.username,
          credentials.password
        );
        window.localStorage.setItem(TOKEN_NAME, token); // persist
        setToken(token);
        navigate("/servers");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [error, navigate]
  );

  return (
    <AuthContext.Provider
      value={{ signIn, restoreSession, signOut, isLoading, error, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContextProvider, useAuth };
