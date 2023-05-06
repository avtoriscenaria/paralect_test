import { Link } from "react-router-dom";
import { getTranslations } from "src/constants/translations";
import joboLogo from "src/assets/joboLogo.png";
import "./styles.scss";

export const NavBar = () => {
  const t = getTranslations();
  return (
    <div className="navBarContainer">
      <div className="navBarWrapper">
        <Link to="/" className="homeLink">
          <div className="homeLinkElement">
            <img src={joboLogo} alt="logo" />
            {t.companyName}
          </div>
        </Link>
        <Link to="/vacancies/123" className="link">
          {t.vacancySearch}
        </Link>
        <Link to="/favorite" className="link">
          {t.favorite}
        </Link>
      </div>
    </div>
  );
};
