import { useEffect, useState, useCallback, useMemo } from "react";
import { IFavorite } from "src/views/VacancyPreview";
import { LS_ALIAS } from "src/constants";

export const useFavorite = () => {
  const [isMount, setIsMount] = useState(false);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<IFavorite[]>();

  const pageItems = useMemo(
    () =>
      favorites?.filter(
        (item, index) => index >= (page - 1) * 20 && index < page * 20
      ) || [],
    [favorites, page]
  );

  const getFavorite = useCallback(async () => {
    const _favorites = localStorage.getItem(LS_ALIAS.favorites);

    setFavorites(_favorites ? JSON.parse(_favorites) : []);
  }, []);

  useEffect(() => {
    if (!isMount) {
      getFavorite();
      setIsMount(true);
    }
  }, [getFavorite, isMount]);

  const changeFavorite = (favoriteData: IFavorite) => {
    const updatedFavorits = favorites?.filter(
      ({ id }: IFavorite) => id !== favoriteData.id
    );
    setFavorites(updatedFavorits);
    localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorits));
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return { favorites, changeFavorite, pageItems, onChangePage };
};
