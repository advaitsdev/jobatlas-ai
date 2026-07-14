import OpportunityCard from "./OpportunityCard";
import { useOpportunities } from "@/hooks/useOpportunities";

export default function OpportunityList() {
  const {
    opportunities,
    loading,
    error,
  } = useOpportunities();

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
          title={opportunity.title}
          status={opportunity.status}
          location={opportunity.location}
          companyId={opportunity.company_id}
        />
      ))}
    </div>
  );
}