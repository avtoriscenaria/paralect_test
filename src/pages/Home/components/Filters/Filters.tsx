import { getTranslations } from "src/constants/translations";
import { Select, Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import "./styles.scss";
import { useFilters } from "src/pages/Home/hooks/useFilters";
import { Selector } from "src/components";
import { salaries } from "src/constants";

interface PropTypes {
  onSubmit: (filters: {
    payment_from?: string;
    payment_to?: string;
    catalogues?: string;
  }) => void;
}

export const Filters = ({ onSubmit }: PropTypes) => {
  const t = getTranslations();
  const {
    catalogues,
    selectedCatalogue,
    setCatalogue,
    fromSalary,
    toSalary,
    setFromSalary,
    setToSalary,
    onClean,
  } = useFilters();

  return (
    <div className="filtersContainer">
      <div className="filtersHeader">
        <label>{t.filters}</label>
        <button onClick={onClean}>
          {t.resetAll}
          <IconX size="1rem" />
        </button>
      </div>
      <Selector
        data={catalogues}
        selectedItem={selectedCatalogue}
        placeholder={t.chooseIndustry}
        label={t.industry}
        onSelect={(item: { key: string }) => setCatalogue(item.key)}
      />
      <div className="priceSelectors">
        <label>{t.salary}</label>
        <Select
          className="priceSelector"
          data={salaries}
          placeholder={t.from}
          searchValue={fromSalary}
          onChange={(v: any) => setFromSalary(v)}
        />
        <Select
          className="priceSelector"
          data={salaries}
          placeholder={t.to}
          searchValue={toSalary}
          onChange={(v: any) => setToSalary(v)}
        />
      </div>
      <Button
        className="applyButton"
        onClick={() =>
          onSubmit({
            payment_from: fromSalary,
            payment_to: toSalary,
            catalogues: selectedCatalogue,
          })
        }
      >
        {t.apply}
      </Button>
    </div>
  );
};
