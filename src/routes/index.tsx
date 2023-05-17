import { createBrowserRouter } from "react-router-dom";
import { App } from "src/App";
import { Home, Favorite, Vacancy } from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/paralect_test",
    Component: App,
    children: [
      {
        path: "/paralect_test",
        Component: Home,
      },
      {
        path: "/paralect_test/vacancies/:vacancyId",
        Component: Vacancy,
      },
      {
        path: "/paralect_test/favorite",
        Component: Favorite,
      },
    ],
  },
]);
