import SearchBar from "@/components/dashboard/Searchbar";
import StatusFilter from "@/components/dashboard/StatusFilter";
import SortDropdown from "@/components/dashboard/SortDropdown";
import OpportunityList from "@/components/dashboard/OpportunityList";
import AddOpportunityModal from "@/components/dashboard/AddOpportunityModal";
import EditOpportunityModal from "@/components/dashboard/EditOpportunityModal";

import { useOpportunities } from "@/hooks/useOpportunities";

import type { Opportunity } from "@/types/opportunity";

import { useState } from "react";

export default function Opportunities() {
  const {
    opportunities,
    setOpportunities,
    loading,
    error,
  } = useOpportunities();

  const [showAddOpportunityModal, setShowAddOpportunityModal] =
    useState(false);

  const [showEditOpportunityModal, setShowEditOpportunityModal] =
    useState(false);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const filteredOpportunities =
    opportunities.filter((opportunity) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.company.name.toLowerCase().includes(query) ||
        opportunity.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        opportunity.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  return (
    <div>
      <h1 className="text-4xl font-bold text-white">
        Opportunities
      </h1>

      <p className="mt-2 text-slate-400">
        Manage all your job applications.
      </p>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() =>
            setShowAddOpportunityModal(true)
          }
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Add Opportunity
        </button>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <StatusFilter
        value={statusFilter}
        onChange={setStatusFilter}
      />

      <SortDropdown
        value={sortBy}
        onChange={setSortBy}
      />

      <OpportunityList
        opportunities={filteredOpportunities}
        setOpportunities={setOpportunities}
        loading={loading}
        error={error}
        onEdit={(id) => {
          const opportunity =
            opportunities.find(
              (o) => o.id === id
            );

          if (!opportunity) return;

          setSelectedOpportunity(opportunity);
          setShowEditOpportunityModal(true);
        }}
      />

      <AddOpportunityModal
        isOpen={showAddOpportunityModal}
        onClose={() =>
          setShowAddOpportunityModal(false)
        }
        onCreated={(newOpportunity) => {
          setOpportunities((previous) => [
            newOpportunity,
            ...previous,
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
              opportunity.id ===
              updatedOpportunity.id
                ? updatedOpportunity
                : opportunity
            )
          );
        }}
      />
    </div>
  );
}