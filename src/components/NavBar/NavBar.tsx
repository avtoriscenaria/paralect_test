import { Outlet, Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/vacancies/123">Vacncy</Link>
        <Link to="/favorite">Favorite</Link>
      </div>
      <Outlet />
    </div>
  );
};
