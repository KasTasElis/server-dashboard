import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetToken } from "../context";
import { fetchToken } from "../api";

const TOKEN_NAME = "my-auth-token";

export const useSignIn = () => {
  const setToken = useSetToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async (username: string, password: string) => {
    if (error) {
      setError("");
    }

    setIsLoading(true);

    try {
      const token = await fetchToken(username, password);

      // persist token
      window.localStorage.setItem(TOKEN_NAME, token);

      setToken(token);
    } catch (_err) {
      // ignoring server message for now, assuming it's always "Invalid credentials".
      setError("Please check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
};

export const useSignOut = () => {
  const setToken = useSetToken();

  return () => {
    window.localStorage.removeItem(TOKEN_NAME);
    setToken(null);
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
