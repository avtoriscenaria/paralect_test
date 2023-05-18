import { Loader } from "src/components";
import { useVacancy } from "./hooks/useVacancy";
import { VacancyPreview } from "src/views";
import "./styles.scss";

export const Vacancy = () => {
  const { vacancy, isLoading, changeFavorite, initFavorite } = useVacancy();
  return (
    <div className="vacancyContainer">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <VacancyPreview
            {...vacancy}
            changeFavorite={changeFavorite}
            disableLink
            initFavorite={initFavorite}
          />
          <div
            className="vacancyDescription"
            dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
          />
        </>
      )}
    </div>
  );
};
