import { api } from "./api";

import type {
  ResumeUploadResponse,
} from "@/types/resume";

export const uploadResume = async (
  file: File
): Promise<ResumeUploadResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};