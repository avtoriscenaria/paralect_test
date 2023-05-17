import { Loader } from "src/components";
import { Pagination } from "@mantine/core";
import { useFavorite } from "./hooks/useFavorite";
import { VacancyPreview } from "src/views";
import { EmptyData } from "./components";
import { IFavorite } from "src/views/VacancyPreview";
import "./styles.scss";

export const Favorite = () => {
  const { favorites, changeFavorite, onChangePage, pageItems } = useFavorite();

  return (
    <div className="favoriteContainer">
      <div className="pageItemsWrapper">
        {favorites ? (
          pageItems.length ? (
            pageItems.map((vacancy: IFavorite) => (
              <VacancyPreview
                initFavorite={true}
                changeFavorite={changeFavorite}
                key={vacancy.id}
                {...vacancy}
              />
            ))
          ) : (
            <EmptyData />
          )
        ) : (
          <Loader />
        )}
      </div>

      {(favorites?.length || 0) > 20 ? (
        <div className="paginationWrapper">
          <Pagination
            total={Math.ceil((favorites?.length || 0) / 20)}
            onChange={onChangePage}
          />
        </div>
      ) : null}
    </div>
  );
};
