import styled from "styled-components";
import SearchBar from "../SearchBar";
import CharacterCard from "../CharacterCard";
import { ChangeEvent } from "react";

interface CharacterCardsProps {
  characters: Character[];
  isLoading?: boolean;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PageContainer = styled.div`
  padding: 2rem;
  padding-top: 3rem;
`;

const CardsContainer = styled.div`
  display: grid;
  padding-top: 2rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(7, 2fr);
  justify-items: center;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(5, 2fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 2fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 2fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 2fr;
  }
`;

export default function CharacterCards({
  characters,
  isLoading = false,
  handleSearch,
}: CharacterCardsProps) {
  return (
    <PageContainer>
      <SearchBar handleSearch={handleSearch} characters={characters || []} />
      <CardsContainer>
        {!isLoading &&
          characters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </CardsContainer>
    </PageContainer>
  );
}
