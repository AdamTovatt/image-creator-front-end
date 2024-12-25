import { useNavigate } from "react-router-dom";
import { createMetadata } from "../api/PsdApi";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import { Color } from "../constants/Color";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import CircleButton from "./CircleButton";
import "./Components.css";
import ImageView from "./ImageView";
import TextButton from "./TextButton";

type SelectedFileDetailsProps = {
  file: PhotoshopFileInfo;
};

const SelectedFileDetails: React.FC<SelectedFileDetailsProps> = ({ file }) => {
  const navigate = useNavigate();

  const handleCreateMetadata = async () => {
    if (file.name) {
      const createMetadataResponse = await createMetadata(file.name, false);

      if (createMetadataResponse.statusCode == 401) navigate("/");

      if (createMetadataResponse.success) {
        navigate(0);
        alert("New metadata was generated, reload the page to see it.");
      }
    }
  };

  return (
    <div className="simple-container" style={{ flex: 1 }}>
      <ImageView
        imageUrl={file.metadata?.thumbnailUrl}
        onRefreshRequested={handleCreateMetadata}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
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
              justifyContent: "flex-end",
              gap: "0.75rem",
            }}
          >
            <CircleButton
              onClick={async () => {}}
              ariaLabel="Delete file"
              icon={CircleButtonIcon.Trash}
              backgroundColor={Color.Depth20}
            />
            <CircleButton
              onClick={async () => {}}
              ariaLabel="Update file"
              icon={CircleButtonIcon.Upload}
              backgroundColor={Color.Depth20}
            />
            <CircleButton
              onClick={handleCreateMetadata}
              ariaLabel="Regenerate metadata"
              icon={CircleButtonIcon.Refresh}
              backgroundColor={Color.Depth20}
            />
            <CircleButton
              onClick={async () => {}}
              ariaLabel="Download file"
              icon={CircleButtonIcon.Download}
              backgroundColor={Color.Depth20}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <div>{file.name}</div>
          <TextButton
            text="Use this"
            onClick={async () => {}}
            bgColor="var(--purple)"
            fullWidth={true}
          />
        </div>
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
