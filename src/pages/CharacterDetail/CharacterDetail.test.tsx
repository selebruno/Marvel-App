// CharacterDetail.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersContext, { CharactersContextProvider } from "../../contexts/CharactersContext"; // Assuming you have a CharactersContext
import CharacterDetail from "./CharacterDetail";
import { CharactersService } from "../../contexts/APIClientsContext"; // Adjust the import path based on your project structure

// Mock the API and characters context
jest.mock("../../contexts/APIClientsContext", () => ({
  useAPI: (): { charactersService: CharactersService } => ({
    charactersService: {
      getCharacter: jest.fn(() =>
        Promise.resolve({ data: { data: { results: [{ id: 1, name: "Test Character" }] } } }),
      ),
    },
  }),
}));

const mockCharactersContext = {
  setCharactersLoading: jest.fn(),
  favoriteCharacters: [],
  setFavoriteCharacters: jest.fn(),
};

const queryClient = new QueryClient();

// Mock useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("CharacterDetail Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  test("renders character details", async () => {
    render(
      <MemoryRouter initialEntries={["/characters/1"]}>
        <QueryClientProvider client={queryClient}>
          <CharactersContextProvider value={mockCharactersContext}>
            <Route path="/characters/:id">
              <CharacterDetail />
            </Route>
          </CharactersContextProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText("Test Character")).toBeInTheDocument();
      expect(screen.getByText("COMICS")).toBeInTheDocument();
    });
  });

  test("clicking on the heart icon adds character to favorites", async () => {
    render(
      <MemoryRouter initialEntries={["/characters/1"]}>
        <QueryClientProvider client={queryClient}>
          <CharactersContextProvider value={mockCharactersContext}>
            <Route path="/characters/:id">
              <CharacterDetail />
            </Route>
          </CharactersContextProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText("Test Character")).toBeInTheDocument();
    });

    // Click on the heart icon
    userEvent.click(screen.getByRole("button", { name: "Add to favorites" }));

    // Assert that the setFavoriteCharacters function is called with the correct character
    expect(mockCharactersContext.setFavoriteCharacters).toHaveBeenCalledWith({
      id: 1,
      name: "Test Character",
    });
  });
});
