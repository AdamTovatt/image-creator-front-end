import React, { useState } from "react";

interface NumberInputProps {
  initialValue: number;
  externalValue?: number;
  style?: React.CSSProperties;
  maxWidth?: string;
  name: string;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  initialValue,
  externalValue,
  style,
  name,
  maxWidth,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ maxWidth: maxWidth ? maxWidth : "100%" }}>
      <div>{name}</div>
      <input
        title={name}
        aria-label={name}
        className="input-element"
        style={{ width: "100%", ...style }}
        type="number"
        value={externalValue ? externalValue : value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberInput;
