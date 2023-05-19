import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Loader } from "src/components/UI";
import {
  CLIENT_ID,
  ENV,
  LOGIN,
  LS_ALIAS,
  PASSWORD,
  SECRET_KEY,
  SECRET_KEY_PARALECT,
  api,
} from "src/constants";
import { makeUrl } from "src/helpers";
import "./styles.scss";

interface PropTypes {
  authToken?: string;
  refreshToken?: string;
  setAuthData: (data: IAuthTypes) => void;
}

interface IAuthTypes {
  access_token: string;
  refresh_token: string;
}

const defaultContext: PropTypes = {
  setAuthData: () => {},
};

const AuthContext = createContext(defaultContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authData, setAuthData] = useState<IAuthTypes>();
  const [isFetching, setIsFetching] = useState(false);
  const authQuery = useMemo(
    () =>
      makeUrl(
        api.auth.login.url,
        {},
        {
          login: LOGIN,
          password: PASSWORD,
          client_id: CLIENT_ID,
          client_secret: SECRET_KEY,
        }
      ),
    []
  );
  const fetchAuthToken = useCallback(async () => {
    setIsFetching(true);
    const authData = localStorage.getItem(LS_ALIAS.auth_data);
    if (authData) {
      setAuthData(JSON.parse(authData));
    } else {
      let res = {
        access_token: "access_token",
        refresh_token: "refresh_token",
      };
      if (ENV !== "test") {
        res = await fetch(authQuery, {
          method: api.auth.login.method,
          headers: {
            "x-secret-key": SECRET_KEY_PARALECT,
            "Content-Type": "application/x-www-form-urlencodedn",
          },
        }).then((res) => res.json());
      }

      console.log("res!!!!!!!!!!!!", res);
      if (res.access_token) {
        localStorage.setItem(LS_ALIAS.auth_data, JSON.stringify(res));
        setAuthData(res);
      }
    }
    setIsFetching(false);
  }, [authQuery]);

  useEffect(() => {
    if (!isFetching && !authData) {
      console.log("FETCH");
      fetchAuthToken();
    }
  }, [authData, fetchAuthToken, isFetching]);

  return (
    <AuthContext.Provider
      value={{
        authToken: authData?.access_token,
        refreshToken: authData?.refresh_token,
        setAuthData,
      }}
    >
      <div className="contextContainer">{authData ? children : <Loader />}</div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): PropTypes => useContext(AuthContext);

export default AuthContext;
