export interface Company {
  id: string;
  name: string;
  website: string | null;
  industry: string | null;
}

export interface PaginatedCompanies {
  items: Company[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CreateCompanyRequest {
  name: string;
  website: string;
  industry: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  website?: string;
  industry?: string;
}