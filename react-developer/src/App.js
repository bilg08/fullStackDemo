import React, { createContext, useState } from 'react';
import './App.css';
import {DevelopSiteMain} from "./components/DeveloperSite/developorSiteMain/app"

export const readMoreContext = createContext();

function App() {
  
  const [IsReadMore,setReadMore] = useState(true)
  return (
   
        <div className="App">
           <readMoreContext.Provider value={{IsReadMore, setReadMore}}>
                 <DevelopSiteMain />
            </readMoreContext.Provider>
        </div>
    
    
  );
}
export default App;
