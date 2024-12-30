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
import ImageView, { LoaderType } from "../components/ImageView";
import { Color } from "../constants/Color";
import "../index.css";
import { useAlert } from "../components/AlertProvider/UseAlert";

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
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [currentlyExporting, setCurrentlyExporting] = useState<boolean>(false);
  const { showAlert } = useAlert();

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
          const responseFileInfo =
            response.data!.find((f) => f.name === fileName) || null;
          setFileInfo(responseFileInfo);
          setPreviewUrl(responseFileInfo?.metadata?.previewUrl ?? undefined);
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

    try {
      setCurrentlyExporting(true);
      const exportResponse = await exportPsdFile(parameters, files);

      if (exportResponse.statusCode === 401) {
        navigate("/"); // Redirect to login if unauthorized
        return;
      }

      if (exportResponse.success) {
        // Use the Blob directly
        const blob = exportResponse.data!;

        // Generate a temporary URL for the image preview
        const previewUrl = URL.createObjectURL(blob);
        setPreviewUrl(previewUrl);
        setHasGenerated(true);
      } else {
        console.error(
          "Export failed:",
          exportResponse.error || exportResponse.axiosError
        );
        await showAlert(
          "Export failed, an unexpected error occurred. Check the console log or networks tab for more info."
        );
      }
    } catch (error) {
      console.log("Error during export:", error);
      await showAlert("Error during export: " + error);
    } finally {
      setCurrentlyExporting(false);
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
        <div className="simple-container" style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <ImageView
              imageUrl={previewUrl}
              loading={currentlyExporting}
              loaderType={LoaderType.BounceLoader}
            />
            <div className="vertical-list">
              <TextButton
                extraVerticalPadding={0.5}
                fullWidth={true}
                text="Generate image"
                onClick={handleExport}
                bgColor={Color.Purple}
              />
              {hasGenerated ? (
                <TextButton
                  ariaLabel={
                    hasGenerated
                      ? "Download image"
                      : "Need to generate image first"
                  }
                  disabled={!hasGenerated}
                  extraVerticalPadding={0.5}
                  fullWidth={true}
                  text="Download image"
                  onClick={async () => {
                    if (previewUrl) {
                      const anchor = document.createElement("a");
                      anchor.href = previewUrl;
                      anchor.download = getCorrectFileName(
                        fileName || "exported-file",
                        ".jpg"
                      ); // Default file name
                      anchor.click();
                      URL.revokeObjectURL(previewUrl); // Clean up URL object
                    } else {
                      console.error("No preview URL available for download.");
                    }
                  }}
                  bgColor={Color.Neutral}
                />
              ) : null}
            </div>
          </div>
        </div>
      </MultiplePartsMainContentContainer>
    </CenteredMainContainer>
  );
};

function getCorrectFileName(fileName: string, newExtension: string): string {
  if (!newExtension.startsWith(".")) {
    newExtension = `.${newExtension}`;
  }

  const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, ""); // Remove existing extension
  return `${fileNameWithoutExtension}${newExtension}`;
}

export default ExportPage;
