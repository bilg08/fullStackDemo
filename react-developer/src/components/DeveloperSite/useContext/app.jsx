import React,{createContext, useState} from "react";

export const ReadMoreContext = createContext();

export const ReadMoreContextProvider = ({children}) => {

    let [IsReadMore,setReadMore] = useState(false);

    const readMore = (e,index) => {

        if(IsReadMore) {

            setReadMore(IsReadMore=false);
            document.getElementById(`button${index}`).innerText="readMore";
        
        }else {

            setReadMore(IsReadMore="readmore");
            document.getElementById(`button${index}`).innerText="readLess";
        }
    }

    return(
        <ReadMoreContext.Provider value={{IsReadMore,setReadMore,readMore}}>
            {children}
        </ReadMoreContext.Provider>
    )
}