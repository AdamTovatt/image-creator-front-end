import { ImageOptions } from "./ImageOptions";

export interface EditableExportParameters {
  fileName: string;
  textOptions: Record<string, string>;
  imageOptions: Record<string, ImageOptions>;
  files: File[]; // List of chosen files
}
