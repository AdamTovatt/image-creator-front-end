import React, { useState, ReactNode } from "react";
import { Color } from "../constants/Color";
import { FileUploader } from "./FileUploader";

interface UploadFileDialogContextType {
  getFileFromUser: () => Promise<File | null>;
}

const UploadFileDialogContext = React.createContext<
  UploadFileDialogContextType | undefined
>(undefined);

interface UploadFileDialogProviderProps {
  children: ReactNode;
}

export const UploadFileDialogProvider: React.FC<
  UploadFileDialogProviderProps
> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [resolver, setResolver] = useState<
    ((file: File | null) => void) | null
  >(null);

  const getFileFromUser = (): Promise<File | null> => {
    return new Promise<File | null>((resolve) => {
      setVisible(true);
      setResolver(() => resolve);
    });
  };

  const handleFileSelect = (file: File | null) => {
    if (resolver) {
      resolver(file);
      setVisible(false);
      setResolver(null);
    }
  };

  const handleBackgroundClick = () => {
    handleFileSelect(null); // Dismiss the dialog and resolve with null
  };

  return (
    <UploadFileDialogContext.Provider value={{ getFileFromUser }}>
      <div
        className={`background-blur ${
          visible ? "background-blur-visible" : ""
        }`}
        onClick={handleBackgroundClick}
      ></div>
      {children}
      {visible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: Color.Depth10,
            zIndex: 1001,
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dialog from closing it
        >
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Choose a file
          </div>
          <FileUploader handleFile={handleFileSelect} />
        </div>
      )}
    </UploadFileDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUploadFileDialog = (): UploadFileDialogContextType => {
  const context = React.useContext(UploadFileDialogContext);
  if (!context) {
    throw new Error(
      "useUploadFileDialog must be used within an UploadFileDialogProvider"
    );
  }
  return context;
};
