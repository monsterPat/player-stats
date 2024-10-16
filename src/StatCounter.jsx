import { useState } from 'react';
import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function Counter({label}){
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleSubtract = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <label>
        <h2>{label}</h2>
    <div className="counter">
      <Button onClick={handleSubtract}>-</Button>
      <Input type="text" value={count} readOnly />
      <Button onClick={handleAdd}>+</Button>
    </div>
    </label>
  );
};