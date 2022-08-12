import React, { useState } from "react";
import { useContext } from "react";
import { readMoreContext } from "../../../App";

// import {SearchDevelopers} from "../inputSection/searchDevelopers-input";
// import {ShowDevelopers} from "../showDeveloperSection/showDevelopersApp";
// import {developers} from "./developers-info.js";
import "./style.css";



export const DevelopSiteMain = () => {
    const {} = useContext(readMoreContext);
    console.log(useReadMoreContext);
    
    
    // let [usersInput,setUsersInput] = useState("");
    // let [desiredCsq,setDesiredCsq] = useState([...developers])
    // const takeInputValue = (e) => {
  
    //       setUsersInput(e.target.value);      
    //       setDesiredCsq(desiredCsq=developers.filter((developer) =>
    //       developer.name.includes(usersInput)? developer :false        
    
    // ))
          
    // console.log(desiredCsq)
    // }
   
    // return(
    //     <div className="developor-site">
    //         <SearchDevelopers onSearch ={takeInputValue}/>
    //         <ShowDevelopers developers={desiredCsq}/>
    //     </div>
    // )
}