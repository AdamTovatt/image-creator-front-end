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
    // You can perform further actions with the selected file here, such as navigating
  };

  return (
    <div>
      <div className="main-container">
        <div className="files-container">
          <PsdFileListView onSelect={handleFileSelect} />
          <div className="spacer"></div>
          {selectedFile ? (
            <SelectedFileDetails file={selectedFile} />
          ) : (
            <div>No file selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsdFilesPage;
