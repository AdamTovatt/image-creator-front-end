import "../index.css";

interface MultiplePartsMainContentContainer {
  children?: React.ReactNode;
}

const CenteredMainContainer: React.FC<MultiplePartsMainContentContainer> = ({
  children,
}) => {
  return (
    <div className="flex-container full-size-horizontal-list">{children}</div>
  );
};

export default CenteredMainContainer;
