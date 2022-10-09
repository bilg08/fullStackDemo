import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const userInputRef = useRef();
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <div>
        <input ref={userInputRef} placeholder="Хайх" />
        <button
          onClick={() => {
            let id = userInputRef.current.value;
            axios
              .get(`http://localhost:8000/users/${userInputRef.current.value}`)
              .then((res) => {
                setData([]);
                setData(res.data);
              });
          }}
        >
          Хайх
        </button>
      </div>
      <div>
        {data.length}
        {data.map((el) => {
          return (
            <div key = {el.firstName}>
              <h1 key={el.firstName}>{el.firstName}</h1>
              <h1 key={el.lastName+1}>{el.firstName}</h1>
            </div>
          );
        }
        )}
      </div>
    </div>
  );
}

export default App;
