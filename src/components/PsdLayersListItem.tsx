import { PhotoshopLayer } from "../models/PhotoshopLayer";

interface PsdLayersListItemProps {
  layerData: PhotoshopLayer;
}

const PsdLayersListItem: React.FC<PsdLayersListItemProps> = ({ layerData }) => {
  return <div>{layerData.layerName}</div>;
};

export default PsdLayersListItem;
