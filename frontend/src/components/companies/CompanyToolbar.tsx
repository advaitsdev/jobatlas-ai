import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function CompanyToolbar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="flex justify-between gap-4">
      <Input
        placeholder="Search company..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}