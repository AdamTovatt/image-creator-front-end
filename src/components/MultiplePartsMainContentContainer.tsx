import "../index.css";

interface MultiplePartsMainContentContainer {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CenteredMainContainer: React.FC<MultiplePartsMainContentContainer> = ({
  children,
  style,
}) => {
  return (
    <div className="flex-container full-size-horizontal-list" style={style}>
      {children}
    </div>
  );
};

export default CenteredMainContainer;
