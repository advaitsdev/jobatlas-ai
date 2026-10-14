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

export interface JobDescriptionParseRequest {
  job_description: string;
}

export interface JobDescriptionParseResponse {
  title: string | null;
  location: string | null;
  employment_type: string | null;

  required_skills: string[];
  preferred_skills: string[];

  responsibilities: string[];
  qualifications: string[];

  experience_required: string | null;
  education_required: string | null;
}

export interface OpportunitySkillMatch {
  opportunity_id: string;
  resume_id: string;

  required_match_percentage: number;
  preferred_match_percentage: number;
  overall_match_percentage: number;

  matched_required_skills: string[];
  missing_required_skills: string[];

  matched_preferred_skills: string[];
  missing_preferred_skills: string[];
}

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

export async function parseJobDescription(
  payload: JobDescriptionParseRequest
): Promise<JobDescriptionParseResponse> {
  const { data } = await api.post(
    "/opportunities/parse-jd",
    payload
  );

  return data;
}

export async function getOpportunitySkillMatch(
  opportunityId: string,
  resumeId: string
): Promise<OpportunitySkillMatch> {
  const { data } = await api.get(
    `/opportunities/${opportunityId}/skill-match`,
    {
      params: {
        resume_id: resumeId,
      },
    }
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