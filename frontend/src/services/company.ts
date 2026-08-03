import { api } from "./api";

import type {
  Company,
  PaginatedCompanies,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "../types/company";

type GetCompaniesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export async function getCompanies(
  params: GetCompaniesParams = {}
): Promise<PaginatedCompanies> {
  const { data } = await api.get("/companies", {
    params,
  });

  return data;
}

export async function createCompany(
  payload: CreateCompanyRequest
): Promise<Company> {
  const { data } = await api.post(
    "/companies",
    payload
  );

  return data;
}

export async function updateCompany(
  id: string,
  payload: UpdateCompanyRequest
): Promise<Company> {
  const { data } = await api.patch(
    `/companies/${id}`,
    payload
  );

  return data;
}

export async function deleteCompany(
  id: string
) {
  const { data } = await api.delete(
    `/companies/${id}`
  );

  return data;
}