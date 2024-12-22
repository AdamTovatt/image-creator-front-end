import React from "react";
import "./InfoBox.css";
import TextButton from "./TextButton";

interface InfoBoxProps {
  text: string; // The message to display inside the InfoBox
  onClose: () => void; // Function to handle "Ok" button click
}

const InfoBox: React.FC<InfoBoxProps> = ({ text, onClose }) => {
  return (
    <div className="info-box">
      <p className="info-box-text">{text}</p>
      <TextButton
        text="Ok"
        onClick={async () => onClose()} // Wrap in async to use spinner
        bgColor="var(--depth1)" // Example background color
        textColor="var(--white)" // Example text color
        fullWidth={true} // Example full width
      />
    </div>
  );
};

export default InfoBox;
