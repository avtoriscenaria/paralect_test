import { useEffect, useState, useCallback } from "react";
import { IFavorite } from "src/components/VacancyPreview";
import { LS_ALIAS } from "src/constants";

export const useFavorite = () => {
  const [isMount, setIsMount] = useState(false);
  const [favorites, setFavorites] = useState<IFavorite[]>();

  const getFavorite = useCallback(async () => {
    const _favorites = localStorage.getItem(LS_ALIAS.favorites);
    if (_favorites) {
      setFavorites(JSON.parse(_favorites));
    }
  }, []);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      getFavorite();
    }
  }, [getFavorite, isMount]);

  const changeFavorite = (favoriteData: IFavorite) => {
    const updatedFavorits = favorites?.filter(
      ({ id }: IFavorite) => id !== favoriteData.id
    );
    setFavorites(updatedFavorits);
    localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorits));
  };

  return { favorites: favorites || [], changeFavorite };
};
