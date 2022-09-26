import { createContext, useContext, useState } from "react";

export const SpinnerContext = createContext();
export const SpinnerContextProvider = ({ children }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [shouldHaveToReloadPage, setShouldHaveToReloadPage] =useState(false);
  if (shouldHaveToReloadPage === true) {
  window.location.reload()
}
  return (
    <SpinnerContext.Provider
      value={{
        isSpinning,
        setIsSpinning,
        setShouldHaveToReloadPage,
      }}>
      {children}
    </SpinnerContext.Provider>
  );
};
export const useSpinnerDatasContext = () => useContext(SpinnerContext);
