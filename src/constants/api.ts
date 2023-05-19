export const HOST = "https://startup-summer-2023-proxy.onrender.com/2.0";

export const api = {
  auth: {
    login: { url: "/oauth2/password", method: "GET" },
    refresh: { url: "/oauth2/refresh_token", method: "GET" },
  },
  vacancies: {
    getVacancies: { url: "/vacancies", method: "GET" },
    getVacancie: { url: "/vacancies/:id", method: "GET" },
  },
  catalogues: {
    getCatalogues: { url: "/catalogues", method: "GET" },
  },
};
