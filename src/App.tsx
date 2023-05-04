import { Outlet } from "react-router-dom";
import { NavBar } from "src/components";

export const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
