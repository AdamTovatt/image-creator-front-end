import { PhotoshopFileMetadata } from "../models/PhotoshopFileMetadata";
import PsdLayersListItem from "./PsdLayersListItem";
import SimpleContainer from "./SimpleContainer";

interface PsdLayersListProps {
  fileMetadata: PhotoshopFileMetadata;
}

const PsdLayersList: React.FC<PsdLayersListProps> = ({ fileMetadata }) => {
  const recommendedLayers = fileMetadata.layers.filter(
    (layer) => layer.isRecommendedForChanging
  );
  const otherLayers = fileMetadata.layers.filter(
    (layer) => !layer.isRecommendedForChanging
  );

  const renderLayers = (layers: typeof fileMetadata.layers) =>
    layers.map((layer, index) => (
      <PsdLayersListItem key={index} layerData={layer} />
    ));

  return (
    <SimpleContainer style={{ width: "45%" }}>
      <div style={{ fontSize: "0.875rem" }}>Recommended for change:</div>
      {renderLayers(recommendedLayers)}
      <div style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
        Other layers:
      </div>
      {renderLayers(otherLayers)}
    </SimpleContainer>
  );
};

export default PsdLayersList;
