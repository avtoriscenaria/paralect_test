import { IFavorite } from "src/components/Smart/VacancyPreview";
import { HOST, LS_ALIAS } from "src/constants";

export const changeFavorites = (
  favoriteData: IFavorite,
  favorites: IFavorite[]
) => {
  const exist = favorites?.some(({ id }: IFavorite) => id === favoriteData.id);
  let updatedFavorite: IFavorite[] = favorites || [];
  if (exist) {
    updatedFavorite =
      favorites?.filter(({ id }: IFavorite) => id !== favoriteData.id) || [];
  } else {
    updatedFavorite = [...updatedFavorite, favoriteData];
  }
  localStorage.setItem(LS_ALIAS.favorites, JSON.stringify(updatedFavorite));
  return updatedFavorite;
};

export const favoriteArrDataToObject = (data: { id: string }[]) => {
  const object: { [key: string]: boolean } = {};
  for (const item of data) {
    object[item.id] = true;
  }
  return object;
};

export const getSalaryString = (
  t: { from: string; to: string; sallaryShort: string },
  payment_from?: number,
  payment_to?: number,
  currency?: string
) => {
  let salaryString = "-";
  if (payment_from && !payment_to) {
    salaryString = `${t.from.toLowerCase()} ${payment_from}`;
  } else if (!payment_from && payment_to) {
    salaryString = `${t.to.toLowerCase()} ${payment_to}`;
  } else if (payment_from && payment_to) {
    salaryString = `${payment_from} - ${payment_to}`;
  }
  return `${t.sallaryShort} ${salaryString} ${currency}`;
};

export const makeUrl = (
  url: string,
  params?: { [key: string]: string },
  query?: { [key: string]: string | undefined }
) => {
  let _url = url;
  let link = "";
  if (params) {
    for (const param in params) {
      _url = _url.replace(`:${param}`, params[param]);
    }
  }
  if (query) {
    for (const param in query) {
      link += `${param}=${query[param]}&`;
    }
  }
  return `${HOST}${_url}${link ? "?" + link : ""}`;
};
