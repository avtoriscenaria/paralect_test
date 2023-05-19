import { useCallback, useState } from "react";
import {
  CLIENT_ID,
  ENV,
  HEADERS,
  LS_ALIAS,
  SECRET_KEY,
  api,
} from "src/constants";
import { useAuthContext } from "src/context/AuthContext";
import { makeUrl } from "src/helpers";

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
  const { authToken, refreshToken, setAuthData } = useAuthContext();

  const refresh = useCallback(async () => {
    const res = await fetch(
      makeUrl(
        api.auth.refresh.url,
        {},
        {
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: SECRET_KEY,
        }
      ),
      {
        method: api.auth.refresh.method,
        headers: HEADERS,
      }
    ).then((res) => res);
    if (res.ok) {
      const authData = await res.json();
      localStorage.setItem(LS_ALIAS.auth_data, JSON.stringify(authData));
      setAuthData(authData);
      return authData.access_token;
    }
  }, [refreshToken, setAuthData]);

  const request = useCallback(
    async (reqData?: PropTypes) => {
      const { query, params, body } = reqData || {};
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      // Collect data for request
      const _url = makeUrl(enpoint.url, params, query);
      const headers: any = {
        ...HEADERS,
        Authorization: `Bearer ${authToken}`,
      };
      if (ENV === "test") {
        delete headers.Authorization;
      }
      const initData = {
        method: enpoint.method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      };
      // Fetching data
      const res = await fetch(_url, initData).then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        // If fetch failed and access_token expired, trying get new access_token via refresh_token-request
        console.log("FAIL", res);
        if (res.status === 410) {
          console.log("RES 410");
          const access_token = await refresh();
          //Try again "main" request with the same data and new access_token
          const res = await fetch(_url, {
            ...initData,
            headers: {
              ...initData.headers,
              Authorization: `Bearer ${access_token}`,
            },
          }).then((res) => {
            if (res.ok) {
              return res.json();
            }
            localStorage.removeItem(LS_ALIAS.auth_data);
          });

          return res;
        }
        localStorage.removeItem(LS_ALIAS.auth_data);
      });

      setIsLoading(false);
      return res;
    },
    [authToken, enpoint.method, enpoint.url, isLoading, refresh]
  );

  return { request, isLoading };
};
