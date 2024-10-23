import clsx from "clsx";
import {useState} from "react";
import { MultiSelect } from "react-multi-select-component";

export default function MultiSelect2(props){
  const { className, placeholder, required, type = "text", onChange, options, value, ...rest } = props;
  const classNames = clsx({ input: true }, className);
  
  function handleOnChange(output){
    onChange(output);
  }
  
    return (
      <label className="label">
        {placeholder}
        {required && <span className="input-required">*</span>}
        <div className={classNames}>
        <MultiSelect 
          options={options}
          value={value}
          className={classNames}
          onChange={handleOnChange}
          labelledBy="Select"/ >

        </div>
      </label>
    );
  };