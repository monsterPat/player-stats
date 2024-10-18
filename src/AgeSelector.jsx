import React, { useState } from 'react';
import clsx from "clsx";

const IntegerSelector = (props) => {
    const { className, placeholder, required, type = "text", options, initialValue, ...rest } = props;
    const classNames = clsx({ input: true }, className);

    const [value, setValue] = useState(1);

    const handleChange = (event) => {
        setValue(Number(event.target.value));
    };

    return (
        <label className="label">
        {placeholder}
        {required && <span className="input-required">*</span>}
            <div>
                <select
                    id="age-selector"
                    value={initialValue}
                    type={type}
                    placeholder={placeholder}
                    className={classNames}
                    {...rest}
                >
                    {[...Array(100).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                        {num + 1}
                    </option>
                    ))}
                </select>
            </div>
        </label>
    );
};

export default IntegerSelector;