import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import { formatLayerName } from "../helpers/LayerNameHelper";
import { PhotoshopLayer } from "../models/PhotoshopLayer";
import CircleButton from "./CircleButton";

interface PsdLayersListItemProps {
  layerData: PhotoshopLayer;
}

const PsdLayersListItem: React.FC<PsdLayersListItemProps> = ({ layerData }) => {
  return (
    <div className="inner-flex-element">
      <div style={{ maxWidth: "80%" }}>
        <div style={{ opacity: 0.7 }}>
          {formatLayerName(layerData.layerName)}:
        </div>
        <div style={{ height: "1rem" }}>
          {layerData.isTextLayer
            ? layerData.textContent ?? ""
            : "(no file uploaded)"}
        </div>
      </div>
      <CircleButton
        onClick={async () => {}}
        ariaLabel={"Edit properties for layer " + layerData.layerName}
        icon={CircleButtonIcon.Edit}
      />
    </div>
  );
};

export default PsdLayersListItem;
