// src/components/PsdFileListItem.tsx
import React from "react";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import "./PsdFileListItem.css"; // Assuming you want custom styling

interface PsdFileListItemProps {
  file: PhotoshopFileInfo;
  isSelected: boolean;
  onClick: () => void; // Callback for when the item is clicked
}

const PsdFileListItem: React.FC<PsdFileListItemProps> = ({
  file,
  isSelected,
  onClick,
}) => {
  const { name, metadata } = file;
  return (
    <div
      className={`psd-file-list-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="text-part">
        <div>{name}</div>
        <div className="text-part-end">
          <div style={{ opacity: 0.7 }}>{GetDocumentSizeText(file)}</div>
          <div style={{ opacity: 0.5, fontSize: "0.75rem" }}>
            {GetLayerInfoText(file)}
          </div>
        </div>
      </div>
      {metadata && (
        <img
          src={metadata.thumbnailUrl}
          alt="Thumbnail"
          style={{ maxWidth: 64, borderRadius: "6px" }}
        />
      )}
    </div>
  );
};

const GetDocumentSizeText = (file: PhotoshopFileInfo): string => {
  if (!file.metadata) return "Missing metadata";

  const megabytes = file.metadata.fileSize / 1000000;

  return `${file.metadata.width}x${
    file.metadata.height
  } px (${megabytes.toFixed(megabytes < 10 ? 1 : 0)} MB)`;
};

const GetLayerInfoText = (file: PhotoshopFileInfo): string => {
  if (!file.metadata) return "Missing metadata";
  const textLayers = file.metadata?.layers.filter(
    (x) => x.isTextLayer && x.isRecommendedForChanging
  ).length;
  const imageLayers = file.metadata?.layers.filter(
    (x) => x.isImageLayer && x.isRecommendedForChanging
  ).length;
  return `${textLayers} texts & ${imageLayers} images recommended for change`;
};

export default PsdFileListItem;
