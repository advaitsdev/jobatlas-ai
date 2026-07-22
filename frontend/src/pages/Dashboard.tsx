import DashboardStats from "@/components/dashboard/DashboardStats";
import OpportunityList from "@/components/dashboard/OpportunityList";

import { useOpportunities } from "@/hooks/useOpportunities";

export default function Dashboard() {
  const {
    opportunities,
    setOpportunities,
    loading,
    error,
  } = useOpportunities();

  return (
    <div>
      <DashboardStats opportunities={opportunities} />
      <div className="mt-8 mb-4 flex items-center justify-between">
  <h2 className="text-2xl font-semibold text-white">
    Recent Opportunities
  </h2>

  <button className="text-blue-500 hover:text-blue-400">
    View All →
  </button>
</div>

      <OpportunityList
        opportunities={opportunities.slice(0, 5)}
        setOpportunities={setOpportunities}
        loading={loading}
        error={error}
        onEdit={() => {}}
      />
    </div>
  );
}