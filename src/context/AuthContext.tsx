import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Loader } from "src/components";
import {
  CLIENT_ID,
  LOGIN,
  LS_ALIAS,
  PASSWORD,
  SECRET_KEY,
  SECRET_KEY_PARALECT,
  api,
} from "src/constants";
import { makeUrl } from "src/hooks/useApi";

interface PropTypes {
  authToken?: string;
}

const defaultContext: PropTypes = {
  authToken: "",
};

const AuthContext = createContext(defaultContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authToken, setAuthToken] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const authQuery = useMemo(
    () =>
      makeUrl(api.auth.login.url, {
        login: LOGIN,
        password: PASSWORD,
        client_id: CLIENT_ID,
        client_secret: SECRET_KEY,
      }),
    []
  );
  const fetchAuthToken = useCallback(async () => {
    const authData = localStorage.getItem(LS_ALIAS.auth_data);

    if (authData) {
      setAuthToken(JSON.parse(authData).access_token);
    } else {
      setIsFetching(true);
      const res = await fetch(authQuery, {
        method: api.auth.login.method,
        headers: {
          "x-secret-key": SECRET_KEY_PARALECT,
          "Content-Type": "application/x-www-form-urlencodedn",
        },
      }).then((res) => res.json());

      console.log("res!!!!!!!!!!!!", res);
      if (res.access_token) {
        localStorage.setItem(LS_ALIAS.auth_data, JSON.stringify(res));
        setAuthToken(res.access_token);
      }
      setIsFetching(false);
    }
  }, [authQuery]);

  useEffect(() => {
    if (!isFetching && !authToken) {
      console.log("FETCH");
      fetchAuthToken();
    }
  }, [authToken, fetchAuthToken, isFetching]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
      }}
    >
      {authToken ? children : <Loader />}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): PropTypes => useContext(AuthContext);

export default AuthContext;
