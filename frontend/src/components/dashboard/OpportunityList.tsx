import OpportunityCard from "./OpportunityCard";

import type { Opportunity } from "@/types/opportunity";

type OpportunityListProps = {
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<
    React.SetStateAction<Opportunity[]>
  >;
  loading: boolean;
  error: string;
  onEdit: (id: string) => void;
};

export default function OpportunityList({
  opportunities,
  setOpportunities,
  loading,
  error,
  onEdit,
}: OpportunityListProps) {
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
          company={opportunity.company}
          location={opportunity.location}
          status={opportunity.status}
          salary={opportunity.salary}
          employmentType={opportunity.employment_type}
          deadline={opportunity.deadline}
          onDelete={handleDeleteSuccess}
          onEdit = {onEdit}
          
        />
      ))}
    </div>
  );
}