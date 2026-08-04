export type OpportunityStatus =
  | "WISHLIST"
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export interface CompanySummary {
  id: string;
  name: string;
}

export interface Opportunity {
  id: string;

  title: string;

  company: CompanySummary;

  user_id: string | null;


  location: string | null;

  employment_type: string | null;

  status: OpportunityStatus;

  application_url: string | null;

  salary: string | null;

  applied_date: string | null;

  deadline: string | null;

  notes: string | null;
}

export interface PaginatedOpportunities {
  items: Opportunity[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CreateOpportunityRequest {
    title: string;
    company_id: string;
    user_id?: string;

    location?: string;
    employment_type?: string;

    application_url?: string;
    salary?: string;

    applied_date?: string;
    deadline?: string;

    notes?: string;
}

export interface UpdateOpportunityRequest {
  title?: string;
  location?: string;
  employment_type?: string;
  status?: OpportunityStatus;
  application_url?: string;
  salary?: string;
  applied_date?: string;
  deadline?: string;
  notes?: string;
}
export interface OpportunityFormData {
    title: string;
    company_id: string;
    user_id?: string;

    location: string;
    employment_type: string;

    application_url: string;
    salary: string;

    applied_date?: string;
    deadline?: string;

    notes: string;
}