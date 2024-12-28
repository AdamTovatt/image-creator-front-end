import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PsdLayersList from "../components/PsdLayersList";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import { listPsdFiles } from "../api/PsdApi";
import CenteredMainContainer from "../components/CenteredMainContainer";
import MultiplePartsMainContentContainer from "../components/MultiplePartsMainContentContainer";

interface FullPageErrorMessageProps {
  message: string;
}

const FullPageErrorMessage: React.FC<FullPageErrorMessageProps> = ({
  message,
}) => {
  return <CenteredMainContainer>{message}</CenteredMainContainer>;
};

const ExportPage: React.FC = () => {
  const { fileName } = useParams<{ fileName: string }>();
  const [fileInfo, setFileInfo] = useState<PhotoshopFileInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileInfo = async () => {
      setLoading(true);
      try {
        const response = await listPsdFiles();

        if (response.success) {
          setFileInfo(response.data!.find((f) => f.name === fileName) || null);
        } else if (response.error) {
          setErrorMessage(response.error!.message);
        } else if (response.axiosError) {
          setErrorMessage(response.axiosError!.message);
        }
      } catch (error) {
        console.error("Error fetching file info:", error);
        setErrorMessage("Unexpected error when fetching file info: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileInfo();
  }, [fileName]);

  const displayMessage = (): string | null => {
    if (loading) return "Loading...";
    else if (errorMessage) return errorMessage;
    else if (!fileInfo) return "Could not find the file";
    else if (!fileInfo.metadata)
      return "Missing file metadata, generate it from the list view";
    return null;
  };

  const messageToDisplay = displayMessage();
  if (messageToDisplay)
    return <FullPageErrorMessage message={messageToDisplay} />;

  return (
    <CenteredMainContainer>
      <MultiplePartsMainContentContainer>
        <PsdLayersList fileMetadata={fileInfo!.metadata!} />
      </MultiplePartsMainContentContainer>
    </CenteredMainContainer>
  );
};

export default ExportPage;
