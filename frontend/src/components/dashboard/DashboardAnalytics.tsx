import ApplicationsOverTimeChart from "./charts/ApplicationsOverTimeChart";
import TopCompaniesChart from "./charts/TopCompaniesChart";
import StatusPieChart from "./charts/StatusPiechart";

import type { ApplicationAnalytics } from "@/services/analytics";

type DashboardAnalyticsProps = {
  analytics: ApplicationAnalytics;
};

export default function DashboardAnalytics({
  analytics,
}: DashboardAnalyticsProps) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <StatusPieChart
        data={analytics.status_breakdown}
      />

      <TopCompaniesChart
        data={analytics.company_breakdown}
      />

      <div className="lg:col-span-2">
        <ApplicationsOverTimeChart
          data={analytics.application_timeline}
        />
      </div>
    </div>
  );
}