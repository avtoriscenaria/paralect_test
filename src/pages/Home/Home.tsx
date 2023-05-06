import { useEffect, useState } from "react";
import { CLIENT_ID, LOGIN, PASSWORD, SECRET_KEY, api } from "src/constants";
import { useApi } from "src/hooks";
import { Filters, VacancyPreview } from "./components";
import { Search } from "src/components";
import "./styles.scss";
import { getTranslations } from "src/constants/translations";
import { useHome } from "./hooks/useHome";

export const Home = () => {
  const t = getTranslations();
  const { data } = useHome();

  return (
    <div className="homeContainer">
      <Filters />
      <div className="vacanciesWrapper">
        <Search className="search" placeholder={t.vacancySearchPlaceholder} />
        {data.map((vacancy) => (
          <VacancyPreview key={vacancy.id} {...vacancy} />
        ))}
      </div>
    </div>
  );
};
