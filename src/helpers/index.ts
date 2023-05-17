import { IFavorite } from "src/views/VacancyPreview";
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
  localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorite));
  return updatedFavorite;
};

export const favoriteArrDataToObject = (data: { id: string }[]) => {
  const object: { [key: string]: boolean } = {};
  for (const item of data) {
    object[item.id] = true;
  }
  return object;
};
