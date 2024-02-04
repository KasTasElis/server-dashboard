import { createContext, useContext, useState } from "react";

const TokenContext = createContext("");
const SetTokenContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => undefined);

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");

  return (
    <SetTokenContext.Provider value={setToken}>
      <TokenContext.Provider value={token}>
        {children}
      </TokenContext.Provider>
    </SetTokenContext.Provider>
  );
};

const useToken = () => useContext(TokenContext);
const useSetToken = () => useContext(SetTokenContext);

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalStateProvider, useToken, useSetToken };
