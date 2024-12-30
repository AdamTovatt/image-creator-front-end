import { useEffect, useState } from "react";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import { formatLayerName } from "../helpers/LayerNameHelper";
import { PhotoshopLayer } from "../models/PhotoshopLayer";
import CircleButton from "./CircleButton";
import "../index.css";
import NumberInput from "./NumberInput";
import BooleanInput from "./BooleanInput";
import { ImageExportProperties } from "../models/ImageExportProperties";

interface PsdLayersListItemProps {
  layerData: PhotoshopLayer;
  onUpdateLayer: (
    updatedLayer: PhotoshopLayer,
    imageFile?: File,
    imageExportProperties?: ImageExportProperties
  ) => void;
}

interface LayerProps {
  layerData: PhotoshopLayer;
  editing: boolean;
  onChange: (
    updatedLayer: PhotoshopLayer,
    imageFile?: File,
    imageExportProperties?: ImageExportProperties
  ) => void;
  fileName?: string;
  imageExportProperties?: ImageExportProperties;
}

const TextLayer: React.FC<LayerProps> = ({ layerData, editing, onChange }) => {
  const [textContent, setTextContent] = useState(layerData.textContent || "");

  useEffect(() => {
    if (!editing) {
      setTextContent(layerData.textContent || ""); // Reset text content when editing stops
    }
  }, [editing, layerData.textContent]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = e.target.value;
    setTextContent(updatedText);
    onChange({ ...layerData, textContent: updatedText });
  };

  return editing ? (
    <div style={{ paddingRight: "1rem", marginTop: "0.25rem" }}>
      <textarea
        className="input-element"
        value={textContent}
        onChange={handleTextChange}
        placeholder="Edit text content"
        rows={4} // Adjust rows as needed
        style={{
          width: "calc(100% - 0.5rem)",
        }}
      />
    </div>
  ) : (
    <div style={{ height: "1.2rem", overflow: "hidden" }}>
      {layerData.textContent}
    </div>
  );
};

const ImageLayer: React.FC<LayerProps> = ({
  layerData,
  editing,
  onChange,
  fileName,
  imageExportProperties,
}) => {
  const [localImageExportProperties, setLocalImageExportProperties] =
    useState<ImageExportProperties>(
      imageExportProperties || { shiftX: 0, shiftY: 0, mirrored: false }
    );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(layerData, file, localImageExportProperties); // Pass image export properties
    }
  };

  const handleExportPropertyChange = (
    property: keyof ImageExportProperties,
    value: number | boolean
  ) => {
    const updatedProperties = {
      ...localImageExportProperties,
      [property]: value,
    };
    setLocalImageExportProperties(updatedProperties);
    onChange(layerData, undefined, updatedProperties); // Notify parent of export properties change
  };

  return editing ? (
    <div>
      <input
        style={{ marginTop: "1rem" }}
        type="file"
        onChange={handleImageUpload}
      />
      <div
        className="flex-container horizontal-equal-spacing-flex"
        style={{ marginTop: "1rem" }}
      >
        <NumberInput
          externalValue={localImageExportProperties.shiftX}
          initialValue={localImageExportProperties.shiftX}
          name="X-shift:"
          onChange={(value) => handleExportPropertyChange("shiftX", value)}
        />
        <div style={{ minWidth: "0.25rem" }}></div>
        <NumberInput
          externalValue={localImageExportProperties.shiftY}
          initialValue={localImageExportProperties.shiftY}
          name="Y-shift:"
          onChange={(value) => handleExportPropertyChange("shiftY", value)}
        />
        <div style={{ minWidth: "0.25rem" }}></div>
        <BooleanInput
          initialValue={localImageExportProperties.mirrored}
          name="Mirrored:"
          onChange={(value) => handleExportPropertyChange("mirrored", value)}
        />
      </div>
    </div>
  ) : (
    <div style={{ height: "1.2rem", overflow: "hidden" }}>
      {fileName ? fileName : "(no file uploaded)"}
    </div>
  );
};

const PsdLayersListItem: React.FC<PsdLayersListItemProps> = ({
  layerData,
  onUpdateLayer,
}) => {
  const [editing, setEditing] = useState(false);
  const [localLayerData, setLocalLayerData] = useState(layerData);
  const [localImageFile, setLocalImageFile] = useState<File | null>(null);
  const [lastSavedLayerData, setLastSavedLayerData] = useState(layerData);
  const [lastSavedImageFile, setLastSavedImageFile] = useState<File | null>(
    null
  );
  const [localImageExportProperties, setLocalImageExportProperties] =
    useState<ImageExportProperties | null>(null);
  const [lastSavedImageExportProperties, setLastSavedImageExportProperties] =
    useState<ImageExportProperties | null>(null);

  const handleSave = async () => {
    setEditing(false);
    setLastSavedLayerData(localLayerData); // Update last saved layer data
    setLastSavedImageFile(localImageFile); // Update last saved image file
    setLastSavedImageExportProperties(localImageExportProperties);
    onUpdateLayer(
      localLayerData,
      localImageFile || undefined,
      localImageExportProperties || undefined
    ); // Notify parent of changes
  };

  const handleCancel = async () => {
    setEditing(false);
    setLocalLayerData(lastSavedLayerData); // Revert to the last saved state
    setLocalImageFile(lastSavedImageFile); // Revert to the last saved file
    setLocalImageExportProperties(lastSavedImageExportProperties);
  };

  const handleLayerChange = (
    updatedLayer: PhotoshopLayer,
    file?: File,
    imageExportProperties?: ImageExportProperties
  ) => {
    setLocalLayerData(updatedLayer);
    if (file) {
      setLocalImageFile(file); // Temporarily store selected file
    }
    if (imageExportProperties) {
      setLocalImageExportProperties(imageExportProperties);
    }
  };

  return (
    <div className="inner-flex-element">
      <div style={{ width: "calc(100% - 3rem)" }}>
        <div style={{ opacity: 0.7 }}>
          {formatLayerName(layerData.layerName)}:
        </div>
        {layerData.isImageLayer ? (
          <ImageLayer
            layerData={localLayerData}
            editing={editing}
            onChange={handleLayerChange}
            fileName={lastSavedImageFile?.name ?? undefined}
          />
        ) : (
          <TextLayer
            layerData={localLayerData}
            editing={editing}
            onChange={handleLayerChange}
          />
        )}
      </div>
      {editing ? (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <CircleButton
            onClick={handleCancel}
            ariaLabel={"Cancel changes for layer " + layerData.layerName}
            icon={CircleButtonIcon.X}
          />
          <CircleButton
            onClick={handleSave}
            ariaLabel={"Save changes for layer " + layerData.layerName}
            icon={CircleButtonIcon.Check}
          />
        </div>
      ) : (
        <CircleButton
          onClick={async () => setEditing(true)}
          ariaLabel={"Edit properties for layer " + layerData.layerName}
          icon={CircleButtonIcon.Edit}
        />
      )}
    </div>
  );
};

export default PsdLayersListItem;
