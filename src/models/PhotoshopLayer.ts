// src/models/PhotoshopLayer.ts

export interface PhotoshopLayer {
  layerName: string;
  isRecommendedForChanging: boolean;
  isTextLayer: boolean;
  isImageLayer: boolean;
  textContent?: string; // Text content is optional
}
