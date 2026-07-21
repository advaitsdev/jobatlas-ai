import ChartCard from "./ChartCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { Opportunity } from "@/types/opportunity";

type Props = {
  opportunities: Opportunity[];
};

export default function TopCompaniesChart({
  opportunities,
}: Props) {
  const companyCounts = opportunities.reduce(
    (acc, opportunity) => {
      const company = opportunity.company.name;

      acc[company] = (acc[company] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(companyCounts)
    .map(([company, count]) => ({
      company,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
  <ChartCard title="Top Companies">
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
        >
          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="company"
            width={100}
          />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);
}