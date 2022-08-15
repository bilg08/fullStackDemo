import React, { createContext, useState } from "react";
import datas from "../data.json";
export const HeigthContext = createContext();

export const HeigthContextProvider = ({children}) => {
    const newarray = Array.from(datas).fill(false);
    console.log(newarray)
  

    return(
        <HeigthContext.Provider value={{newarray}}>
            {children}
        </HeigthContext.Provider>
    )
}