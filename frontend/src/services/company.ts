import { api } from "./api";
import type { Company } from "@/types/company";

export async function getCompanies(): Promise<Company[]> {
  const response = await api.get("/companies");
  return response.data;
}