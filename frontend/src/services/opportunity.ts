import { api } from "./api";

import type {
  Opportunity,
  PaginatedOpportunities,
  CreateOpportunityRequest,
  UpdateOpportunityRequest,
  OpportunityStatus,
} from "@/types/opportunity";

type GetOpportunitiesParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: OpportunityStatus;
};

export async function getOpportunities(
  params: GetOpportunitiesParams = {}
): Promise<PaginatedOpportunities> {
  const { data } = await api.get("/opportunities", {
    params,
  });

  return data;
}

export async function createOpportunity(
  payload: CreateOpportunityRequest
): Promise<Opportunity> {
  const { data } = await api.post(
    "/opportunities",
    payload
  );

  return data;
}

export async function updateOpportunity(
  id: string,
  payload: UpdateOpportunityRequest
): Promise<Opportunity> {
  const { data } = await api.patch(
    `/opportunities/${id}`,
    payload
  );

  return data;
}

export async function deleteOpportunity(
  id: string
) {
  const { data } = await api.delete(
    `/opportunities/${id}`
  );

  return data;
}