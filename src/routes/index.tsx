import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./HomePage";
import MovieDetail from "./DetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MovieDetail />} path="/detail/:movieId" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
