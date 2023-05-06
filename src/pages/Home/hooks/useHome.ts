import { useState } from "react";
import { useAuthContext } from "src/context/AuthContext";

export const useHome = () => {
  const { authToken } = useAuthContext();
  console.log("authToken", authToken);
  const [data, setData] = useState([{ id: 1, name: "TEST TEST TEST" }]);

  return { data };
};
