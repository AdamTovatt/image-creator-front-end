import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PsdLayersList from "../components/PsdLayersList";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import { listPsdFiles, exportPsdFile } from "../api/PsdApi";
import CenteredMainContainer from "../components/CenteredMainContainer";
import MultiplePartsMainContentContainer from "../components/MultiplePartsMainContentContainer";
import TokenHelper from "../helpers/TokenHelper";
import TextButton from "../components/TextButton";
import { EditableExportParameters } from "../models/EditableExportParameters";

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
  const [exportParameters, setExportParameters] =
    useState<EditableExportParameters | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenHelper.getToken();

    if (!token) {
      navigate("/"); // Redirect to login page if no token exists
    }
  }, [navigate]);

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

  const handleExportParametersChange = (
    parameters: EditableExportParameters
  ) => {
    setExportParameters(parameters);
  };

  const handleExport = async () => {
    if (!exportParameters) return;

    const { files, ...parameters } = exportParameters; // Exclude files from the JSON payload

    const exportResponse = await exportPsdFile(parameters, files);

    if (exportResponse.success) {
      // Create a Blob from the ArrayBuffer response
      const blob = new Blob([exportResponse.data!], {
        type: "application/octet-stream",
      });

      // Create a link element to trigger download
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${exportParameters.fileName}.psd`; // Default download name
      document.body.appendChild(link);
      link.click();

      // Cleanup the link element
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } else {
      console.error(
        "Export failed:",
        exportResponse.error || exportResponse.axiosError
      );
    }
  };

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
      <TextButton
        text="Back to file list"
        onClick={async () => {
          navigate("/psd-files");
        }}
        extraVerticalPadding={0.5}
        style={{ position: "absolute", left: "1rem", top: "1rem" }}
      />
      <MultiplePartsMainContentContainer>
        <PsdLayersList
          fileMetadata={fileInfo!.metadata!}
          fileName={fileInfo!.name}
          onExportParametersChange={handleExportParametersChange}
        />
        <TextButton
          text="Export"
          onClick={handleExport}
          extraVerticalPadding={0.5}
          style={{ marginTop: "1rem" }}
        />
      </MultiplePartsMainContentContainer>
    </CenteredMainContainer>
  );
};

export default ExportPage;
