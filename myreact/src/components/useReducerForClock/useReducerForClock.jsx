import React,{useReducer} from "react";


export const StopWatchUseReducer=()=>{
    const initialState={
        num:0
    }
    const reducer=(state,action)=>{
       
    }
    const [state,dispatch]=useReducer(initialState,reducer);
    return(
        <div>
            <h1>Hello</h1>
            <p></p>
            <button>+</button>
            <button>-</button>
        </div>
    )
}