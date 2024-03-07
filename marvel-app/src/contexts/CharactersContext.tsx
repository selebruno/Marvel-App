import React, { FC, PropsWithChildren, useCallback, useState } from "react";

export interface CharacterContextProps {
  currentCharacter: Character;
  filteredCharacters: Character[] | null;
  favoriteCharacters: Character[];
  charactersLoading: boolean;
  setCharactersLoading: (loading: boolean) => void;
  setCurrentCharacter: (character: Character) => void;
  setFilteredCharacters: (characters: Character[] | null) => void;
  setFavoriteCharacters: (character: Character) => void;
}

export const CHARACTER_CONTEXT_DEFAULT: CharacterContextProps = {
  currentCharacter: {},
  filteredCharacters: null,
  favoriteCharacters: [],
  charactersLoading: false,
  setCharactersLoading: () => null,
  setCurrentCharacter: () => null,
  setFilteredCharacters: () => null,
  setFavoriteCharacters: () => null,
};

const CharacterContext = React.createContext<CharacterContextProps>(CHARACTER_CONTEXT_DEFAULT);

const CharacterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentCharacter, setCurrentCharacter] = useState<Character>({});
  const [filteredCharacters, setFilteredCharacters] = useState<Character[] | null>(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(false);

  const handleCurrentCharacter = useCallback((character: Character) => {
    setCurrentCharacter(character);
  }, []);

  const handleFilteredCharacters = useCallback((characters: Character[] | null) => {
    setFilteredCharacters(characters);
  }, []);

  const handleFavoriteCharacters = useCallback((character: Character) => {
    setFavoriteCharacters((prevFavoriteCharacters) => {
      if (prevFavoriteCharacters.find((el) => el.id === character.id)) {
        return prevFavoriteCharacters.filter((el) => el.id !== character.id);
      } else {
        return [...prevFavoriteCharacters, character];
      }
    });
  }, []);

  const handleCharactersLoading = useCallback((loading: boolean) => {
    setCharactersLoading(loading);
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        currentCharacter,
        filteredCharacters,
        favoriteCharacters,
        charactersLoading,
        setCharactersLoading: handleCharactersLoading,
        setFilteredCharacters: handleFilteredCharacters,
        setCurrentCharacter: handleCurrentCharacter,
        setFavoriteCharacters: handleFavoriteCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

const useCharacters = () => {
  const context = React.useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacters must be used within a CharacterProvider");
  }
  return context;
};

export { CharacterContext, CharacterProvider, useCharacters };
