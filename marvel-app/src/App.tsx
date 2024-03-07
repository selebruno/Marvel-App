import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { APIProvider } from "./contexts/APIClientsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterProvider } from "./contexts/CharactersContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
`
const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CharacterProvider>
          <APIProvider>
            <GlobalStyle />
            <Router />
          </APIProvider>
        </CharacterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
