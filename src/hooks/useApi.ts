import { useCallback, useEffect, useState } from "react";
import { HOST, SECRET_KEY, SECRET_KEY_PARALECT } from "src/constants";
import { useAuthContext } from "src/context/AuthContext";

interface EndpointType {
  url: string;
  method: string;
}

interface PropTypes {
  query?: {
    [key: string]: string | undefined;
  };
}

export const useApi = (enpoint: EndpointType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuthContext();

  const request = useCallback(
    async (params?: PropTypes) => {
      const { query } = params || {};
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const res = await fetch(makeUrl(enpoint.url, query), {
        method: enpoint.method,
        headers: {
          "x-secret-key": SECRET_KEY_PARALECT,
          "X-Api-App-Id": SECRET_KEY,
          "Content-Type": "application/x-www-form-urlencodedn",
          //Authorization: `Bearer ${authToken}`,
        },
      }).then((res) => (res.ok ? res.json() : res));

      setIsLoading(false);
      return res;
    },
    [enpoint.method, enpoint.url, isLoading]
  );

  return { request, isLoading };
};

export const makeUrl = (
  url: string,
  queryData?: { [key: string]: string | undefined }
) => {
  let query = "";
  if (queryData) {
    for (const param in queryData) {
      query += `${param}=${queryData[param]}&`;
    }
  }
  return `${HOST}${url}${query ? "?" + query : ""}`;
};
