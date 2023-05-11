export const HOST = "https://startup-summer-2023-proxy.onrender.com/2.0";

export const api = {
  auth: {
    login: { url: "/oauth2/password", method: "GET" },
  },
  vacancies: {
    getVacancies: { url: "/vacancies", method: "GET" },
  },
  catalogues: {
    getCatalogues: { url: "/catalogues", method: "GET" },
  },
};
