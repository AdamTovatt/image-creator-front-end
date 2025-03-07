import { useNavigate } from "react-router-dom";
import {
  createMetadata,
  deletePsdFile,
  downloadPsdFile,
  updatePsdFile,
} from "../api/PsdApi";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import { Color } from "../constants/Color";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import CircleButton from "./CircleButton";
import "./Components.css";
import ImageView, { LoaderType } from "./ImageView";
import TextButton from "./TextButton";
import React from "react";
import { useAlert } from "./AlertProvider/UseAlert";
import { useUploadFileDialog } from "./UploadFileDialog";
import { getMessageFromResponse } from "../models/ApiResponse";
import useIsMobile from "../helpers/UseIsMobile";

type SelectedFileDetailsProps = {
  file: PhotoshopFileInfo;
  closeRequested: () => Promise<void>;
};

type FileHeaderAndButtonsProps = {
  file: PhotoshopFileInfo;
  onRefreshRequested: () => Promise<void>;
  isMobile: boolean;
};

type BottomButtonProps = {
  file: PhotoshopFileInfo;
  closeRequested: () => Promise<void>;
};

const BottomButton: React.FC<BottomButtonProps> = ({
  file,
  closeRequested,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "0.5rem", lineBreak: "anywhere" }}>
        {file.name}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <TextButton
          text="Close"
          onClick={closeRequested}
          ariaLabel="Close file details"
          extraVerticalPadding={0.5}
          fullWidth={true}
        />
        <TextButton
          text="Use this"
          onClick={async () => {
            navigate("/export/" + file.name);
          }}
          bgColor={Color.Purple}
          fullWidth={true}
          extraVerticalPadding={0.5}
        />
      </div>
    </div>
  );
};

const FileHeaderAndButtons: React.FC<FileHeaderAndButtonsProps> = ({
  file,
  onRefreshRequested,
  isMobile,
}) => {
  const { showAlert } = useAlert();
  const { getFileFromUser } = useUploadFileDialog();

  const handleDownload = async (fileName: string) => {
    try {
      const response = await downloadPsdFile(fileName);
      if (response.success) {
        const blob = new Blob([response.data!], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        if (response.error)
          await showAlert(`Failed to download file: ${response.error.message}`);
        else if (response.axiosError)
          await showAlert(
            `Failed to download file: ${response.axiosError.message}`
          );
      }
    } catch (error) {
      console.log("Error downloading file:" + error);
      console.log(error);
      await showAlert("An error occurred while downloading the file.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
          {GetDocumentSizeText(file)}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            opacity: 0.6,
            marginTop: "0.2rem",
          }}
        >
          {GetLayerInfoText(file)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: isMobile ? "1rem" : 0,
          justifyContent: isMobile ? "space-evenly" : "flex-end",
          gap: "0.75rem",
        }}
      >
        <CircleButton
          onClick={async () => {
            const response = await showAlert(
              `Are you sure you want to delete ${file.name}? This can not be undone.`,
              "Yes",
              "No"
            );

            if (response === "Yes") {
              const deleteResponse = await deletePsdFile(file.name);

              let messageToShow = null;
              if (deleteResponse.data?.message)
                messageToShow = deleteResponse.data?.message;
              else if (deleteResponse.error?.message)
                messageToShow = deleteResponse.error?.message;
              else if (deleteResponse.axiosError?.message)
                messageToShow = deleteResponse.axiosError?.message;

              if (messageToShow) await showAlert(messageToShow, "Ok");
            }
          }}
          ariaLabel="Delete file"
          icon={CircleButtonIcon.Trash}
          backgroundColor={Color.Depth20}
        />
        <CircleButton
          onClick={async () => {
            const file = await getFileFromUser();

            if (file) {
              const uploadResponse = await updatePsdFile(file);
              const message = getMessageFromResponse(uploadResponse);

              await showAlert(message);
            }
          }}
          ariaLabel="Update file"
          icon={CircleButtonIcon.Upload}
          backgroundColor={Color.Depth20}
        />
        <CircleButton
          onClick={onRefreshRequested}
          ariaLabel="Regenerate metadata"
          icon={CircleButtonIcon.Refresh}
          backgroundColor={Color.Depth20}
        />
        <CircleButton
          onClick={() => handleDownload(file.name)}
          ariaLabel="Download file"
          icon={CircleButtonIcon.Download}
          backgroundColor={Color.Depth20}
        />
      </div>
    </div>
  );
};

const SelectedFileDetails: React.FC<SelectedFileDetailsProps> = ({
  file,
  closeRequested,
}) => {
  const navigate = useNavigate();
  const createMetadataInBackground = true;
  const isMobile = useIsMobile();

  const handleCreateMetadata = async () => {
    if (file.name) {
      const createMetadataResponse = await createMetadata(
        file.name,
        createMetadataInBackground
      );

      if (createMetadataResponse.statusCode == 401) navigate("/");

      if (createMetadataResponse.success) {
        if (createMetadataInBackground)
          alert(
            "Generation of new metadata was queued, generation might take a while (around a minute) but it should be visible when updating the page after that."
          );
        else {
          navigate(0);
          alert("New metadata was generated, reload the page to see it.");
        }
      } else {
        if (createMetadataResponse.axiosError)
          alert(createMetadataResponse.axiosError.message);
        else alert(createMetadataResponse.error!.message);
      }
    }
  };

  return (
    <div className="simple-container" style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <ImageView
            imageUrl={file.metadata?.previewUrl}
            onRefreshRequested={handleCreateMetadata}
            loaderType={LoaderType.SquareLoader}
          />
          <FileHeaderAndButtons
            isMobile={isMobile}
            file={file}
            onRefreshRequested={handleCreateMetadata}
          />
        </div>
        <BottomButton file={file} closeRequested={closeRequested} />
      </div>
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

export default SelectedFileDetails;
