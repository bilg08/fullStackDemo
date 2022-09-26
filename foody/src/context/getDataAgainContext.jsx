import React, { useState, useContext, createContext } from 'react'
import { v4 as uuidv4 } from "uuid";

const AgainGetDataContext = createContext()

export const AgainGetDataContextProvider = ({ children }) => {
  const [againGetDocs, setAgainGetDocs] = useState(false);
  
    return (
      <AgainGetDataContext.Provider value={{ againGetDocs, setAgainGetDocs }}>
        {children}
      </AgainGetDataContext.Provider>
    );
}

export const useAgainGetDocs=()=>useContext(AgainGetDataContext)

