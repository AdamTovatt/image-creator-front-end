import React, { useState, useEffect } from "react";
import PsdFileListItem from "./PsdFileListItem";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import { listPsdFiles } from "../api/PsdApi"; // Assuming you have this API function
import "./Components.css";
import { useNavigate } from "react-router-dom";
import SimpleContainer from "./SimpleContainer";

interface PsdFileListViewProps {
  onSelect: (file: PhotoshopFileInfo) => void; // Callback to handle selection
  selectedFile: PhotoshopFileInfo | null; // Add selectedFile prop
}

const PsdFileListView: React.FC<PsdFileListViewProps> = ({
  onSelect,
  selectedFile, // Receive selectedFile prop
}) => {
  const [psdFiles, setPsdFiles] = useState<PhotoshopFileInfo[]>([]);
  const [internalSelectedFile, setInternalSelectedFile] =
    useState<PhotoshopFileInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInternalSelectedFile(selectedFile); // Sync internal state with selectedFile prop
  }, [selectedFile]);

  useEffect(() => {
    const fetchPsdFiles = async () => {
      try {
        const response = await listPsdFiles();
        if (response.success) {
          setPsdFiles(response.data!);
        } else {
          if (response.statusCode === 401) {
            navigate("/");
          } else if (response.error) {
            setError("Failed to load PSD files: " + response.error);
          } else {
            setError(
              "Failed to load PSD files: " + response.axiosError?.message
            );
          }
        }
      } catch (error) {
        setError("An error occurred while fetching the PSD files." + error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsdFiles();
  }, [navigate]);

  const handleItemClick = (file: PhotoshopFileInfo) => {
    setInternalSelectedFile(file); // Set internal state
    onSelect(file); // Notify parent of the selected file
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <SimpleContainer style={{ width: "45%" }}>
      {psdFiles.map((file) => (
        <PsdFileListItem
          key={file.name}
          file={file}
          isSelected={file === internalSelectedFile}
          onClick={() => handleItemClick(file)}
        />
      ))}
    </SimpleContainer>
  );
};

export default PsdFileListView;
