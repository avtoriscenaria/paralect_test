import { useState, useEffect, useCallback } from "react";
import { LS_ALIAS, api } from "src/constants";
import { useApi } from "src/hooks";

export const useHome = () => {
  const [isMount, setIsMount] = useState(false);
  const [data, setData] = useState(null);
  const [restInfo, setRestInfo] = useState<any>(null);
  const [favorites, setFavorites] = useState<{ [key: string]: string }>({});
  const { request, isLoading } = useApi(api.vacancies.getVacancies);

  const getVacancies = useCallback(
    async (page?: string) => {
      const { objects, ..._restInfo } = await request({ query: { page } });
      setData(objects);
      setRestInfo(_restInfo);
    },
    [request]
  );

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      getVacancies();
      const _favorites = localStorage.getItem(LS_ALIAS.favorites);
      if (_favorites) {
        setFavorites(JSON.parse(_favorites));
      }
    }
  }, [getVacancies, isMount]);

  const changeFavorite = (vacancyId: string, value: boolean) => {
    const updatedFavorite = favorites;
    if (value) {
      updatedFavorite[vacancyId] = vacancyId;
    } else {
      delete updatedFavorite[vacancyId];
    }
    localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorite));
    setFavorites(updatedFavorite);
  };

  const onChangePage = (page: number) => {
    getVacancies(`${page - 1}`);
  };

  const onSubmitFilters = (filters: any) => {
    console.log("FILTERS", filters);
  };

  return {
    data: data || [],
    changeFavorite,
    favorites,
    isLoading,
    restInfo,
    onChangePage,
    isMount,
    onSubmitFilters,
  };
};
