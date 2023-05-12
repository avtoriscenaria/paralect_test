import { Link, useLocation } from "react-router-dom";
import { getTranslations } from "src/constants/translations";
import joboLogo from "src/assets/joboLogo.png";
import "./styles.scss";

export const NavBar = () => {
  const t = getTranslations();
  const { pathname } = useLocation();

  return (
    <div className="navBarContainer">
      <div className="navBarWrapper">
        <Link to="/" className="homeLink">
          <div className="homeLinkElement">
            <img src={joboLogo} alt="logo" />
            {t.companyName}
          </div>
        </Link>
        <Link
          to="/"
          className={`link${
            pathname.includes("vacancies") || pathname === "/"
              ? " selected"
              : ""
          }`}
        >
          {t.vacancySearch}
        </Link>
        <Link
          to="/favorite"
          className={`link${pathname.includes("favorite") ? " selected" : ""}`}
        >
          {t.favorite}
        </Link>
      </div>
    </div>
  );
};
