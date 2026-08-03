import { api } from "./api";

import type {
  PaginatedJobApplications,
  CreateApplicationRequest,
} from "../types/application";

type GetApplicationsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  source?: string;
  sort?: string;
};

export async function getApplications(
  params: GetApplicationsParams = {}
): Promise<PaginatedJobApplications> {
  const { data } = await api.get("/applications", {
    params,
  });

  return data;
}

export async function createApplication(
  payload: CreateApplicationRequest
) {
  const { data } = await api.post(
    "/applications",
    payload
  );

  return data;
}
export async function updateApplication(
  id: string,
  payload: CreateApplicationRequest
) {
  const { data } = await api.put(
    `/applications/${id}`,
    payload
  );

  return data;
}
export async function deleteApplication(id: string) {
  const { data } = await api.delete(`/applications/${id}`);
  return data;
}