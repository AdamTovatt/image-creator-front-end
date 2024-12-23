import React, { useState } from "react";
import "./SingleLineInput.css";
import CircleButton from "./CircleButton";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";

interface SingleLineInputProps {
  type?: string; // Input type (default is "text")
  value: string; // Current value of the input
  onChange: (value: string) => void; // Function to handle value changes
  onSubmit: () => Promise<void>;
  placeholder?: string; // Placeholder text
  buttonIcon?: CircleButtonIcon; // Enum value for the icon
  buttonAriaLabel?: string; // Accessibility label
}

const SingleLineInput: React.FC<SingleLineInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "Enter text...",
  onSubmit,
  buttonIcon,
  buttonAriaLabel,
}) => {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger submit when Enter key is pressed
    }
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple clicks while loading
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="single-line-input-container">
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="single-line-input"
      />
      <CircleButton
        onClick={handleSubmit}
        icon={buttonIcon}
        ariaLabel={buttonAriaLabel}
        externalLoadingState={loading}
        loadingStateHandledExternally={true}
      />
    </div>
  );
};

export default SingleLineInput;
