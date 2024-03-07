import { createContext, type FC, type PropsWithChildren, useContext, useMemo } from "react";
import CharactersAPI from "../services/CharactersAPI";

export interface APIClients {
  charactersService: CharactersAPI;
}

export const APIClientsContext = createContext<APIClients>({
  charactersService: {},
} as APIClients);

export const APIProvider: FC<PropsWithChildren> = ({ children }) => {
  const apiClients = useMemo(() => {
    const charactersService = new CharactersAPI();

    return {
      charactersService,
    } satisfies APIClients;
  }, []);

  return <APIClientsContext.Provider value={apiClients}>{children}</APIClientsContext.Provider>;
};

export const useAPI = () => useContext(APIClientsContext);
