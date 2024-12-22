// src/pages/PsdFilesPage.tsx

import React, { useEffect, useState } from "react";
import { listPsdFiles } from "../api/PsdApi";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";

const PsdFilesPage: React.FC = () => {
  const [psdFiles, setPsdFiles] = useState<PhotoshopFileInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPsdFiles = async () => {
      try {
        const response = await listPsdFiles();
        if (response.data) {
          setPsdFiles(response.data);
        } else {
          setError("Failed to load PSD files.");
        }
      } catch (error) {
        setError("An error occurred while fetching the PSD files." + error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsdFiles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>PSD Files</h1>
      <ul>
        {psdFiles.map((file) => (
          <li key={file.name}>
            <h3>{file.name}</h3>
            {file.metadata && (
              <>
                <img src={file.metadata.thumbnailUrl} alt="thumbnail" />
                <ul>
                  {file.metadata.layers.map((layer, index) => (
                    <li key={index}>
                      <strong>{layer.layerName}</strong>
                      {layer.isTextLayer && <p>Text: {layer.textContent}</p>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PsdFilesPage;