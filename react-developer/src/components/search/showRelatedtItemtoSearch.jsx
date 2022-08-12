import React from "react";
import "./showRelatedItemToSearch.css"
export const ShowRelatedItemtoSearch = (props) => {
  console.log(props)
    return (
       <div className="fruitsContainer">
         {props.datas.map((data,index) =>
         
         <div className="fruit" key={index}>
          <h5>{data.fruitname}</h5>
          <img src={data.imageUrl}/>
          </div>)
         }
       </div>
    )
}