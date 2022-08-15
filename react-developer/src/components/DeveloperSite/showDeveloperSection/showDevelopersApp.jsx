import React from "react";
import "./showDevelopersStyle.css";
import { Cart } from "../Cart/app";
import { ReadMoreContextProvider } from "../useContext/app";

export const ShowDevelopers = (props) => {
   

    
    return(
            <ReadMoreContextProvider>
                <div className="developersCartContainer">
                    {props.developers.map((developer,index) =>
                        <Cart developer={developer} index={index} key={index}/>
                    )}
                </div>
            </ReadMoreContextProvider>
        
    )
}