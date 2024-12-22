// src/models/PhotoshopFileMetadata.ts

import { PhotoshopLayer } from "./PhotoshopLayer";

export interface PhotoshopFileMetadata {
  thumbnailUrl: string;
  layers: PhotoshopLayer[];
}
