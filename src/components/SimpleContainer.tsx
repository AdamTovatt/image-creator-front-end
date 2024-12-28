import "../index.css";

interface SimpleContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const SimpleContainer: React.FC<SimpleContainerProps> = ({
  children,
  style,
}) => {
  return (
    <div className="simple-container" style={style}>
      {children}
    </div>
  );
};

export default SimpleContainer;
