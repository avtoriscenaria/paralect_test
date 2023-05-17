import { useCallback, useState } from "react";
import { HOST, SECRET_KEY, SECRET_KEY_PARALECT } from "src/constants";
import { useAuthContext } from "src/context/AuthContext";

interface EndpointType {
  url: string;
  method: string;
}

interface PropTypes {
  params?: {
    [key: string]: string;
  };
  query?: {
    [key: string]: string | undefined;
  };
  body?: {
    [key: string]: any;
  };
}

export const useApi = (enpoint: EndpointType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuthContext();

  const request = useCallback(
    async (reqData?: PropTypes) => {
      const { query, params, body } = reqData || {};
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const res = await fetch(makeUrl(enpoint.url, params, query), {
        method: enpoint.method,
        headers: {
          "x-secret-key": SECRET_KEY_PARALECT,
          "X-Api-App-Id": SECRET_KEY,
          "X-User-Type": "hr_user",
          "Content-Type": "application/x-www-form-urlencodedn",
          Authorization: `Bearer ${authToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      }).then((res) => (res.ok ? res.json() : res));

      setIsLoading(false);
      return res;
    },
    [authToken, enpoint.method, enpoint.url, isLoading]
  );

  return { request, isLoading };
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
