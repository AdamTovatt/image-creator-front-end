import { PhotoshopFileMetadata } from "../models/PhotoshopFileMetadata";
import PsdLayersListItem from "./PsdLayersListItem";

interface PsdLayersListProps {
  fileMetadata: PhotoshopFileMetadata;
}

const PsdLayersList: React.FC<PsdLayersListProps> = ({ fileMetadata }) => {
  return (
    <div className="simple-container">
      {fileMetadata.layers.map((layer, index) => (
        <PsdLayersListItem key={index} layerData={layer} />
      ))}
    </div>
  );
};

export default PsdLayersList;
