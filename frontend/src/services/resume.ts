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

export const getResume = async (
  id: string
) => {
  const response = await api.get(
    `/resume/${id}`
  );

  return response.data;
};
export const deleteResume = async (id: string) => {
  await api.delete(`/resume/${id}`);
};