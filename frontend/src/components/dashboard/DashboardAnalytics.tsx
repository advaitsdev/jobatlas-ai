import ApplicationsOverTimeChart from "./charts/ApplicationsOverTimeChart";
import type { Opportunity } from "@/types/opportunity";
import TopCompaniesChart from "./charts/TopCompaniesChart";
import StatusPieChart from "./charts/StatusPiechart";

type DashboardAnalyticsProps = {
  opportunities: Opportunity[];
};

export default function DashboardAnalytics({
  opportunities,
}: DashboardAnalyticsProps) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <StatusPieChart opportunities={opportunities} />

    <TopCompaniesChart
  opportunities={opportunities}
/>
<div className="lg:col-span-2">
  <ApplicationsOverTimeChart
    opportunities={opportunities}
  />
</div>
    </div>
  );
}