import { VacancyPreview } from "src/components";
import { useFavorite } from "./hooks/useFavorite";
import { IFavorite } from "src/components/VacancyPreview";
import "./styles.scss";

export const Favorite = () => {
  const { favorites, changeFavorite } = useFavorite();
  return (
    <div className="favoriteContainer">
      {favorites.map((vacancy: IFavorite) => (
        <VacancyPreview
          initFavorite={true}
          changeFavorite={changeFavorite}
          key={vacancy.id}
          {...vacancy}
        />
      ))}
    </div>
  );
};
