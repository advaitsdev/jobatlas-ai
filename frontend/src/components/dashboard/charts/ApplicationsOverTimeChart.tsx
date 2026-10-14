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

import type { AnalyticsTimelinePoint } from "@/services/analytics";

type Props = {
  data: AnalyticsTimelinePoint[];
};

export default function ApplicationsOverTimeChart({
  data,
}: Props) {
  return (
    <ChartCard title="Applications Over Time">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

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