import { useState } from "react";
import { PhotoshopFileMetadata } from "../models/PhotoshopFileMetadata";
import PsdLayersListItem from "./PsdLayersListItem";
import SimpleContainer from "./SimpleContainer";
import { EditableExportParameters } from "../models/EditableExportParameters";

interface PsdLayersListProps {
  fileMetadata: PhotoshopFileMetadata;
  fileName: string;
  onExportParametersChange: (parameters: EditableExportParameters) => void;
}

const PsdLayersList: React.FC<PsdLayersListProps> = ({
  fileMetadata,
  fileName,
  onExportParametersChange,
}) => {
  const [exportParameters, setExportParameters] =
    useState<EditableExportParameters>({
      fileName: fileName,
      textOptions: {},
      imageOptions: {},
      files: [],
    });

  const handleLayerUpdate = (
    updatedLayer: PhotoshopFileMetadata["layers"][0],
    imageFile?: File
  ) => {
    const updatedTextOptions = { ...exportParameters.textOptions };
    const updatedImageOptions = { ...exportParameters.imageOptions };
    const updatedFiles = [...exportParameters.files];

    // Update text or image options based on layer type
    if (updatedLayer.isTextLayer && updatedLayer.textContent) {
      updatedTextOptions[updatedLayer.layerName] = updatedLayer.textContent;
    } else if (updatedLayer.isTextLayer) {
      delete updatedTextOptions[updatedLayer.layerName];
    }

    if (updatedLayer.isImageLayer && imageFile) {
      updatedImageOptions[updatedLayer.layerName] = {
        fileName: imageFile.name,
        mirror: false,
        shiftX: 0,
        shiftY: 0,
      };
      updatedFiles.push(imageFile);
    } else if (updatedLayer.isImageLayer) {
      delete updatedImageOptions[updatedLayer.layerName];
    }

    const newExportParameters: EditableExportParameters = {
      ...exportParameters,
      textOptions: updatedTextOptions,
      imageOptions: updatedImageOptions,
      files: updatedFiles,
    };

    setExportParameters(newExportParameters);
    onExportParametersChange(newExportParameters); // Notify parent of changes
  };

  const renderLayers = (layers: PhotoshopFileMetadata["layers"]) =>
    layers.map((layer, index) => (
      <PsdLayersListItem
        key={index}
        layerData={layer}
        onUpdateLayer={handleLayerUpdate}
      />
    ));

  return (
    <SimpleContainer style={{ width: "45%" }}>
      <div style={{ fontSize: "0.875rem" }}>Recommended for change:</div>
      {renderLayers(
        fileMetadata.layers.filter((layer) => layer.isRecommendedForChanging)
      )}
      <div style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
        Other layers:
      </div>
      {renderLayers(
        fileMetadata.layers.filter((layer) => !layer.isRecommendedForChanging)
      )}
    </SimpleContainer>
  );
};

export default PsdLayersList;
