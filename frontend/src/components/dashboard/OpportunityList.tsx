import { useEffect, useState } from "react";

import OpportunityCard from "./OpportunityCard";

import { getOpportunities } from "@/services/opportunity";
import type { Opportunity } from "@/types/opportunity";

export default function OpportunityList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleDeleteSuccess = (id: string) => {
    setOpportunities((previous) =>
      previous.filter(
        (opportunity) => opportunity.id !== id
      )
    );
  };

  if (loading) {
    return (
      <p className="mt-6 text-slate-400">
        Loading opportunities...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-6 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          id={opportunity.id}
          title={opportunity.title}
          status={opportunity.status}
          location={opportunity.location}
          companyId={opportunity.company_id}
          onDelete={handleDeleteSuccess}
        />
      ))}
    </div>
  );
}