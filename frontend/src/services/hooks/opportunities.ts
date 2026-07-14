import { useEffect, useState } from "react";
import { getOpportunities } from "../services/opportunity";

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load opportunities");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return {
    opportunities,
    loading,
    error,
  };
}