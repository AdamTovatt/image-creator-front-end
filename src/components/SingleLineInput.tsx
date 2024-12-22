import React from "react";
import "./SingleLineInput.css";

interface SingleLineInputProps {
  type?: string; // Input type (default is "text")
  value: string; // Current value of the input
  onChange: (value: string) => void; // Function to handle value changes
  placeholder?: string; // Placeholder text
  button?: React.ReactNode; // Optional button component
}

const SingleLineInput: React.FC<SingleLineInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "Enter text...",
  button,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="single-line-input-container">
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="single-line-input"
      />
      {button && button}
    </div>
  );
};

export default SingleLineInput;
