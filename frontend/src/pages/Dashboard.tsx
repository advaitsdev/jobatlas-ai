import { useQuery } from "@tanstack/react-query";
import RecentApplications from "@/components/dashboard/RecentApplications";
import StatusPieChart from "@/components/dashboard/charts/StatusPiechart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { getDashboard } from "@/services/dashboard";
import type { DashboardResponse } from "@/types/dashboard";
import MonthlyChart from "@/components/dashboard/charts/MonthlyChart";
import SourceChart from "@/components/dashboard/charts/SourceChart";
import type { JobApplication } from "@/types/application";

const test: JobApplication | null = null;
export default function Dashboard() {
  const { data, isLoading, isError } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <h1 className="text-xl font-semibold">Loading dashboard...</h1>;
  }

  if (isError || !data) {
    return (
      <h1 className="text-xl font-semibold text-red-500">
        Failed to load dashboard.
      </h1>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back 👋 Here's your job application overview.
        </p>
      </div>

      <DashboardStats summary={data.summary} />
      <div className="grid gap-6 lg:grid-cols-2">
  <StatusPieChart data={data.status_breakdown} />

  <MonthlyChart
    data={data.monthly_applications}
  />
   <SourceChart
    data={data.source_breakdown}
  />
   <RecentApplications />
</div>
    </div>
  );
}