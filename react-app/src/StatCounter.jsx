import { useState } from 'react';
import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function Counter({label, onStatAdd, onStatSubtract, initialValue, statType, stat}){
  const [count, setCount] = useState(initialValue);

  const handleAdd = (num) => {
    setCount(prevCount => prevCount + num);
    onStatAdd(stat, statType,num);
  };

  const handleSubtract = () => {
    setCount(prevCount => prevCount - 1);
    onStatSubtract(stat,statType);
  };

  return (
    <label>
        <h3>{label}</h3>
    <div className="counter-container">
      <div className="counter-btn-substract">
      <button disabled={count<=0} onClick={handleSubtract} className="btn-subtract">-</button>
      </div>  
        <input type="text" value={count} className="counter-input" readOnly />
      <div className="counter-btn-add">
      <button onClick={() => handleAdd(1)} className="btn-add">+{label=="Points"?"1":""}</button>
      {label == "Points" && (<>
        <br/><br/>
      <button onClick={() => handleAdd(2)} className="btn-add">+2</button><br/><br/>
      <button onClick={() => handleAdd(3)} className="btn-add">+3</button>
      </>)}
      </div>
    </div>
    <hr/><hr/>
    </label>
  );
};