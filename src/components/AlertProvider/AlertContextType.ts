export interface AlertContextType {
  showAlert: (message: string, ...buttonLabels: string[]) => Promise<string>;
}
