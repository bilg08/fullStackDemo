import React, { useContext } from "react";
import "./style.css";
import { HeigthContext } from "../context/app";

export const Cart = (props) => {
    const {newarray} = useContext(HeigthContext);

    const heighten= (e) =>{
       const parentElementId = e.target.parentElement.getAttribute("id");

       if (newarray[parentElementId]===false){

            newarray[parentElementId]=true;
            console.log(newarray[parentElementId])
            e.target.parentElement.style.height=200+"px";

       }
       else if (newarray[parentElementId]===true) {

            newarray[parentElementId]=false;
            console.log(newarray[parentElementId])
            e.target.parentElement.style.height=400+"px";

       };
       
    }



    
    
    return(
        <div className="CartsContainer">
            {props.developers.map((developer,index) => {
                return(

                    <div key={index} id={index} className="Cart">

                        <button onClick={(e)=>heighten(e)}>ClickMe</button>

                    </div>

                )
            })}
        </div>
    )
}