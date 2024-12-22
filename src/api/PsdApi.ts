// src/api/PsdApi.ts

import { apiRequest } from "./ApiClient";
import { ApiResponse } from "../models/ApiResponse";
import { ExportParameters } from "../models/ExportParameters";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";

// 1. Upload a PSD file
export async function uploadPsdFile(psdFile: FormData): Promise<ApiResponse> {
  return await apiRequest({
    method: "POST",
    url: "/psd/upload",
    data: psdFile, // Use FormData for file uploads
  });
}

// 2. Update an existing PSD file
export async function updatePsdFile(psdFile: FormData): Promise<ApiResponse> {
  return await apiRequest({
    method: "POST",
    url: "/psd/update",
    data: psdFile, // Use FormData for file uploads
  });
}

// 3. Export a PSD file with specific parameters
export async function exportPsdFile(parameters: ExportParameters, imageFiles: File[]): Promise<ApiResponse<Blob>> {
  const formData = new FormData();
  formData.append("parametersJson", JSON.stringify(parameters));

  imageFiles.forEach((file, index) => {
    formData.append("imageFiles", file, `image-${index}`);
  });

  return await apiRequest({
    method: "POST",
    url: "/psd/export-with-parameters",
    data: formData, // Send parameters as FormData
  });
}

// 4. Delete a PSD file
export async function deletePsdFile(fileName: string): Promise<ApiResponse> {
  return await apiRequest({
    method: "DELETE",
    url: "/psd/delete",
    params: { fileName },
  });
}

// 5. List all PSD files
export async function listPsdFiles(): Promise<ApiResponse<PhotoshopFileInfo[]>> {
  return await apiRequest({
    method: "GET",
    url: "/psd/list",
  });
}

// 6. Download a PSD file
export async function downloadPsdFile(fileName: string): Promise<ApiResponse<Blob>> {
  return await apiRequest({
    method: "GET",
    url: "/psd/download",
    params: { fileName },
  });
}
