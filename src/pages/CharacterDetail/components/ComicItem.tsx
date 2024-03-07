import { useMemo } from "react";
import { useAPI } from "../../../contexts/APIClientsContext";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const ComicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 13rem;
`;

const ComicImage = styled.img`
  height: 20rem;
  width: 13rem;
`;
const Title = styled.div`
  min-height: 3rem;
  padding-top: 1rem;
`;

export function ComicItem({ comicId }: { comicId: string }) {
  const { charactersService } = useAPI();

  const { data: response } = useQuery({
    queryKey: ["comic", comicId],
    queryFn: () => charactersService.getComic(comicId),
  });

  const comic: Comic | undefined = useMemo(
    () => response?.data?.data?.results?.[0],
    [response?.data],
  );

  if (!comic) return;

  return (
    <ComicContainer>
      <ComicImage src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`} />
      <Title>{comic.title}</Title>
    </ComicContainer>
  );
}

export default ComicItem;
