import ChartCard from "./ChartCard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { CompanyBreakdown } from "@/types/dashboard";

type Props = {
  data: CompanyBreakdown[];
};

export default function TopCompaniesChart({ data }: Props) {
  return (
    <ChartCard title="Top Companies">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis type="number" allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="company"
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar
              dataKey="count"
              name="Applications"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}