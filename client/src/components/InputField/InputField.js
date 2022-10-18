import React from "react";

//styles
import "./styles.scss";

const InputField = ({
  field: { onChange, onBlur, name, value },
  form: { errors, touched },
  label,
  type = "text",
}) => {
  const errorMessage = errors[name];
  const errorExists = errorMessage && touched[name];
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${errorMessage && "input-field__error"}`}
      ></input>
      {errorExists && (
        <div className="input-field__error-msg">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
