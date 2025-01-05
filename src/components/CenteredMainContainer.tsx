import "../index.css";

interface CenteredMainContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  margin?: number;
}

const CenteredMainContainer: React.FC<CenteredMainContainerProps> = ({
  children,
  style,
  margin = 3,
}) => {
  return (
    <div
      className="flex-container"
      style={{
        margin: `${margin}rem`,
        justifyContent: "center",
        height: `calc(100vh - ${margin * 2}rem)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CenteredMainContainer;
