import React, { useEffect, useState } from "react";
import axios from "axios";

export const Gif=()=>{
const [gifDatas,setGifDatas]=useState([]);
const [userInput,setUserInput]=useState('')

const getDatasFromApi=async()=>{
    try {
        const getDatas= await  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=sfJoNIbYEOS4pmyNpQe5lT4FkLd6xmAg&q=${userInput}&limit=30`);
        getDatas.data.data.forEach((el)=>{
        setGifDatas((prevVal)=>{
            let prevValACopy=prevVal;
            prevValACopy.push(el.images.original.url);
            console.log(prevValACopy)
            return(
             prevVal=prevValACopy
            )
        })
        });
    } catch (error) {
        
}}    
    useEffect(()=>{
        getDatasFromApi();
    },[])


    return(
        <>
        <input value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
            <button onClick={()=>getDatasFromApi()}>Хайх</button>
            <div>
            {gifDatas.map((el)=><img style={{width:100+"px",height:100+"px"}} src={el}/>)}
        </div>
        </>
    )
}