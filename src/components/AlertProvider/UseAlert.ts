import { useContext } from "react";
import { AlertContextType } from "./AlertContextType";
import { AlertContext } from "./AlertContext";

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
