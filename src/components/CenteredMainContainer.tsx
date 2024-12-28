import "../index.css";

interface CenteredMainContainerProps {
  children?: React.ReactNode;
}

const CenteredMainContainer: React.FC<CenteredMainContainerProps> = ({
  children,
}) => {
  return (
    <div
      className="flex-container"
      style={{
        margin: "3rem",
        justifyContent: "center",
        height: "calc(100vh - 6rem)",
      }}
    >
      {children}
    </div>
  );
};

export default CenteredMainContainer;
