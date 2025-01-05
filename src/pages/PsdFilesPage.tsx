// src/pages/PsdFilesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo"; // Import the PhotoshopFileInfo type
import PsdFileListView from "../components/PsdFileListView"; // Import the list view component
import TokenHelper from "../helpers/TokenHelper"; // Import TokenHelper
import "./PsdFilesPage.css";
import SelectedFileDetails from "../components/SelectedFileDetails";
import CenteredMainContainer from "../components/CenteredMainContainer";
import MultiplePartsMainContentContainer from "../components/MultiplePartsMainContentContainer";
import useIsMobile from "../helpers/UseIsMobile";

const PsdFilesPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PhotoshopFileInfo | null>(
    null
  ); // Correct typing for selected file
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <CenteredMainContainer margin={0}>
        {selectedFile ? (
          <SelectedFileDetails
            file={selectedFile}
            closeRequested={async () => {
              setSelectedFile(null);
            }}
          />
        ) : (
          <PsdFileListView
            widthPercentage={100}
            selectedFile={selectedFile}
            onSelect={handleFileSelect}
          />
        )}
      </CenteredMainContainer>
    );
  } else {
    return (
      <CenteredMainContainer>
        <MultiplePartsMainContentContainer>
          <PsdFileListView
            widthPercentage={45}
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
        </MultiplePartsMainContentContainer>
      </CenteredMainContainer>
    );
  }
};

export default PsdFilesPage;
