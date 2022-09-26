import { createContext, useContext, useState } from "react";
import { useGetDocsFromFireBase } from "../customHook/getDocsCustomHook";
import { setDocToFirebase } from "../firebaseForThisProject/setDoc";
export const FoodsContext = createContext();
export const FoodsContextProvider = ({ children }) => {
  const [foodsDatas] = useGetDocsFromFireBase("foods");
  const [addedFoods, setAddedFoods] = useState({
    name: "",
    detail: "",
    price: "",
    img:""
  });
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  }
  const takeUserOrder = async() => {
    await setDocToFirebase(`foods/${addedFoods.name}`, addedFoods);
  }
 
  return (
    <FoodsContext.Provider
      value={{
        foodsDatas,
        addedFoods,
        setAddedFoods,
        takeUserInput,
        takeUserOrder,
      }}
    >
      {children}
    </FoodsContext.Provider>
  );
};
export const useFoodsDatasContext = () => useContext(FoodsContext);
