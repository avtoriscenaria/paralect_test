import { useCallback, useEffect, useState } from "react";
import { HOST, SECRET_KEY_PARALECT } from "src/constants";

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

  const request = useCallback(
    async ({ query }: PropTypes) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const res = await fetch(makeUrl(enpoint.url, query), {
        method: enpoint.method,
        headers: {
          "x-secret-key": SECRET_KEY_PARALECT,
          "Content-Type": "application/x-www-form-urlencodedn",
        },
      }).then((res) => res.json());

      console.log("res!!!!!!!!!!!!", res);
      setIsLoading(false);
    },
    [enpoint.method, enpoint.url, isLoading]
  );

  return { request };
};

const makeUrl = (
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
