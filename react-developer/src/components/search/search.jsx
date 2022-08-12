import React, { useState } from "react";
import "./search.css"
import {ShowRelatedItemtoSearch} from "./showRelatedtItemtoSearch"
export const Search = () => {

    let [inputValue,setInputValue] = useState("");
    let [whatSearchedArray,setWhatSearchedArray] = useState([]);
    const fruits =[{fruitname:"Apple",imageUrl:"https://media.istockphoto.com/photos/red-apple-picture-id495878092?b=1&k=20&m=495878092&s=170667a&w=0&h=bJgILGFxOka0ymPlgilH8qaRxFhKole_M6IiYs6RyGM="},
    {fruitname:"Banana",imageUrl:"https://thumbs.dreamstime.com/b/sliced-banana-isolated-white-background-58835288.jpg"},
    {fruitname:"Watermelon",imageUrl:"https://thumbs.dreamstime.com/b/big-watermelon-slice-white-background-as-package-design-element-44517200.jpg"},
    {fruitname:"Orange",imageUrl:"https://wallpaperaccess.com/full/1652395.jpg"},
    {fruitname:"Kiwi",imageUrl:"https://media.istockphoto.com/photos/whole-kiwi-fruit-and-half-kiwi-fruit-on-white-picture-id834807852?b=1&k=20&m=834807852&s=170667a&w=0&h=S_YJ4wxua-7LrLRewBs5lbthHHvmeB-2sy3MIG1FyN4="},
    {fruitname:"Pineapple",imageUrl:"https://media.istockphoto.com/photos/whole-with-slice-ripe-pineapple-isolated-on-white-background-picture-id1064819674?k=20&m=1064819674&s=612x612&w=0&h=WIYJDrmo9L6xh8-l0dCkmCCb9_rIBQhhp4m2MXK_XMc="},
    {fruitname:"Cherry",imageUrl:"https://media.istockphoto.com/photos/sweet-cherries-picture-id172315512?b=1&k=20&m=172315512&s=170667a&w=0&h=rao7M7BvGnpu9xyCj2C_q9lj8ydKkKElMMufL4Fxj5E="}
];

    const takeInputValue = (e) => {

        whatSearchedArray=[];

        setInputValue(inputValue=e.target.value);

        fruits.map((fruit) => {

            if(fruit.fruitname.toLowerCase().includes(inputValue) || fruit.fruitname.toUpperCase().includes(inputValue) ) {

              setWhatSearchedArray(whatSearchedArray=[...whatSearchedArray,fruit]);

            }

       });
       
    }
   
    
    return(
        <div className="BigContainer2">
            <input
            type="search"
            placeholder="Та хайх зүйлээ оруулна уу?"
            onChange={takeInputValue}
            />
            <ShowRelatedItemtoSearch datas = {whatSearchedArray}/>
        </div>
    )
}