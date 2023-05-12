import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "src/constants";
import { useApi } from "src/hooks";

export const useVacancy = () => {
  const { vacancyId } = useParams();
  const [isMount, setIsMount] = useState(false);
  const [vacancy, setVacancy] = useState<any>({});
  const { request } = useApi(api.vacancies.getVacancie);

  const getVacancie = useCallback(async () => {
    if (vacancyId) {
      const data = await request({ params: { id: vacancyId } });
      setVacancy(data);
    }
  }, [request, vacancyId]);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      getVacancie();
    }
  }, [getVacancie, isMount]);

  return { vacancy };
};
