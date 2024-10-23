import clsx from "clsx";
import {useState} from "react";

export default function Dropdown(props){
    const { className, placeholder, required, type = "text", options, initialValue, ...rest } = props;
    const classNames = clsx({ input: true }, className);

  
    return (
    
    <label className="label">
      {placeholder}
      {required && <span className="input-required">*</span>}
      <div>
        <select 
            id={`${placeholder}-dropdown`}
            value={initialValue}
            type={type}
            placeholder={placeholder}
            className={classNames}
            required={required}
            {...rest}>
          <option value="">--{placeholder}--</option>
          {options.map((o) => {
            return <option key={`${placeholder}${o.value}`} value={o.value}>{o.name}</option>
          })}
        </select>
      </div>
    </label>
    );
  };