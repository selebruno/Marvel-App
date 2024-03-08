import styled from "styled-components";
import LikeIcon from "../../assets/images/heart.svg";
import LikedIcon from "../../assets/images/filled-heart.svg";
import { useCharacters } from "../../contexts/CharactersContext";
import { useNavigate } from "react-router-dom";
import { PATH_CHARACTER_DETAIL } from "../../constants/routes";
//@ts-expect-error library seems to be working on an update for this
import { subst } from "urlcat";

interface CharacterCardProps {
  character: Character;
}

const CharacterContainer = styled.div`
  background-color: #000;
  width: 189px;
  max-height: 15rem;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover .CardFooter:before {
    transform: translateY(0);
    height: 100%;
  }
  @media (max-width: 450px) {
    width: 230px;
    min-height: 18rem;
  }
`;

const CornerTriangle = styled.div`
  bottom: 0;
  right: 0;
  background-color: #fff;
  width: 1.5rem;
  height: 1.6rem;
  margin-bottom: -1rem;
  margin-right: -0.75rem;
  position: absolute;
  z-index: 1;
  transform: rotate(46deg);
`;

const CardFooter = styled.div`
    position: relative;
    border-top: 5px solid var(--primary-color);
    display: flex;
    padding:0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height:100%;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      background-color: var(--primary-color); 
      transform: translateY(-100%);
      transition: transform 0.5s ease, height 0.3s ease;
  `;

const Name = styled.p`
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  z-index: 1;
`;

const SmallHeartIcon = styled(LikeIcon)`
  width: 14px;
  height: 14px;
  z-index: 1;
`;

const SmallLikedIcon = styled(LikedIcon)`
  width: 14px;
  height: 14px;
  z-index: 1;
`;

const Image = styled.img`
  max-height: 12rem;
  min-height: 11rem;
  @media (max-width: 450px) {
    max-height: 14rem;
    min-height: 13rem;
  }
`;

export default function CharacterCard({ character }: CharacterCardProps) {
  const { favoriteCharacters, setFavoriteCharacters } = useCharacters();
  const navigate = useNavigate();

  const handleNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
    let targetElement = event.target as HTMLElement;

    while (targetElement) {
      if (targetElement.classList.contains("CardFooter")) {
        return;
      }
      targetElement = targetElement.parentElement!;
    }

    navigate(subst(PATH_CHARACTER_DETAIL, { id: character.id }));
  };

  return (
    <CharacterContainer onClick={handleNavigation}>
      <CornerTriangle />
      <Image src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} />
      <CardFooter onClick={() => setFavoriteCharacters(character)} className="CardFooter">
        <Name>{character.name}</Name>
        {favoriteCharacters.find((el) => el.id === character.id) ? (
          <SmallLikedIcon />
        ) : (
          <SmallHeartIcon />
        )}
      </CardFooter>
    </CharacterContainer>
  );
}
