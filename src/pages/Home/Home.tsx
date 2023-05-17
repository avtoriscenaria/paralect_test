import { Filters } from "./components";
import { Loader, Search } from "src/components";
import { getTranslations } from "src/constants/translations";
import { useHome } from "./hooks/useHome";
import { Pagination } from "@mantine/core";
import "./styles.scss";
import { VacancyPreview } from "src/views";
import { IFavorite } from "src/views/VacancyPreview";

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
      <Filters onSubmit={onUpdateRequestData("filters")} />
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
  );
};
