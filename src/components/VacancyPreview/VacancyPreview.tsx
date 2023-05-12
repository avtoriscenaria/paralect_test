import { useState } from "react";
import { Link } from "react-router-dom";
import { IconStar } from "@tabler/icons-react";
import location from "src/assets/location.png";
import { getSalaryString } from "../../pages/Home/helpers";
import { getTranslations } from "src/constants/translations";
import "./styles.scss";

interface PropTypes {
  id: number | string;
  profession: string;
  firm_name: string;
  town?: { title: string };
  catalogues: { title: string }[];
  type_of_work?: { title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
  initFavorite: boolean;
  changeFavorite: (favorite: boolean) => void;
}

export const VacancyPreview = ({
  profession,
  town,
  type_of_work,
  payment_to,
  payment_from,
  currency,
  initFavorite,
  changeFavorite,
  id: vacancyId,
}: PropTypes) => {
  const { title: townTitle } = town || {};
  const { title: typeOfWork } = type_of_work || {};

  const [favorite, setFavorite] = useState(initFavorite);
  const t = getTranslations();

  const _changeFavorite = () => {
    changeFavorite(!favorite);
    setFavorite(!favorite);
  };

  return (
    <div className="vacancyPreviewContainer">
      <div className="infoWrapper">
        <Link to={`vacancies/${vacancyId}`} className="label">
          {profession}
        </Link>
        <p>
          <b>{getSalaryString(t, payment_from, payment_to, currency)}</b>•
          <span>{typeOfWork}</span>
        </p>
        <div className="locationWrapper">
          <img src={location} alt="" width={20} height={20} />
          {townTitle}
        </div>
      </div>
      <div className="iconWrapper">
        <IconStar
          className={`${favorite ? "selected" : ""}`}
          size="22px"
          onClick={_changeFavorite}
        />
      </div>
    </div>
  );
};
