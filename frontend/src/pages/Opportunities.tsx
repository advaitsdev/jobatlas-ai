import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getOpportunities } from "@/services/opportunity";

import type { OpportunityStatus } from "@/types/opportunity";

import { useDebounce } from "@/hooks/useDebounce";

import OpportunityToolbar from "@/components/opportunities/OpportunityToolbar";
import OpportunityTable from "@/components/opportunities/OpportunityTable";
import OpportunityEmptyState from "@/components/opportunities/OpportunityEmptyState";
import OpportunityTableSkeleton from "@/components/opportunities/OpportunityTableSkeleton";
import OpportunityPagination from "@/components/opportunities/OpportunityPagination";
import AddOpportunityDialog from "@/components/opportunities/AddOpportunityDialog";

export default function Opportunities() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<OpportunityStatus | "">("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: [
      "opportunities",
      page,
      debouncedSearch,
      status,
    ],

    queryFn: () =>
      getOpportunities({
        page,
        search: debouncedSearch || undefined,
        status: status || undefined,
      }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Opportunities
        </h1>

        <p className="text-muted-foreground">
          Manage all opportunities.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <OpportunityToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        <AddOpportunityDialog />
      </div>

      {isLoading ? (
        <OpportunityTableSkeleton />
      ) : data?.items.length === 0 ? (
        <OpportunityEmptyState />
      ) : (
        <>
          <OpportunityTable
            opportunities={data.items}
          />

          <OpportunityPagination
            page={page}
            totalPages={data.pages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}