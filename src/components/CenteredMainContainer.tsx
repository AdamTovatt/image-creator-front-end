import "../index.css";

interface CenteredMainContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CenteredMainContainer: React.FC<CenteredMainContainerProps> = ({
  children,
  style,
}) => {
  return (
    <div
      className="flex-container"
      style={{
        margin: "3rem",
        justifyContent: "center",
        height: "calc(100vh - 6rem)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CenteredMainContainer;
