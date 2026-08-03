export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string | null;
  source: string;
  job_url: string | null;
  salary: string | null;
  status: string;
  notes: string | null;
  date_applied: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedJobApplications {
  items: JobApplication[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CreateApplicationRequest {
  company: string;
  role: string;
  location: string;
  source: string;
  status: string;
  salary: string;
  date_applied: string;
  notes: string;
}