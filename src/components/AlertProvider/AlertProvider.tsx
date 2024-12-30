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
  const [resolver, setResolver] = useState<
    ((value: string | null) => void) | null
  >(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (
    message: string,
    ...buttonLabels: string[]
  ): Promise<string | null> => {
    return new Promise<string | null>((resolve) => {
      const buttons =
        buttonLabels.length > 0
          ? buttonLabels.map((label) => ({ label, value: label }))
          : [{ label: "Ok", value: "Ok" }];

      setAlertOptions({
        message,
        buttons,
      });
      setVisible(true);
      setResolver(() => resolve);
    });
  };

  const handleButtonClick = (value: string) => {
    if (resolver) {
      resolver(value);
      dismissAlert();
    }
  };

  const handleBackgroundClick = () => {
    if (resolver) {
      resolver(null);
      dismissAlert();
    }
  };

  const dismissAlert = () => {
    setVisible(false);
    setTimeout(() => {
      setAlertOptions(null);
      setResolver(null);
    }, 300); // Match this duration with the CSS transition
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {/* Blurred background */}
      <div
        className={`background-blur ${
          visible ? "background-blur-visible" : ""
        }`}
        onClick={handleBackgroundClick} // Dismiss alert on background click
      ></div>
      {children}
      {alertOptions && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: Color.Depth20,
            zIndex: 1001,
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing the alert
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
