// src/models/PhotoshopFileInfo.ts

import { PhotoshopFileMetadata } from "./PhotoshopFileMetadata";

export interface PhotoshopFileInfo {
  name: string;
  metadata?: PhotoshopFileMetadata;
}
