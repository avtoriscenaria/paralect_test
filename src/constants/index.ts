export const HOST = "https://startup-summer-2023-proxy.onrender.com/2.0";
// @ts-ignore
export const LOGIN: string = process.env.REACT_APP_LOGIN;
// @ts-ignore
export const PASSWORD: string = process.env.REACT_APP_PASSWORD;
// @ts-ignore
export const CLIENT_ID: string = process.env.REACT_APP_CLIENT_ID;
// @ts-ignore
export const SECRET_KEY: string = process.env.REACT_APP_SECRET_KEY;
// @ts-ignore
export const SECRET_KEY_PARALECT: string =
  process.env.REACT_APP_SECRET_KEY_PARALECT;

export const api = {
  auth: {
    login: { url: "/oauth2/password", method: "GET" },
  },
};
