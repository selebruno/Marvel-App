import { Route, Routes } from "react-router-dom";
import { PATH_CHARACTER_DETAIL, PATH_FAVORITES, PATH_HOME } from "../constants/routes";
import Home from "../pages/Home";
import CharacterDetail from "../pages/CharacterDetail";
import MainLayout from "../layout/MainLayout";
import Favorites from "../pages/Favorites";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATH_HOME} element={<Home />} />
        <Route path={PATH_FAVORITES} element={<Favorites />} />
        <Route path={PATH_CHARACTER_DETAIL} element={<CharacterDetail />} />
      </Route>
    </Routes>
  );
}
