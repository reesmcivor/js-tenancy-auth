import { useContext } from "react";

import { AuthContext } from "js-tenancy-auth/store/AuthContext";
import authStorage from "js-tenancy-auth/storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);
    authStorage.storeToken(JSON.stringify(user));
  };

  const verifyUser = () => {
    setUser({...user, verified: true});
  }

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, verifyUser, logIn, logOut };
};
