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
        let tasks = [...todos];
        tasks.splice(index,1);
        return(
            todos=tasks
        )
       
    })
   }
   const todoDone = (index) => {
       const doneEl = document.getElementById(`done${index}`);
       doneEl.innerText= "Дууссан";
       doneEl.style.background="#27aeef";
       doneEl.style.border="none";
       doneEl.removeEventListener('click',() => todoDone())
   }

    return(
        <div className="Container">
            <div className="inputContainer">
                <input
                placeholder="Хийх зүйлээ оруулна уу?"
                onChange={takeInputValue}
                value={inputValue}
                />
                <button  onClick={addTodo}>+</button>
            </div>

            <div className="todosContainer">
                {todos.map((todo,index)=>{
                   return (
                   <div id={index} key={index} className="todo">
                      <p>{todo}</p>
                      <button onClick={()=>deleteTodo(index)}>X</button>
                      <button id={`done${index}`} onClick={()=>todoDone(index)}>Done</button>
                   </div>
                   )
                })}
                
            </div>
        </div>
    )
}