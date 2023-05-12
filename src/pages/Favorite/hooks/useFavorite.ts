import { useEffect, useState, useCallback } from "react";
import { LS_ALIAS, api } from "src/constants";
import { useApi } from "src/hooks";

export const useFavorite = () => {
  const [isMount, setIsMount] = useState(false);
  const { request } = useApi(api.vacancies.getFavorite);
  const [favorite, setFavorite] = useState<string[]>();

  const getFavorite = useCallback(
    async (_favorite: string[]) => {
      console.log("fav", _favorite);
      const data = await request({});
      console.log("data", data);
    },
    [request]
  );

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      const data = localStorage.getItem(LS_ALIAS.favorites);
      if (data) {
        const _favorite = Object.keys(JSON.parse(data));
        setFavorite(_favorite);
        getFavorite(_favorite);
      }
    }
  }, [getFavorite, isMount]);

  return {};
};
