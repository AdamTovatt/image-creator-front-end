// src/pages/PsdFilesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo"; // Import the PhotoshopFileInfo type
import PsdFileListView from "../components/PsdFileListView"; // Import the list view component
import TokenHelper from "../helpers/TokenHelper"; // Import TokenHelper
import "./PsdFilesPage.css";
import SelectedFileDetails from "../components/SelectedFileDetails";

const PsdFilesPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PhotoshopFileInfo | null>(
    null
  ); // Correct typing for selected file
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Check if the user is logged in
  useEffect(() => {
    const token = TokenHelper.getToken(); // Get the token from localStorage using TokenHelper

    if (!token) {
      navigate("/"); // Redirect to login page if no token exists
    }
  }, [navigate]);

  const handleFileSelect = (file: PhotoshopFileInfo) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <div className="main-container">
        <div className="parts-container">
          <PsdFileListView
            selectedFile={selectedFile}
            onSelect={handleFileSelect}
          />
          <div className="spacer"></div>
          {selectedFile ? (
            <SelectedFileDetails
              file={selectedFile}
              closeRequested={async () => {
                setSelectedFile(null);
              }}
            />
          ) : (
            <div className="no-file-selected-outer">
              <div className="no-file-selected-inner">No file selected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsdFilesPage;
