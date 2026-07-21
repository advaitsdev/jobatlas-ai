import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
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

      <DashboardAnalytics
        opportunities={opportunities}
      />

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