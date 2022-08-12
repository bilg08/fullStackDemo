import React, { useState } from "react";
import "./todo.css"
export const Todo = () => {
   
   let [inputValue,setInputValue] = useState("");
   let [todos,setTodo] = useState([]);

   const takeInputValue = (e) => {
    setInputValue(inputValue=e.target.value);
   } 
   
   const addTodo = () => {
     setTodo(todos=[...todos,inputValue]);
     setInputValue(inputValue="");
     
   }

   const deleteTodo = (index) => {
    setTodo((e)=>{

        let tasks = [...e];
        tasks.splice(index,1);
        return(
            todos=tasks
        )
    })
   }

    return(
       <div className="BigContainer1">
            <div className="Container">
                <div className="inputContainer">
                    <input
                    placeholder="Хийх зүйлээ оруулна уу?"
                    onChange={takeInputValue}
                    value={inputValue}
                    />
                    <button onClick={addTodo}>+</button>
                </div>

                <div className="todosContainer">
                    {todos.map((todo,index)=>{
                    return (
                    <div id={index} key={index} className="todo">
                        <p>{todo}</p>
                        <button onClick={()=>deleteTodo(index)}>x</button>
                    </div>
                    )
                    })}
                    
                </div>
            </div>
       </div>
        
    )
}