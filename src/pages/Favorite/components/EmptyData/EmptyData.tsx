import emptyDataImg from "src/assets/emptyData.png";
import { getTranslations } from "src/constants/translations";
import { PUBLIC_URL } from "src/constants";
import { Link } from "react-router-dom";
import "./styles.scss";

export const EmptyData = () => {
  const t = getTranslations();

  return (
    <div className="emptyDataContainer">
      <img alt="" src={emptyDataImg} />
      <label>{t.emptyDataLabel}</label>
      <Link className="toVacancySearch" to={PUBLIC_URL}>
        {t.vacancySearch}
      </Link>
    </div>
  );
};
