import { api } from "./api";

import type {
  ResumeUploadResponse,
} from "@/types/resume";

export interface ResumeSkillsResponse {
  resume_id: string;
  skills: string[];
}

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

export const deleteResume = async (
  id: string
) => {
  await api.delete(`/resume/${id}`);
};

export const getResumeHistory = async () => {
  const response = await api.get(
    "/resume/history"
  );

  return response.data;
};

export const getResumeSkills = async (
  id: string
): Promise<ResumeSkillsResponse> => {
  const response = await api.get(
    `/resume/${id}/skills`
  );

  return response.data;
};