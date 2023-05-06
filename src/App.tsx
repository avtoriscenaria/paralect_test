import { Outlet } from "react-router-dom";
import { NavBar } from "src/components";
import "./App.scss";

export const App = () => {
  return (
    <div className="appContainer">
      <NavBar />
      <div className="pageContainer">
        <div className="pageWrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
