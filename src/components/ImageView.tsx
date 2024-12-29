import { BounceLoader } from "react-spinners";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import CircleButton from "./CircleButton";
import { Color } from "../constants/Color";
import { useEffect, useRef, useState } from "react";

interface ImageViewProps {
  imageUrl?: string;
  loading?: boolean;
  onRefreshRequested?: () => Promise<void>;
}

interface TiledLoaderProps {
  color: Color;
  opacity: number;
  tileCount: number;
  backgroundImageUrl?: string;
}

const TiledLoader: React.FC<TiledLoaderProps> = ({
  color,
  tileCount,
  opacity,
  backgroundImageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(0);

  useEffect(() => {
    const calculateTileSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setTileSize(containerWidth / tileCount - 5); // Adjust the subtraction for gap
      }
    };

    calculateTileSize(); // Initial calculation

    const handleResize = () => {
      calculateTileSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tileCount]);

  return (
    <div
      ref={containerRef}
      style={{
        padding: "0.1rem",
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "space-between",
        gap: "0.25rem",
        opacity: opacity,
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : undefined,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {Array.from({ length: tileCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {Array.from({ length: tileCount }).map((_, colIndex) => (
            <BounceLoader
              key={`${rowIndex}-${colIndex}`}
              size={tileSize}
              color={color}
              speedMultiplier={0.8}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const ImageView: React.FC<ImageViewProps> = ({
  imageUrl,
  loading,
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
        overflow: "hidden",
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
        {loading ? (
          <TiledLoader
            color={Color.White}
            tileCount={4}
            opacity={0.2}
            backgroundImageUrl={imageUrl}
          />
        ) : (
          <>
            {imageUrl ? (
              <img
                src={imageUrl}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
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
          </>
        )}
      </div>
    </div>
  );
};

export default ImageView;
