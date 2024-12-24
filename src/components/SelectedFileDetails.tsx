import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import "./Components.css";
import ImageView from "./ImageView";
import TextButton from "./TextButton";

type SelectedFileDetailsProps = {
  file: PhotoshopFileInfo;
};

const SelectedFileDetails: React.FC<SelectedFileDetailsProps> = ({ file }) => {
  return (
    <div className="simple-container" style={{ flex: 1 }}>
      <ImageView imageUrl={file.metadata?.thumbnailUrl} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Placeholder</div>
          <div>Placeholder 2</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <TextButton
            text={"Delete"}
            onClick={async () => {}}
            ariaLabel="Delete file button"
            bgColor={"var(--danger)"}
            fullWidth={false}
            textColor={"var(--white)"}
            extraVerticalPadding={0.5}
          />
          <TextButton
            text={"New version"}
            onClick={async () => {}}
            ariaLabel="Upload new version button"
            bgColor={"var(--purple)"}
            fullWidth={false}
            textColor={"var(--white)"}
          />
        </div>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        {file.name}
      </div>
    </div>
  );
};

export default SelectedFileDetails;
