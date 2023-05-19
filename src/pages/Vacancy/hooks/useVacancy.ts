import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IFavorite } from "src/components/Smart/VacancyPreview";
import { LS_ALIAS, api } from "src/constants";
import { changeFavorites } from "src/helpers";
import { useApi } from "src/hooks";

export const useVacancy = () => {
  const { vacancyId } = useParams();
  const [isMount, setIsMount] = useState(false);
  const [vacancy, setVacancy] = useState<any>({});
  const [initFavorite, setInitFavorite] = useState(false);
  const { request, isLoading } = useApi(api.vacancies.getVacancie);

  const getVacancie = useCallback(async () => {
    if (vacancyId) {
      const data = await request({ params: { id: vacancyId } });
      setVacancy(data);
    }
  }, [request, vacancyId]);

  const checkIfFavorite = useCallback(() => {
    const favorites = localStorage.getItem(LS_ALIAS.favorites);
    if (favorites) {
      const isFavorite = JSON.parse(favorites).some(
        ({ id }: IFavorite) => vacancyId === id
      );
      setInitFavorite(isFavorite);
    }
  }, [vacancyId]);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      getVacancie();
      checkIfFavorite();
    }
  }, [checkIfFavorite, getVacancie, isMount]);

  const changeFavorite = (favoriteData: IFavorite) => {
    const favorites = localStorage.getItem(LS_ALIAS.favorites);
    changeFavorites(favoriteData, JSON.parse(favorites || "[]"));
  };

  return { vacancy, isLoading, initFavorite, changeFavorite };
};
