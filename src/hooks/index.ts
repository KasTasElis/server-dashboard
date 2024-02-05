import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetToken } from "../context";
import { fetchToken } from "../api";

const TOKEN_NAME = "my-auth-token";

export const useSignIn = () => {
  const setToken = useSetToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = async (credentials: {username: string, password: string}) => {
    if (error) {
      setError("");
    }

    setIsLoading(true);

    try {
      const token = await fetchToken(credentials.username, credentials.password);
      window.localStorage.setItem(TOKEN_NAME, token);
      setToken(token);
      navigate("/servers");
    } catch (err) {
      setError(((err as Error).message));
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
};

export const useSignOut = () => {
  const setToken = useSetToken();
  const navigate = useNavigate();

  return () => {
    window.localStorage.removeItem(TOKEN_NAME);
    setToken("");
    navigate("/");
  };
};

export const useRestoreSession = () => {
  const setToken = useSetToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_NAME);
    if (token) {
      setToken(token);
      navigate("/servers");
    }
  }, [setToken, navigate]);
};
