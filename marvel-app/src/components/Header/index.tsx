import styled, { css, keyframes } from "styled-components";
import MarvelLogo from "../../assets/images/marvel.svg";
import LikeIcon from "../../assets/images/filled-heart.svg";
import { useCharacters } from "../../contexts/CharactersContext";
import { useNavigate } from "react-router-dom";
import { PATH_FAVORITES, PATH_HOME } from "../../constants/routes";

const HeaderContainer = styled.header`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  color: white;
  position: relative; /* Add this line to enable positioning of the loader */
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const FavContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 10px;
`;

const progressAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const Loader = styled.div<{ loading: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: var(--primary-color);
  width: ${({ loading }) => (loading ? "100%" : "0")};
  ${({ loading }) =>
    loading &&
    css`
      animation: ${css`
        ${progressAnimation} 3s ease
      `};
    `}
`;

export default function Header() {
  const { favoriteCharacters, charactersLoading } = useCharacters();
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => navigate(PATH_HOME)}>
        <MarvelLogo />
      </LogoContainer>
      <FavContainer onClick={() => navigate(PATH_FAVORITES)}>
        <LikeIcon />
        <p>{favoriteCharacters.length}</p>
      </FavContainer>
      {charactersLoading && <Loader loading={charactersLoading.toString()} />}
    </HeaderContainer>
  );
}
