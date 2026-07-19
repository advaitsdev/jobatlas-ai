export type Opportunity = {
  id: string;

  title: string;

  company: {
    id: string;
    name: string;
  };

  user_id: string;

  location: string;

  employment_type: string;

  status: string;

  application_url?: string;

  salary?: string;

  applied_date?: string;

  deadline?: string;

  notes?: string;
};