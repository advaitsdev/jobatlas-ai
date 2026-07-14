import { api } from "./api";

export const getOpportunities = async () => {
  const response = await api.get("/opportunities");
  return response.data;
};