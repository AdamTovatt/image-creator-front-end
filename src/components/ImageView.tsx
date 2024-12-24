interface ImageViewProps {
  imageUrl?: string;
}

const ImageView: React.FC<ImageViewProps> = ({ imageUrl }) => {
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
          <img src={imageUrl} style={{ width: "100%" }} />
        ) : (
          <div>No image available</div>
        )}
      </div>
    </div>
  );
};

export default ImageView;
