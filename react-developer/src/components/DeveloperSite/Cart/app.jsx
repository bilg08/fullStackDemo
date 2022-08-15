import React,{useContext} from "react";
import {ReadMoreContext} from"../useContext/app"

export const Cart = (props) => {

const {IsReadMore,setReadMore,readMore} = useContext(ReadMoreContext);


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