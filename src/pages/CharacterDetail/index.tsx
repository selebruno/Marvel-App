import { useCharacters } from "../../contexts/CharactersContext";
import { useAPI } from "../../contexts/APIClientsContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import LikeIcon from "../../assets/images/heart.svg";
import LikedIcon from "../../assets/images/filled-heart.svg";
import styled from "styled-components";
import ComicItem from "./components/ComicItem";

const DetailContainer = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 2px solid rgba(51, 51, 51, 0.5);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CharacterImage = styled.img`
  height: 25rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 3rem;
  @media (max-width: 768px) {
    width: 80%;
    padding: 2rem;
  }
`;

const CornerTriangle = styled.div`
  bottom: 0;
  right: 0;
  background-color: #fff;
  width: 1.6rem;
  height: 5rem;
  margin-bottom: -2rem;
  margin-right: -0.75rem;
  position: absolute;
  z-index: 1;
  transform: rotate(46deg);
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Name = styled.h1`
  color: #fff;
  text-transform: uppercase;
`;
const Description = styled.p`
  color: #fff;
  text-transform: uppercase;
`;

const BigHeartIcon = styled(LikeIcon)`
  width: 30px;
  height: 30px;
`;

const BigLikedIcon = styled(LikedIcon)`
  width: 30px;
  height: 30px;
`;

const ClickableDiv = styled.div`
  cursor: pointer;
`;

const ComicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Comics = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  max-width: 90%;
  padding: 2rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--primary-color);
`;

export default function CharacterDetail() {
  const { id } = useParams();
  const { charactersService } = useAPI();
  const { setCharactersLoading, favoriteCharacters, setFavoriteCharacters } = useCharacters();

  const { data: response, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => charactersService.getCharacter(parseInt(id || "")),
  });

  const character: Character | undefined = useMemo(
    () => response?.data?.data?.results?.[0],
    [response?.data],
  );

  useEffect(() => {
    setCharactersLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <DetailContainer>
        <CornerTriangle />
        {!isLoading && character && (
          <>
            <CharacterImage
              src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
            />
            <InfoContainer>
              <NameContainer>
                <Name>{character.name}</Name>
                <ClickableDiv onClick={() => setFavoriteCharacters(character)}>
                  {favoriteCharacters.find((el) => el.id === character.id) ? (
                    <BigLikedIcon />
                  ) : (
                    <BigHeartIcon />
                  )}
                </ClickableDiv>
              </NameContainer>
              <Description>{character.description}</Description>
            </InfoContainer>
          </>
        )}
      </DetailContainer>
      <ComicsContainer>
        {character?.comics?.items && character.comics.items.length > 0 && <h1>COMICS</h1>}
        <Comics>
          {character?.comics?.items?.map((comic) => {
            return comic.resourceURI && <ComicItem key={comic.name} comicId={comic.resourceURI} />;
          })}
        </Comics>
      </ComicsContainer>
    </>
  );
}
