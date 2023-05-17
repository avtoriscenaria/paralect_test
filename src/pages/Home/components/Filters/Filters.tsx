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
    filtersData,
    onChange,
    changeInitData,
    onClean,
    isNoChanges,
  } = useFilters();

  return (
    <div className="filtersContainer">
      <div className="filtersHeader">
        <label>{t.filters}</label>
        <button
          onClick={() => {
            onClean();
            onSubmit({});
          }}
        >
          {t.resetAll}
          <IconX size="1rem" />
        </button>
      </div>
      <Selector
        data={catalogues}
        selectedItem={filtersData.catalogues}
        placeholder={t.chooseIndustry}
        label={t.industry}
        onSelect={(item: { key: string }) => onChange("catalogues", item.key)}
      />
      <div className="priceSelectors">
        <label>{t.salary}</label>
        <Select
          className="priceSelector"
          data={salaries}
          placeholder={t.from}
          searchValue={filtersData.payment_from || ""}
          onChange={(v: string) => onChange("payment_from", v)}
        />
        <Select
          className="priceSelector"
          data={salaries}
          placeholder={t.to}
          searchValue={filtersData.payment_to || ""}
          onChange={(v: string) => onChange("payment_to", v)}
        />
      </div>
      <Button
        className="applyButton"
        disabled={isNoChanges}
        onClick={() => {
          onSubmit(filtersData);
          changeInitData();
        }}
      >
        {t.apply}
      </Button>
    </div>
  );
};
