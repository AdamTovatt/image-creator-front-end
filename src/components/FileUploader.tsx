import React, { useRef, useState } from "react";
import "./FileUploader.css";

interface FileUploaderProps {
  handleFile: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ handleFile }) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    setFileName(fileUploaded?.name ?? null);
    if (fileUploaded) {
      handleFile(fileUploaded);
    }
  };

  return (
    <>
      {fileName ? (
        <div style={{ marginBottom: "0.5rem" }}>{fileName}</div>
      ) : null}
      <button className="button-upload" onClick={handleClick}>
        Upload a file
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
      />
    </>
  );
};
