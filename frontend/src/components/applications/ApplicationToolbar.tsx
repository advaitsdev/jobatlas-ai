import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  source: string;
  setSource: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function ApplicationToolbar({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search company or role..."
        className="max-w-sm"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="">Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="HR">HR</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Ghosted">Ghosted</option>
        <option value="Withdrawn">Withdrawn</option>
      </select>

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="">Source</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Indeed">Indeed</option>
        <option value="Naukri">Naukri</option>
        <option value="Foundit">Foundit</option>
        <option value="Referral">Referral</option>
        <option value="Campus">Campus</option>
        <option value="Company Career Page">Company Career Page</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
}