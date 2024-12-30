import { apiRequest } from "./ApiClient";
import { ApiResponse } from "../models/ApiResponse";
import { ExportParameters } from "../models/ExportParameters";
import { PhotoshopFileInfo } from "../models/PhotoshopFileInfo";
import { MessageResponse } from "../models/MessageResponse";

// 1. Upload a PSD file
export async function uploadPsdFile(
  file: File
): Promise<ApiResponse<MessageResponse, MessageResponse>> {
  const formData = new FormData();
  formData.append("psdFile", file);

  return await apiRequest({
    method: "POST",
    url: "/psd/upload",
    data: formData, // Use FormData for file uploads
  });
}

// 2. Update an existing PSD file
export async function updatePsdFile(
  file: File
): Promise<ApiResponse<MessageResponse, MessageResponse>> {
  const formData = new FormData();
  formData.append("psdFile", file);

  return await apiRequest({
    method: "POST",
    url: "/psd/update",
    data: formData, // Use FormData for file uploads
  });
}

// 3. Export a PSD file with specific parameters
export async function exportPsdFile(
  parameters: ExportParameters,
  imageFiles: File[]
): Promise<ApiResponse<Blob, MessageResponse>> {
  const formData = new FormData();
  formData.append("parametersJson", JSON.stringify(parameters));

  imageFiles.forEach((file) => {
    formData.append("imageFiles", file, file.name);
  });

  return await apiRequest({
    method: "POST",
    url: "/psd/export-with-parameters",
    data: formData, // Send parameters as FormData
    responseType: "blob",
  });
}

// 4. Delete a PSD file
export async function deletePsdFile(
  fileName: string
): Promise<ApiResponse<MessageResponse, MessageResponse>> {
  return await apiRequest({
    method: "DELETE",
    url: "/psd/delete",
    params: { fileName },
  });
}

// 5. List all PSD files
export async function listPsdFiles(): Promise<
  ApiResponse<PhotoshopFileInfo[], MessageResponse>
> {
  return await apiRequest({
    method: "GET",
    url: "/psd/list",
  });
}

// 6. Download a PSD file
export async function downloadPsdFile(
  fileName: string
): Promise<ApiResponse<Blob, MessageResponse>> {
  return await apiRequest({
    method: "GET",
    url: "/psd/download",
    params: { fileName },
    responseType: "blob",
  });
}

// 7. Create metadata for a PSD file
export async function createMetadata(
  fileName: string,
  inBackground: boolean
): Promise<ApiResponse<MessageResponse, MessageResponse>> {
  return await apiRequest({
    method: "POST",
    url: "/psd/create-metadata",
    params: { fileName, inBackground },
  });
}
