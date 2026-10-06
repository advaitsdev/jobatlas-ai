import {
  BriefcaseBusiness,
  Send,
  Target,
  Trophy,
  XCircle,
  Ghost,
  MessageSquare,
  LogOut,
  CalendarDays,
  Percent,
  TrendingUp,
  Ban,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import type { DashboardSummary } from "@/types/dashboard";

type DashboardStatsProps = {
  summary: DashboardSummary;
  applicationsLast30Days: number;
  interviewRate: number;
  offerRate: number;
  rejectionRate: number;
};

export default function DashboardStats({
  summary,
  applicationsLast30Days,
  interviewRate,
  offerRate,
  rejectionRate,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Total Applications"
        value={summary.total_applications}
        icon={BriefcaseBusiness}
        iconColor="text-indigo-600"
      />

      <DashboardCard
        title="Applied"
        value={summary.applied}
        icon={Send}
        iconColor="text-blue-600"
      />

      <DashboardCard
        title="Interviews"
        value={summary.interview}
        icon={Target}
        iconColor="text-orange-500"
      />

      <DashboardCard
        title="Offers"
        value={summary.offer}
        icon={Trophy}
        iconColor="text-green-600"
      />

      <DashboardCard
        title="Rejected"
        value={summary.rejected}
        icon={XCircle}
        iconColor="text-red-600"
      />

      <DashboardCard
        title="Ghosted"
        value={summary.ghosted}
        icon={Ghost}
        iconColor="text-slate-600"
      />

      <DashboardCard
        title="HR"
        value={summary.hr}
        icon={MessageSquare}
        iconColor="text-purple-600"
      />

      <DashboardCard
        title="Withdrawn"
        value={summary.withdrawn}
        icon={LogOut}
        iconColor="text-gray-600"
      />

      <DashboardCard
        title="Last 30 Days"
        value={applicationsLast30Days}
        icon={CalendarDays}
        iconColor="text-cyan-600"
      />

      <DashboardCard
        title="Interview Rate"
        value={`${interviewRate}%`}
        icon={TrendingUp}
        iconColor="text-orange-600"
      />

      <DashboardCard
        title="Offer Rate"
        value={`${offerRate}%`}
        icon={Percent}
        iconColor="text-green-600"
      />

      <DashboardCard
        title="Rejection Rate"
        value={`${rejectionRate}%`}
        icon={Ban}
        iconColor="text-red-600"
      />
    </div>
  );
}