import React, { useEffect, useState } from "react";



export const StopWatch=()=>{
    let [count,setCount]=useState(0);
    const [isRunning,setIsRunning]=useState(false);

    useEffect(()=>{
        if(isRunning){
            const interval=setInterval(()=>{
                setCount(count+1)
            },1000);
        return()=>{
            clearInterval(interval);
        }
        }
    })
    return(
        <div>
            <div>{count}</div>
            <button onClick={()=>setIsRunning(true)}>Эхлэх</button>
            <button onClick={()=>setIsRunning(false)}>Зогс</button>
        </div>
    )
}