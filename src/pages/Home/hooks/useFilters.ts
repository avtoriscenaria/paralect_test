import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "src/constants";
import { useApi } from "src/hooks";
import { FiltersProps } from "../interfaces";

export const useFilters = () => {
  const [isMount, setIsMount] = useState(false);
  const { request, isLoading } = useApi(api.catalogues.getCatalogues);
  const [catalogues, setCatalogues] = useState(null);
  const [initData, setInitData] = useState<FiltersProps>({});
  const [filtersData, setFiltersData] = useState<FiltersProps>({});

  const getCatalogues = useCallback(async () => {
    const data = await request();
    setCatalogues(
      data.map((catalogue: { key: string; title: string }) => ({
        key: catalogue.key.toString(),
        label: catalogue.title,
      }))
    );
  }, [request]);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      getCatalogues();
    }
  }, [getCatalogues, isMount]);

  const onChange = (name: string, value: string) => {
    setFiltersData({ ...filtersData, [name]: value });
  };

  const onClean = () => {
    setFiltersData({});
    setInitData({});
  };

  const changeInitData = () => {
    setInitData(filtersData);
  };

  const isNoChanges = useMemo(
    () =>
      filtersData.catalogues === initData.catalogues &&
      filtersData.payment_from === initData.payment_from &&
      filtersData.payment_to === initData.payment_to,
    [
      filtersData.catalogues,
      filtersData.payment_from,
      filtersData.payment_to,
      initData.catalogues,
      initData.payment_from,
      initData.payment_to,
    ]
  );

  return {
    catalogues: catalogues || [],
    onChange,
    filtersData,
    onClean,
    isNoChanges,
    changeInitData,
  };
};
