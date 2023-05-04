import { useContext } from "react";

import { AuthContext } from "js-tenancy-auth/store/AuthContext";
import authStorage from "js-tenancy-auth/storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    setUser(authToken);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
