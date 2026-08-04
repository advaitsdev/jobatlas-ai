import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "@/services/company";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function OpportunitySelect({
  value,
  onChange,
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["companies-dropdown"],

    queryFn: () =>
      getCompanies({
        page: 1,
        limit: 100,
      }),
  });

  return (
    <select
      className="w-full rounded-md border px-3 py-2"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      disabled={isLoading}
    >
      <option value="">
        Select Company
      </option>

      {data?.items.map((company) => (
        <option
          key={company.id}
          value={company.id}
        >
          {company.name}
        </option>
      ))}
    </select>
  );
}