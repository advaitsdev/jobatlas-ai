import ChartCard from "./ChartCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Opportunity } from "@/types/opportunity";

type Props = {
  opportunities: Opportunity[];
};

const COLORS = [
  "#3b82f6",
  "#facc15",
  "#a855f7",
  "#22c55e",
  "#ef4444",
];

export default function StatusPieChart({
  opportunities,
}: Props) {
  const counts = opportunities.reduce(
    (acc, opportunity) => {
      acc[opportunity.status] =
        (acc[opportunity.status] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <ChartCard title="Status Distribution">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Status Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}