import type { Opportunity } from "@/types/opportunity";

type DashboardStatsProps = {
  opportunities: Opportunity[];
};

export default function DashboardStats({
  opportunities,
}: DashboardStatsProps) {
  const total = opportunities.length;

  const wishlist = opportunities.filter(
    (o) => o.status === "wishlist"
  ).length;

  const applied = opportunities.filter(
    (o) => o.status === "applied"
  ).length;

  const interview = opportunities.filter(
    (o) => o.status === "interview"
  ).length;

  const offer = opportunities.filter(
    (o) => o.status === "offer"
  ).length;

  const rejected = opportunities.filter(
    (o) => o.status === "rejected"
  ).length;

  const stats = [
    { label: "Total Jobs", value: total, emoji: "📄" },
    { label: "Wishlist", value: wishlist, emoji: "⭐" },
    { label: "Applied", value: applied, emoji: "📨" },
    { label: "Interviews", value: interview, emoji: "🎯" },
    { label: "Offers", value: offer, emoji: "🏆" },
    { label: "Rejected", value: rejected, emoji: "❌" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-700 bg-slate-800 p-5"
        >
          <p className="text-slate-400">
            {stat.emoji} {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}