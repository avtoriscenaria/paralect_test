import { getTranslations } from "src/constants/translations";
import { Select, Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import "./styles.scss";

export const Filters = () => {
  const t = getTranslations();
  return (
    <div className="filtersContainer">
      <div className="filtersHeader">
        <label>{t.filters}</label>
        <button onClick={() => console.log("CLEAN")}>
          {t.resetAll}
          <IconX size="1rem" />
        </button>
      </div>
      <Select
        mt="md"
        data={["React", "Angular", "Svelte", "Vue"]}
        placeholder={t.chooseIndustry}
        label={t.industry}
      />
      <div>
        <label>{t.salary}</label>
        <Select mt="md" data={["0", "1", "2", "3"]} placeholder={t.from} />{" "}
        <Select mt="md" data={["1", "2", "3", "4"]} placeholder={t.to} />
      </div>
      <Button className="applyButton" onClick={() => console.log("APPLY")}>
        {t.apply}
      </Button>
    </div>
  );
};
