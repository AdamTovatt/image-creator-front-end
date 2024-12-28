import { useParams } from "react-router-dom";

const ExportPage: React.FC = () => {
  const { fileName } = useParams<{ fileName: string }>();

  return <div>{fileName}</div>;
};

export default ExportPage;
