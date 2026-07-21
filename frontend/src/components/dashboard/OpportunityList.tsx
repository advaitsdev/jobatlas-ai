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
  if (opportunities.length === 0) {
  return (
    <div className="mt-12 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
      <div className="text-5xl">🔍</div>

      <h2 className="mt-4 text-2xl font-semibold text-white">
        No opportunities found
      </h2>

      <p className="mt-2 text-slate-400">
        Try changing your search or filters.
      </p>
    </div>
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