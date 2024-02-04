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

  console.log("Error: ", error);

  const signIn = async (username: string, password: string) => {
    // if (error) {
    //   setError("");
    // }

    setIsLoading(true);

    try {
      const token = await fetchToken(username, password);
      window.localStorage.setItem(TOKEN_NAME, token);
      setToken(token);
      navigate("/servers");
    } catch (err) {
      console.log("Caught error: ", err);
      setError("hello error!");
      setError("hello error 2!");
      setError(() => "hello error 3!")
      console.log("Setting error!");
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
