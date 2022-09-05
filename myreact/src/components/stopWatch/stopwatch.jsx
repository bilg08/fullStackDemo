import React, { useEffect, useReducer, useState } from "react";

let initialState={
    second:0
}
const reducer=(state,action)=>{
if(action.type==='start'){
    setInterval(() => {
      console.log(state.second)
    },1000);
    return{second:state.second+1}
    
}else if(action.type==='stop'){
    return {second:state.second-1}
}
}

export const StopWatch=()=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    return(
        <div>
            <div>{`second${state.second}`}</div>
            <button onClick={()=>dispatch({type:'start'})}>Эхлэх</button>
            <button onClick={()=>dispatch({type:'stop'})}>Зогс</button>
        </div>
    )
}