import { useState, useEffect, useCallback } from "react";
import { LS_ALIAS, api } from "src/constants";
import { useApi } from "src/hooks";
import { FiltersProps } from "../interfaces";
import { IFavorite } from "src/views/VacancyPreview";
import { changeFavorites, favoriteArrDataToObject } from "src/helpers";

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
  const [favoritesObject, setFavoritesObject] = useState<{
    [key: string]: boolean;
  }>({});
  const [favorites, setFavorites] = useState<IFavorite[]>();
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
      const _favorites = localStorage.getItem(LS_ALIAS.favorites);
      if (_favorites) {
        const parsedData = JSON.parse(_favorites);
        setFavorites(parsedData);
        setFavoritesObject(favoriteArrDataToObject(parsedData));
      }
      getVacancies();
    }
  }, [getVacancies, isMount]);

  const _changeFavorites = (favoriteData: IFavorite) => {
    const _updatedFavoritesObject = {
      ...favoritesObject,
      [favoriteData.id]: !favoritesObject[favoriteData.id],
    };
    setFavoritesObject(_updatedFavoritesObject);
    const updatedFavorite = changeFavorites(favoriteData, favorites || []);
    setFavorites(updatedFavorite);
  };

  const onUpdateRequestData = useCallback(
    (type: string) => (data: any) => {
      let updatedQueryData;
      if (type === "page") {
        updatedQueryData = { ...queryData, page: `${data - 1}` };
      }
      if (type === "filters") {
        updatedQueryData = { ...queryData, ...data };
      }
      if (type === "search") {
        updatedQueryData = { ...queryData, keyword: data };
      }

      if (updatedQueryData) {
        setQueryData(updatedQueryData);
        getVacancies(updatedQueryData);
      }
    },
    [getVacancies, queryData]
  );

  return {
    data: data || [],
    changeFavorites: _changeFavorites,
    favorites: favoritesObject,
    isLoading,
    restInfo,
    isMount,
    onUpdateRequestData,
  };
};
