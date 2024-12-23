import React, { useState } from "react";
import "./CircleButton.css";
import { MoonLoader } from "react-spinners"; // Import MoonLoader
import {
  ArrowRight as FeatherArrowRight,
  ChevronRight as FeatherChevronRight,
  Plus as FeatherPlus,
  X as FeatherX,
  Trash as FeatherTrash,
  Edit as FeatherEdit,
  HelpCircle as FeatherHelpCircle,
  Send as FeatherSend,
  Check as FeatherCheck,
} from "react-feather";
import { CircleButtonIcon } from "../constants/CircleButtonIcon"; // Import your enum file

interface CircleButtonProps {
  onClick: () => Promise<void>; // Function returning a promise to handle the loading
  icon?: CircleButtonIcon; // Enum value for the icon
  ariaLabel?: string; // Accessibility label
  loadingStateHandledExternally: boolean;
  externalLoadingState?: boolean;
}

// Map enum values to corresponding Feather icons
const CircleButtonIconMap: Record<CircleButtonIcon, JSX.Element> = {
  [CircleButtonIcon.ArrowRight]: <FeatherArrowRight />,
  [CircleButtonIcon.ChevronRight]: <FeatherChevronRight />,
  [CircleButtonIcon.Plus]: <FeatherPlus />,
  [CircleButtonIcon.X]: <FeatherX />,
  [CircleButtonIcon.Trash]: <FeatherTrash />,
  [CircleButtonIcon.Edit]: <FeatherEdit />,
  [CircleButtonIcon.HelpCircle]: <FeatherHelpCircle />,
  [CircleButtonIcon.Send]: <FeatherSend />,
  [CircleButtonIcon.Check]: <FeatherCheck />,
};

const CircleButton: React.FC<CircleButtonProps> = ({
  onClick,
  icon = CircleButtonIcon.ArrowRight, // Default icon
  ariaLabel = "Circle button",
  externalLoadingState,
  loadingStateHandledExternally,
}) => {
  const [internalLoadingState, setInternalLoadingState] = useState(false);

  const handleClick = async () => {
    if (loadingStateHandledExternally) {
      if (externalLoadingState) return; // Prevent multiple clicks while loading
      await onClick();
    }
    {
      if (internalLoadingState) return; // Prevent multiple clicks while loading
      setInternalLoadingState(true);
      try {
        await onClick();
      } finally {
        setInternalLoadingState(false);
      }
    }
  };

  return (
    <button
      className="circle-button"
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={
        loadingStateHandledExternally
          ? externalLoadingState
          : internalLoadingState
      } // Disable while loading
    >
      {(
        loadingStateHandledExternally
          ? externalLoadingState
          : internalLoadingState
      ) ? (
        <MoonLoader size={15} color="white" />
      ) : (
        <span className="icon">{CircleButtonIconMap[icon]}</span>
      )}
    </button>
  );
};

export default CircleButton;
