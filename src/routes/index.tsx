import { createBrowserRouter } from "react-router-dom";
import { NavBar } from "src/components";
import { Auth, Home, Favorite, Vacancy } from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: NavBar,
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
