import { ChangeEvent, useCallback, useState } from "react";
import CharacterCards from "../../components/CharacterCards";
import { useCharacters } from "../../contexts/CharactersContext";
import styled from "styled-components";

const Title = styled.h1`
  padding-left: 2rem;
  padding-top: 1rem;
  text-transform: uppercase;
`;

export default function Favorites() {
  const { favoriteCharacters } = useCharacters();
  const [filteredFavorites, setFilteredFavorites] = useState<Character[] | null>(null);

  const handleFavoriteSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const filteredItems =
        favoriteCharacters?.filter((el) =>
          el.name?.toLowerCase().includes(e.target.value.toLowerCase()),
        ) || [];
      setFilteredFavorites(filteredItems);
    },
    [favoriteCharacters],
  );
  return (
    <>
      <Title>Favorites</Title>
      <CharacterCards
        handleSearch={handleFavoriteSearch}
        characters={filteredFavorites || favoriteCharacters}
      />
    </>
  );
}
