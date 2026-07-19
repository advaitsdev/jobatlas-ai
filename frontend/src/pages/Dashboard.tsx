import EditOpportunityModal from "@/components/dashboard/EditOpportunityModal";
import type { Opportunity } from "@/types/opportunity";
import { useState } from "react";
import AddOpportunityModal from "@/components/dashboard/AddOpportunityModal";
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

  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
  useState<Opportunity | null>(null);

  const [showEditOpportunityModal, setShowEditOpportunityModal] =
  useState(false);

   
  return (
  <div>
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back, Advait 👋
        </p>
      </div>

      <button
        onClick={() => setShowAddOpportunityModal(true)}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        + Add Opportunity
      </button>
    </div>

    <DashboardStats opportunities={opportunities} />

    <OpportunityList
  opportunities={opportunities}
  setOpportunities={setOpportunities}
  loading={loading}
  error={error}
  
    onEdit={(id) => {
  const opportunity = opportunities.find(
    (o) => o.id === id
  );

  if (!opportunity) return;

  setSelectedOpportunity(opportunity);
  setShowEditOpportunityModal(true);
}}
/>
    

    <AddOpportunityModal
  isOpen={showAddOpportunityModal}
  onClose={() => setShowAddOpportunityModal(false)}
  onCreated={(newOpportunity) => {
    setOpportunities((prev) => [
      newOpportunity,
      ...prev,
    ]);
  }}
/>
  <EditOpportunityModal
  isOpen={showEditOpportunityModal}
  opportunity={selectedOpportunity}
  onClose={() => {
    setShowEditOpportunityModal(false);
    setSelectedOpportunity(null);
  }}
  onUpdated={(updatedOpportunity) => {
    setOpportunities((previous) =>
      previous.map((opportunity) =>
        opportunity.id === updatedOpportunity.id
          ? updatedOpportunity
          : opportunity
      )
    );
  }}

/>

  </div>
);
}
