import { useState } from 'react';
import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function Counter({label, onStatAdd, onStatSubtract, initialValue, statType, stat}){
  const [count, setCount] = useState(initialValue);

  const handleAdd = () => {
    setCount(prevCount => prevCount + 1);
    onStatAdd(stat, statType);
  };

  const handleSubtract = () => {
    setCount(prevCount => prevCount - 1);
    onStatSubtract(stat,statType);
  };

  return (
    <label>
        <h2>{label}</h2>
    <div className="counter-container">
      <div className="counter-btn">
      <button disabled={count<=0} onClick={handleSubtract} className="btn-subtract">-</button>
      </div>  
        <input type="text" value={count} className="counter-input" readOnly />
        <div className="counter-btn">
      <button onClick={handleAdd} className="btn-add">+</button>
      </div>
    </div>
    </label>
  );
};