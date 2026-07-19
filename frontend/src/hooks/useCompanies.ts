import { useEffect, useState } from "react";

import { getCompanies } from "@/services/company";
import type { Company } from "@/types/company";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
  };
}