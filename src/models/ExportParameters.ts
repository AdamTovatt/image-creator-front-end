// src/models/ExportParameters.ts

import { ImageOptions } from "./ImageOptions";

export interface ExportParameters {
  fileName: string;
  textOptions: Record<string, string>; // Text options, as a key-value pair
  imageOptions?: Record<string, ImageOptions>; // Optional map for image options
}
