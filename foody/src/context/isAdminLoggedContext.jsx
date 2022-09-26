import { useContext, createContext, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseForThisProject/firebase";

const IsAdminLoggedContext = createContext();
export const IsAdminLoggedContextProvider = ({ children }) => {
  let [isAdminLogged, setIsAdminLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAdminLogged((isAdminLogged = true));
    } else {
      setIsAdminLogged((isAdminLogged = false));
    }
  });
  const signOutFromWebSite = () => {
    signOut(auth).then(() => {
      setIsAdminLogged((isAdminLogged = false));
    });
  };
  return (
    <IsAdminLoggedContext.Provider
      value={{ isAdminLogged, setIsAdminLogged, signOutFromWebSite }}>
      {children}
    </IsAdminLoggedContext.Provider>
  );
};
export const useIsAdminLoggedContext = () => useContext(IsAdminLoggedContext);
