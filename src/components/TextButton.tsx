import React, { useState } from "react";
import "./TextButton.css";
import { MoonLoader } from "react-spinners";

interface TextButtonProps {
  text: string; // Button text
  onClick: () => Promise<void>; // Function to handle click (async for loading spinner)
  bgColor?: string; // Background color (CSS variable or hex)
  textColor?: string; // Text color (CSS variable or hex)
  fullWidth?: boolean; // Whether the button should fill its container
  ariaLabel?: string; // Accessibility label
  extraVerticalPadding?: number; // The extra height in rem
  style?: React.CSSProperties;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  bgColor = "var(--depth10)", // Default background color
  textColor = "var(--white)", // Default text color
  fullWidth = false, // Default is not full width
  ariaLabel = "Text button",
  extraVerticalPadding: extraVerticalPadding = 0,
  style,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return; // Prevent multiple clicks while loading
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`text-button ${fullWidth ? "full-width" : ""}`}
      style={{ backgroundColor: bgColor, color: textColor, ...style }}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={loading} // Disable while loading
    >
      <div
        style={{
          paddingTop: extraVerticalPadding ? extraVerticalPadding + "rem" : 0,
          paddingBottom: extraVerticalPadding
            ? extraVerticalPadding + "rem"
            : 0,
        }}
      >
        {loading ? (
          <span className="spinner">
            <MoonLoader size={15} color="white" />
          </span>
        ) : (
          text
        )}
      </div>
    </button>
  );
};

export default TextButton;
