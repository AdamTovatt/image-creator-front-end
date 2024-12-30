import React, { useState, ReactNode } from "react";
import { AlertContext } from "./AlertContext";
import { Color } from "../../constants/Color";
import TextButton from "../TextButton";

interface AlertButton {
  label: string;
  value: string;
}

interface AlertOptions {
  message: string;
  buttons: AlertButton[];
}

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);
  const [resolver, setResolver] = useState<((value: string) => void) | null>(
    null
  );

  const showAlert = (
    message: string,
    ...buttonLabels: string[]
  ): Promise<string> => {
    return new Promise<string>((resolve) => {
      setAlertOptions({
        message,
        buttons: buttonLabels.map((label) => ({ label, value: label })),
      });
      setResolver(() => resolve);
    });
  };

  const handleButtonClick = (value: string) => {
    if (resolver) {
      resolver(value);
      setAlertOptions(null);
      setResolver(null);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertOptions && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: Color.Depth20,
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>{alertOptions.message}</div>
          <div
            className="flex-container horizontal-equal-spacing-flex"
            style={{ marginTop: "1rem" }}
          >
            {alertOptions.buttons.map((button, index) => (
              <TextButton
                fullWidth={true}
                bgColor={Color.Purple}
                key={index}
                text={button.label}
                onClick={async () => handleButtonClick(button.value)}
              />
            ))}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
