import ChartCard from "./ChartCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import type { Opportunity } from "@/types/opportunity";

type Props = {
  opportunities: Opportunity[];
};

export default function ApplicationsOverTimeChart({
  opportunities,
}: Props) {
  const monthlyCounts = opportunities.reduce(
    (acc, opportunity) => {
      if (!opportunity.applied_date) return acc;

      const month = new Date(
        opportunity.applied_date
      ).toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      acc[month] = (acc[month] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(monthlyCounts).map(
    ([month, count]) => ({
      month,
      count,
    })
  );

  return (
  <ChartCard title="Applications Over Time">
    <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

           <Tooltip
  contentStyle={{
    backgroundColor: "#1e293b",
    border: "none",
    borderRadius: "12px",
    color: "white",
  }}
/>

            <Line
  type="monotone"
  dataKey="count"
  strokeWidth={3}
  animationDuration={900}
/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}