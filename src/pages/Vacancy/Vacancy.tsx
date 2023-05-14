import { Loader, VacancyPreview } from "src/components";
import { useVacancy } from "./hooks/useVacancy";
import "./styles.scss";

export const Vacancy = () => {
  const { vacancy, isLoading, changeFavorite, initFavorite } = useVacancy();
  return (
    <div className="vacancyContainer">
      <VacancyPreview
        {...vacancy}
        changeFavorite={changeFavorite}
        isLoading={isLoading}
        disableLink
        initFavorite={initFavorite}
      />

      {isLoading ? (
        <div className="vacancyDescription">
          <Loader />
        </div>
      ) : (
        <div
          className="vacancyDescription"
          dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
        />
      )}
    </div>
  );
};
