import { useState, useEffect, useCallback } from "react";
import { api } from "src/constants";
import { useApi } from "src/hooks";

export const useFilters = () => {
  const [isMount, setIsMount] = useState(false);
  const { request, isLoading } = useApi(api.catalogues.getCatalogues);
  const [catalogues, setCatalogues] = useState(null);
  const [selectedCatalogue, setCatalogue] = useState<string>();
  const [fromSalary, setFromSalary] = useState();
  const [toSalary, setToSalary] = useState();

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

  const onClean = () => {
    setCatalogue(undefined);
    setFromSalary(undefined);
    setToSalary(undefined);
  };

  return {
    catalogues: catalogues || [],
    selectedCatalogue,
    setCatalogue,
    fromSalary,
    setFromSalary,
    toSalary,
    setToSalary,
    onClean,
  };
};
