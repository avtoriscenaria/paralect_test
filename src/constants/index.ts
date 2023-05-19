export { api, HOST } from "./api";

//@ts-ignore
export const PUBLIC_URL: string = process.env.PUBLIC_URL || "/";
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
// @ts-ignore
export const ENV: string = process.env.REACT_APP_ENV;

export const LS_ALIAS = {
  auth_data: "authData",
  favorites: "favorites",
};

export const salaries = [
  "10000",
  "20000",
  "30000",
  "40000",
  "50000",
  "70000",
  "1000000",
  "150000",
  "200000",
];

export const HEADERS = {
  "x-secret-key": SECRET_KEY_PARALECT,
  "X-Api-App-Id": SECRET_KEY,
  "X-User-Type": "hr_user",
  "Content-Type": "application/x-www-form-urlencodedn",
};
