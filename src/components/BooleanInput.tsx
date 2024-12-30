import React, { useState } from "react";
import { Check } from "react-feather";

interface BooleanInputProps {
  name: string;
  initialValue: boolean;
  onChange: (value: boolean) => void;
  edgeLength?: number;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
  name,
  initialValue,
  onChange,
  edgeLength,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <div>{name}</div>
      <div
        className="input-element"
        style={{
          width: edgeLength ? `${edgeLength}rem` : "1rem",
          height: edgeLength ? `${edgeLength}rem` : "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        title={name}
        onClick={handleChange}
      >
        <div style={{ padding: "0.25rem", display: "flex" }}>
          {value ? <Check /> : null}
        </div>
      </div>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        style={{ display: "none" }}
        aria-label={name}
      />
    </div>
  );
};

export default BooleanInput;
