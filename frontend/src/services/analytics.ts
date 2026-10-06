import { api } from "./api";

export interface AnalyticsStatusBreakdown {
  status: string;
  count: number;
}

export interface AnalyticsSourceBreakdown {
  source: string;
  count: number;
}

export interface AnalyticsCompanyBreakdown {
  company: string;
  count: number;
}

export interface AnalyticsTimelinePoint {
  date: string;
  count: number;
}

export interface ApplicationAnalytics {
  total_opportunities: number;
  total_applications: number;
  applications_last_30_days: number;

  status_breakdown: AnalyticsStatusBreakdown[];

  source_breakdown: AnalyticsSourceBreakdown[];

  company_breakdown: AnalyticsCompanyBreakdown[];

  application_timeline: AnalyticsTimelinePoint[];

  application_to_rejection_ratio: number;
  application_to_interview_ratio: number;
  application_to_offer_ratio: number;
}

export async function getApplicationAnalytics(): Promise<ApplicationAnalytics> {
  const { data } = await api.get<ApplicationAnalytics>(
    "/analytics/applications"
  );

  return data;
}