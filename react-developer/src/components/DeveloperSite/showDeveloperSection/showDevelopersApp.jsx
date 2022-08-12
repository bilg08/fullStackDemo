import React, { useState } from "react";
import "./showDevelopersStyle.css";


export const ShowDevelopers = (props) => {
    
    const Cart = (props) => {

    const app = props.developer.experience.map((el,index) => el )
    console.log(app)
  
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
            <div key={props.index}  className="cart">
              <h2>{props.developer.name}</h2>
              <img alt="" src={props.developer.profile}/>
              <h2>Profession:<span>{props.developer.profession}</span></h2>
              <ul className={IsReadMore ? "developer-experience active" : "developer-experience"  } >
                 {props.developer.experience.map((el,index) => <li key={index}>{el}</li> )}
              </ul>
              <button className="readmoreButton" id={`button${props.index}`} onClick={(e)=>readMore(e,props.index)}>readMore</button>
           </div>
        )
    }


    return(
        <div className="developersCartContainer">
           {props.developers.map((developer,index) =>

                <Cart developer={developer} index={index} key={index}/>
            
            )}
        </div>
    )



}