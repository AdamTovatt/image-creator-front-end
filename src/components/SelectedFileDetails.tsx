import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import "./Components.css";

type SelectedFileDetailsProps = {
  file: PhotoshopFileInfo;
};

const SelectedFileDetails: React.FC<SelectedFileDetailsProps> = ({ file }) => {
  return (
    <div className="simple-container" style={{ flex: 1 }}>
      {file.name}
    </div>
  );
};

export default SelectedFileDetails;
