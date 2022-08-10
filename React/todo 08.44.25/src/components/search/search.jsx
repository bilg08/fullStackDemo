import React, { useState } from "react";
import "./search.css"
import {WhatSearched} from "./showWhatSearched"
export const Search = () => {
    const words = ["Banana", "Orange", "Apple", "Mango", "Grape", "Watermelon", "Pineapple"];

    let [whatSearcheds,setWhatSearched] = useState([]);

    let [inputValue,setInputValue] = useState("");
    const takeInputValue = (e) => {
        whatSearcheds=[]
        setInputValue(inputValue=e.target.value);

       words.map((el) => {
           if(el.toUpperCase().includes(inputValue) || el.toLowerCase().includes(inputValue)) {
               setWhatSearched(whatSearcheds=[...whatSearcheds,el])
           }
       })
    }
    

    return(
        <div>
            <input
            type="search"
            onChange={takeInputValue}
            placeholder="Та хайх зүйлээ оруулна уу ?"
            />
            <WhatSearched datas={whatSearcheds}/>
        </div>
    )
}