import { api } from "./api";

export const getOpportunities = async () => {
  const response = await api.get("/opportunities");
  return response.data;
};
export const deleteOpportunity = async (id: string) => {
  const response = await api.delete(`/opportunities/${id}`);
  return response.data;
};