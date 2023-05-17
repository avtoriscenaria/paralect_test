import { createBrowserRouter } from "react-router-dom";
import { App } from "src/App";
import { PUBLIC_URL } from "src/constants";
import { Home, Favorite, Vacancy } from "src/pages";
import { ErrorPage } from "src/pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: `${PUBLIC_URL}`,
    Component: App,
    children: [
      {
        path: `${PUBLIC_URL}`,
        Component: Home,
      },
      {
        path: `${PUBLIC_URL}/vacancies/:vacancyId`,
        Component: Vacancy,
      },
      {
        path: `${PUBLIC_URL}/favorite`,
        Component: Favorite,
      },
    ],
  },
  {
    errorElement: <ErrorPage />,
  },
]);
