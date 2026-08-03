import {
  BriefcaseBusiness,
  Send,
  Target,
  Trophy,
  XCircle,
  Ghost,
  MessageSquare,
  LogOut,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import type { DashboardSummary } from "@/types/dashboard";

type DashboardStatsProps = {
  summary: DashboardSummary;
};

export default function DashboardStats({
  summary,
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
    </div>
  );
}