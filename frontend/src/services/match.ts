import { api } from "./api";

export const matchResume = async (
  file: File,
  jobDescription: string
) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "job_description",
    jobDescription
  );

  const response = await api.post(
    "/resume/match",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};