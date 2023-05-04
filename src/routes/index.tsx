import { createBrowserRouter } from "react-router-dom";
import { App } from "src/App";
import { Home, Favorite, Vacancy } from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "vacancies/:vacancyId",
        Component: Vacancy,
      },
      {
        path: "favorite",
        Component: Favorite,
      },
    ],
  },
]);
