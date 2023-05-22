import { Filters } from "./components";
import { Loader, Search } from "src/components/UI";
import { getTranslations } from "src/constants/translations";
import { useHome } from "./hooks/useHome";
import { Pagination } from "@mantine/core";
import { VacancyPreview, Accordion } from "src/components/Smart";
import { IFavorite } from "src/components/Smart/VacancyPreview";
import "./styles.scss";

export const Home = () => {
  const t = getTranslations();
  const {
    data,
    changeFavorites,
    favorites,
    isLoading,
    restInfo,
    onUpdateRequestData,
  } = useHome();

  return (
    <div className="homeContainer">
      <Accordion label={t.filters}>
        <Filters onSubmit={onUpdateRequestData("filters")} />
      </Accordion>

      <div className="scrollWrapper">
        <div className="vacanciesWrapper">
          <Search
            className="search"
            placeholder={t.vacancySearchPlaceholder}
            submitlabel={t.search}
            onSubmit={onUpdateRequestData("search")}
          />
          <div className="vacanсiesList">
            {isLoading ? (
              <Loader />
            ) : (
              data.map((vacancy: IFavorite) => (
                <VacancyPreview
                  key={vacancy.id}
                  {...vacancy}
                  changeFavorite={changeFavorites}
                  initFavorite={favorites[vacancy.id]}
                />
              ))
            )}
          </div>
          {restInfo?.total > 20 ? (
            <div className="paginationWrapper">
              <Pagination
                total={Math.ceil(restInfo?.total / 20)}
                onChange={onUpdateRequestData("page")}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
