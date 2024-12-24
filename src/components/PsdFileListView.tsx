// src/components/PsdFileListView.tsx
import React, { useState, useEffect } from "react";
import PsdFileListItem from "./PsdFileListItem";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import { listPsdFiles } from "../api/PsdApi"; // Assuming you have this API function
import "./Components.css";

interface PsdFileListViewProps {
  onSelect: (file: PhotoshopFileInfo) => void; // Callback to handle selection
}

const PsdFileListView: React.FC<PsdFileListViewProps> = ({ onSelect }) => {
  const [psdFiles, setPsdFiles] = useState<PhotoshopFileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<PhotoshopFileInfo | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPsdFiles = async () => {
      try {
        const response = await listPsdFiles();
        if (response.data) {
          setPsdFiles(response.data);
        } else {
          setError("Failed to load PSD files.");
        }
      } catch (error) {
        setError("An error occurred while fetching the PSD files." + error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsdFiles();
  }, []);

  const handleItemClick = (file: PhotoshopFileInfo) => {
    setSelectedFile(file); // Set selected file
    onSelect(file); // Notify parent of the selected file
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="simple-container" style={{ width: "45%" }}>
      {psdFiles.map((file) => (
        <PsdFileListItem
          key={file.name}
          file={file}
          isSelected={file === selectedFile}
          onClick={() => handleItemClick(file)}
        />
      ))}
    </div>
  );
};

export default PsdFileListView;
