import { useEffect, useState,useMemo,useCallback } from "react"
import { StopWatch } from "../stopWatch/stopwatch";
import { StopWatchUseReducer } from "../useReducerForClock/useReducerForClock";

export const PrimeNumber=()=>{
    
    const [userInput, setUserInput]=useState(0);
    let isPrimeNumber=false;
    const [primeNumbers,setPrimeNumbers]=useState([]);


    useMemo(()=>{
        setPrimeNumbers([]);
        for(let i=2;i<userInput;i++){
            for(let j=2;j<i;j++){
                  if(i%j===0){
                      isPrimeNumber=false;
                      break;
                  }else{
                      isPrimeNumber=true;
                      setPrimeNumbers(prevVal=>{
                          let prevValACopy=prevVal;
                          prevValACopy=[...prevValACopy,i];
                          return(
                              prevVal=prevValACopy
                          )
                      })
                    break;
                  }
            }
        }
    },[userInput])

    
    return(
        <div>
            <StopWatchUseReducer/>
            <StopWatch/>
            <input type="number" value={userInput} onChange={e=>setUserInput(e.target.value)}/>
            {primeNumbers.map((el,i)=><p key={i}>{el}</p>)}
        </div>
    )
}