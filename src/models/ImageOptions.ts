// src/models/ImageOptions.ts

export interface ImageOptions {
    fileName: string;
    mirror: boolean;
    shiftY: number;
    shiftX: number;
    // imageFile should be excluded, as it's not part of the JSON data
  }
  