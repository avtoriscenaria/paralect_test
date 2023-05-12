import { useState, useEffect, useCallback } from "react";
import { LS_ALIAS, api } from "src/constants";
import { useApi } from "src/hooks";
import { FiltersProps } from "../interfaces";

interface QueryTypes extends FiltersProps {
  page?: string;
  keyword?: string;
  [key: string]: string | undefined;
}

export const useHome = () => {
  const [isMount, setIsMount] = useState(false);
  const [data, setData] = useState(null);
  const [restInfo, setRestInfo] = useState<any>(null);
  const [queryData, setQueryData] = useState<QueryTypes>({});
  const [favorites, setFavorites] = useState<{ [key: string]: string }>({});
  const { request, isLoading } = useApi(api.vacancies.getVacancies);

  const getVacancies = useCallback(
    async (query: QueryTypes = {}) => {
      const { objects, ..._restInfo } = await request({
        query,
      });
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
    const updatedQueryData = { ...queryData, page: `${page - 1}` };
    setQueryData(updatedQueryData);
    getVacancies(updatedQueryData);
  };

  const onSubmitFilters = (filters: any) => {
    const updatedQueryData = { ...queryData, ...filters };
    setQueryData(updatedQueryData);
    getVacancies(updatedQueryData);
  };

  const onSubmitSearch = (search: string) => {
    const updatedQueryData = { ...queryData, keyword: search };
    setQueryData(updatedQueryData);
    getVacancies(updatedQueryData);
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
    onSubmitSearch,
  };
};
