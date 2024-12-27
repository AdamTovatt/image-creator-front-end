import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import CircleButton from "./CircleButton";

interface ImageViewProps {
  imageUrl?: string;
  onRefreshRequested?: () => Promise<void>;
}

const ImageView: React.FC<ImageViewProps> = ({
  imageUrl,
  onRefreshRequested,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingTop: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          position: "absolute", // Keep content inside the aspect-ratio container
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} style={{ maxWidth: "100%", maxHeight: "100%" }} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>No image available</div>
            {onRefreshRequested ? (
              <CircleButton
                icon={CircleButtonIcon.Refresh}
                onClick={onRefreshRequested}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageView;
