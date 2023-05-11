import { getTranslations } from "src/constants/translations";
import "./styles.scss";
import location from "src/assets/location.png";
import { IconStar } from "@tabler/icons-react";
import { useState } from "react";

interface PropTypes {
  profession: string;
  firm_name: string;
  town: { title: string };
  catalogues: { title: string }[];
  type_of_work: { title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
  initFavorite: boolean;
  changeFavorite: (favorite: boolean) => void;
}

export const VacancyPreview = ({
  profession,
  firm_name,
  town: { title: townTitle },
  catalogues,
  type_of_work: { title: typeOfWork },
  payment_to,
  payment_from,
  currency,
  initFavorite,
  changeFavorite,
}: PropTypes) => {
  const [{ title: catalogueTitle }] = catalogues;
  const [favorite, setFavorite] = useState(initFavorite);
  const t = getTranslations();

  const _changeFavorite = () => {
    changeFavorite(!favorite);
    setFavorite(!favorite);
  };

  return (
    <div className="vacancyPreviewContainer">
      <div className="infoWrapper">
        <label>{profession}</label>
        <p>
          <b>{`${t.sallaryShort} ${
            payment_to
              ? `${payment_from}-${payment_to}`
              : `${t.from.toLowerCase()} ${payment_from}`
          } ${currency}`}</b>
          •<span>{typeOfWork}</span>
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
