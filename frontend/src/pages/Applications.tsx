import { useQuery } from "@tanstack/react-query";
import ApplicationToolbar from "@/components/applications/ApplicationToolbar";
import { getApplications } from "@/services/application";
import ApplicationTable from "@/components/applications/ApplicationTable";
import { useState } from "react";
import Pagination from "@/components/applications/Pagination";
import AddApplicationDialog from "@/components/applications/AddApplicationDialog";
import { useDebounce } from "@/hooks/useDebounce";
import ApplicationTableSkeleton from "@/components/applications/ApplicationTableSkeleton";
import ApplicationEmptyState from "@/components/applications/ApplicationEmptyState";





export default function Applications() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
  queryKey: [
    "applications",
    debouncedSearch,
    status,
    source,
    sort,
    page,
  ],
  queryFn: () =>
    getApplications({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
      status: status || undefined,
      source: source || undefined,
      sort,
    }),
});

  if (isLoading) {
  return (
    <div className="space-y-8">
      <ApplicationToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        sort={sort}
        setSort={setSort}
      />

      <ApplicationTableSkeleton />
    </div>
  );
}

  if (isError || !data) {
    return <h1>Failed to load applications.</h1>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="text-muted-foreground">
            Manage all your job applications.
          </p>
        </div>

        <AddApplicationDialog />
      </div>
      <ApplicationToolbar
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  source={source}
  setSource={setSource}
  sort={sort}
  setSort={setSort}
/>

      {data.items.length === 0 ? (
      <ApplicationEmptyState />
      ) : (
        <ApplicationTable
          applications={data.items}
        />
      )}
<Pagination
  page={page}
  pages={data.pages}
  setPage={setPage}
/>
    </div>
  );
}