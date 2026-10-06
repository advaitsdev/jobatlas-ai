export interface DashboardSummary {
  total_applications: number;
  applied: number;
  interview: number;
  hr: number;
  offer: number;
  rejected: number;
  ghosted: number;
  withdrawn: number;
}

export interface SourceBreakdown {
  source: string;
  count: number;
}

export interface StatusBreakdown {
  status: string;
  count: number;
}

export interface MonthlyApplication {
  month: string;
  count: number;
}

export interface CompanyBreakdown {
  company: string;
  count: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;

  source_breakdown: SourceBreakdown[];

  status_breakdown: StatusBreakdown[];

  monthly_applications: MonthlyApplication[];

  company_breakdown: CompanyBreakdown[];

  applications_last_30_days: number;

  application_to_rejection_ratio: number;

  application_to_interview_ratio: number;

  application_to_offer_ratio: number;
}