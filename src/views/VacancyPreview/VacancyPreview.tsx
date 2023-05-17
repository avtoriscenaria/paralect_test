import { useState } from "react";
import { Link } from "react-router-dom";
import { IconStar } from "@tabler/icons-react";
import location from "src/assets/location.png";
import { getSalaryString } from "../../pages/Home/helpers";
import { getTranslations } from "src/constants/translations";
import "./styles.scss";
import { Loader } from "../../components/Loader";

export interface IFavorite {
  id: number | string;
  profession: string;
  town?: { title?: string };
  type_of_work?: { title?: string };
  payment_to: number;
  payment_from: number;
  currency: string;
}

interface PropTypes extends IFavorite {
  initFavorite: boolean;
  changeFavorite: (favoriteData: IFavorite) => void;
  isLoading?: boolean;
  disableLink?: boolean;
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
  isLoading,
  disableLink,
}: PropTypes) => {
  const { title: townTitle } = town || {};
  const { title: typeOfWork } = type_of_work || {};
  const [favorite, setFavorite] = useState(initFavorite);
  const t = getTranslations();

  const _changeFavorite = () => {
    changeFavorite({
      id: `${vacancyId}`,
      profession,
      payment_from,
      payment_to,
      currency,
      type_of_work: { title: typeOfWork },
      town: { title: townTitle },
    });
    setFavorite(!favorite);
  };

  return (
    <div className="vacancyPreviewContainer">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="infoWrapper">
            <div className={`label${disableLink ? " disabled" : ""}`}>
              {disableLink ? (
                profession
              ) : (
                <Link
                  className="link"
                  to={`/paralect_test/vacancies/${vacancyId}`}
                >
                  {profession}
                </Link>
              )}
            </div>

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
        </>
      )}
    </div>
  );
};
