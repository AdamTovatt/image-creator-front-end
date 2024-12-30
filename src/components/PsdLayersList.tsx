import { useState } from "react";
import { PhotoshopFileMetadata } from "../models/PhotoshopFileMetadata";
import PsdLayersListItem from "./PsdLayersListItem";
import SimpleContainer from "./SimpleContainer";
import { EditableExportParameters } from "../models/EditableExportParameters";
import { ImageExportProperties } from "../models/ImageExportProperties";

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
    imageFile?: File,
    imageExportProperties?: ImageExportProperties
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
      // Remove any existing file for this layer
      const existingFileIndex = updatedFiles.findIndex(
        (file) =>
          file.name === updatedImageOptions[updatedLayer.layerName]?.fileName
      );
      if (existingFileIndex !== -1) {
        updatedFiles.splice(existingFileIndex, 1);
      }

      console.log("Image export");
      console.log(imageExportProperties);
      updatedImageOptions[updatedLayer.layerName] = {
        fileName: imageFile.name,
        mirror: imageExportProperties?.mirrored ?? false,
        shiftX: imageExportProperties?.shiftX ?? 0,
        shiftY: imageExportProperties?.shiftY ?? 0,
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
