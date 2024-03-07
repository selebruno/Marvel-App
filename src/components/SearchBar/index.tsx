import styled from "styled-components";
import SearchIcon from "../../assets/icons/search.svg";
import { ChangeEvent } from "react";

const SearchBarContainer = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    margin-left: 0.5rem;
    text-transform: uppercase;
    border: none; /* Remove input border */
    outline: none; /* Remove input outline */
    width: 100%; /* Make the input take the full width */
  }
`;

const CharacterCount = styled.div`
  padding: 1rem;
  text-transform: uppercase;
  font-size: 12px;
`;

export default function SearchBar({
  characters,
  handleSearch,
}: {
  characters: Character[];
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <SearchBarContainer>
        <SearchIcon />
        <input onChange={handleSearch} type="text" placeholder="Search a character..." />
      </SearchBarContainer>
      {characters.length > 0 && (
        <CharacterCount>{`${characters.length} ${
          characters.length === 1 ? "result" : "results"
        }`}</CharacterCount>
      )}
    </>
  );
}
