import { VacancyPreview } from "src/components";
import { useVacancy } from "./hooks/useVacancy";
import "./styles.scss";

export const Vacancy = () => {
  const { vacancy } = useVacancy();
  return (
    <div className="vacancyContainer">
      <VacancyPreview
        {...vacancy}
        changeFavorite={(value) => console.log("v", value)}
      />
      <div
        className="vacancyDescription"
        dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
      />
    </div>
  );
};
