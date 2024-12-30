import { createContext } from "react";
import { AlertContextType } from "./AlertContextType";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
