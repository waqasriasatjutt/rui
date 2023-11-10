const SelectInput = ({
  name,
  className,
  options,
  onChange,
  value,
  valueProp,
  labelProp,
  placeholder
}) => {
  return (
    <>
    <p>Qty</p>
    <select  name={name} className={className} onChange={onChange} value={value} placeholder={placeholder}>
      <option value={""} className="text-blue-100">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option[valueProp]}
        
        >
           {option[labelProp]}
        </option>
      ))}
    </select>
      </>
  );
};

export default SelectInput;
