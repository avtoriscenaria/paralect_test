import { Filters, VacancyPreview } from "./components";
import { Loader, Search } from "src/components";
import "./styles.scss";
import { getTranslations } from "src/constants/translations";
import { useHome } from "./hooks/useHome";
import { Pagination } from "@mantine/core";

export const Home = () => {
  const t = getTranslations();
  const {
    data,
    changeFavorite,
    favorites,
    isLoading,
    restInfo,
    onChangePage,
    onSubmitFilters,
  } = useHome();

  return (
    <div className="homeContainer">
      <Filters onSubmit={onSubmitFilters} />
      <div className="vacanciesWrapper">
        <Search
          className="search"
          placeholder={t.vacancySearchPlaceholder}
          submitlabel={t.search}
        />
        <div className="vacanсiesList">
          {isLoading ? (
            <Loader />
          ) : (
            data.map((vacancy: any) => (
              <VacancyPreview
                key={vacancy.id}
                {...vacancy}
                changeFavorite={(value) => changeFavorite(vacancy.id, value)}
                initFavorite={favorites[vacancy.id]}
              />
            ))
          )}
        </div>
        {restInfo?.total > 20 ? (
          <div className="paginationWrapper">
            <Pagination
              total={Math.ceil(restInfo?.total / 20)}
              onChange={onChangePage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
