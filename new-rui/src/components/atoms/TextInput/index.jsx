import React from "react";

const TextInput = ({
  type = "text",
  placeholder,
  value,
  id,
  onChange,
  onBlur,
  className,
  name,
  disabled,
  required,
  accept,
  error,
  readOnly,
  label
}) => {
  return (
    <div className={`w-ful`}>
      {
        label?
        <label className="inputLabel" htmlFor={name}>
        {placeholder}
      </label>:null
      }
      
      <div className="relative">
        <input
          type={ type || "text"}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          className={`inputField mt1 ${error ? "border-red-500" : ""} ${className}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          accept={accept}
          readOnly={readOnly}
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default TextInput;
