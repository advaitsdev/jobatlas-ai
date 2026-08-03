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

export interface DashboardResponse {
  summary: DashboardSummary;
  source_breakdown: SourceBreakdown[];
  status_breakdown: StatusBreakdown[];
  monthly_applications: MonthlyApplication[];
}