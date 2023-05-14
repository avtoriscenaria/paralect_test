import { IFavorite } from "src/components/VacancyPreview";
import { LS_ALIAS } from "src/constants";

export const changeFavorites = (
  favoriteData: IFavorite,
  favorites: IFavorite[]
) => {
  const exist = favorites?.some(({ id }: IFavorite) => id === favoriteData.id);
  let updatedFavorite: IFavorite[] = favorites || [];
  if (exist) {
    updatedFavorite =
      favorites?.filter(({ id }: IFavorite) => id !== favoriteData.id) || [];
  } else {
    updatedFavorite = [...updatedFavorite, favoriteData];
  }
  console.log("UPD", updatedFavorite);
  localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorite));
  return updatedFavorite;
};
