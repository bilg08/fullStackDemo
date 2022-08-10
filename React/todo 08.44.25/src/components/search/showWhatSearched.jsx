import React from "react";

export const WhatSearched = (props) => {
    return(
       <ul>
           {props.datas.map((data,index) => {
               return(
                   <li key={index}>{data}</li>
               )
           })}
       </ul>
    )
}