import React from "react";
import "./RadioButton.css";

const RadioButton = ({name, id, value, label}) => {
    return (
        <label className="container">
            {label}
            <input name={name} id={id} value={value} type="radio"/>
            <span className="custom"></span>
        </label>
    )
};


export default RadioButton;