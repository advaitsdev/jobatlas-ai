import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import CompanyTable from "@/components/companies/CompanyTable";
import { getCompanies } from "@/services/company";
import { useDebounce } from "@/hooks/useDebounce";
import CompanyToolbar from "@/components/companies/CompanyToolbar";
import AddCompanyDialog from "@/components/companies/AddCompanyDialog";






export default function Companies() {
  const [page,setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: ["companies", page, debouncedSearch],
    queryFn: () =>
      getCompanies({
        page,
        search: debouncedSearch || undefined,
      }),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
  <div className="space-y-6">
    <div>
      <h1 className="text-4xl font-bold">
        Companies
      </h1>

      <p className="text-muted-foreground">
        Manage your companies.
      </p>
    </div>

    <div className="flex items-center justify-between">
      <CompanyToolbar
        search={search}
        setSearch={setSearch}
      />

      <AddCompanyDialog />
    </div>

    <CompanyTable
      companies={data?.items ?? []}
    />
  </div>
);
}