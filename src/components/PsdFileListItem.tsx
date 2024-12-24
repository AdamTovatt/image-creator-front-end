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
      <div className="text-part">{name}</div>
      <div className="thumbnail-part">
        {metadata && <img src={metadata.thumbnailUrl} alt="Thumbnail" />}
      </div>
    </div>
  );
};

export default PsdFileListItem;
