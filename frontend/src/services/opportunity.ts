import { api } from "./api";

export const getOpportunities = async () => {
  const response = await api.get("/opportunities");
  return response.data;
};

export const deleteOpportunity = async (id: string) => {
  const response = await api.delete(`/opportunities/${id}`);
  return response.data;
};

export const createOpportunity = async (data: {
  title: string;
  company_id: string;
  user_id: string;
  location: string;
  employment_type: string;
  salary: string;
  deadline: string;
  notes: string;
}) => {
  const response = await api.post("/opportunities", data);
  return response.data;
};

export const updateOpportunity = async (
  id: string,
  data: {
    title: string;
    company_id: string;
    location: string;
    employment_type: string;
    salary: string;
    deadline: string;
    notes: string;
  }
) => {
  const response = await api.patch(
    `/opportunities/${id}`,
    data
  );

  return response.data;
};