import { getTranslations } from "src/constants/translations";
import { PUBLIC_URL } from "src/constants";
import { Link } from "react-router-dom";
import "./styles.scss";

export const ErrorPage = () => {
  const t = getTranslations();

  return (
    <div className="errorPageContainer">
      <h2>404 Not Found</h2>
      <label>{t.errorPageLabel}</label>
      <Link className="toVacancySearch" to={PUBLIC_URL}>
        {t.vacancySearch}
      </Link>
    </div>
  );
};
