import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export default function MainLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
