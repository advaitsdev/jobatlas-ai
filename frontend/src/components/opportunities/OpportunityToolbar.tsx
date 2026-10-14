import { Input } from "@/components/ui/input";

import type { OpportunityStatus } from "@/types/opportunity";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: OpportunityStatus | "";
  setStatus: (value: OpportunityStatus | "") => void;
};

export default function OpportunityToolbar({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search title, company..."
        className="max-w-sm"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="rounded-md border px-3 py-2"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as OpportunityStatus | ""
          )
        }
      >
        <option value="">All Status</option>
        <option value="WISHLIST">Wishlist</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>
    </div>
  );
}