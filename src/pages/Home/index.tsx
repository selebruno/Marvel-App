import { useAPI } from "../../contexts/APIClientsContext";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { useCharacters } from "../../contexts/CharactersContext";
import CharacterCards from "../../components/CharacterCards";

export default function Home() {
  const { charactersService } = useAPI();
  const { filteredCharacters, setFilteredCharacters, setCharactersLoading } = useCharacters();

  const { data: response, isLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: charactersService.getCharacters,
  });

  useEffect(() => {
    setCharactersLoading(isLoading);
  }, [isLoading]);

  const charactersResponse: Character[] | undefined = useMemo(
    () => response?.data?.data?.results,
    [response?.data],
  );
  const characters = useMemo(
    () => filteredCharacters || charactersResponse,
    [filteredCharacters, charactersResponse],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue === "") {
        setFilteredCharacters(null);
      } else {
        const filteredItems =
          charactersResponse?.filter((el) => el.name?.toLowerCase().includes(searchValue)) || [];
        setFilteredCharacters(filteredItems);
      }
    },
    [charactersResponse, setFilteredCharacters],
  );

  return (
    <CharacterCards
      handleSearch={handleSearch}
      characters={characters || []}
      isLoading={isLoading}
    />
  );
}
