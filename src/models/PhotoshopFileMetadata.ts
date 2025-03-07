// src/models/PhotoshopFileMetadata.ts

import { PhotoshopLayer } from "./PhotoshopLayer";

export interface PhotoshopFileMetadata {
  thumbnailUrl: string;
  previewUrl: string;
  layers: PhotoshopLayer[];
  width: number;
  height: number;
  fileSize: number;
}
