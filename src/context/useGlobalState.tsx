import { createContext, useContext, useState } from "react";

type Token = string | null;

const TokenContext = createContext<Token>(null);
const SetTokenContext = createContext<React.Dispatch<React.SetStateAction<Token>>>(() => undefined);

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<null | string>(null);

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
