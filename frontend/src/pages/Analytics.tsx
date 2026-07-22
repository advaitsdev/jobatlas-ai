import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import { useOpportunities } from "@/hooks/useOpportunities";

export default function Analytics() {
  const { opportunities } = useOpportunities();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Insights into your job search performance.
        </p>
      </div>

      <DashboardAnalytics opportunities={opportunities} />

      <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          🚀 Coming Soon
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="font-semibold text-white">
              Interview Funnel
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Track how applications progress from Applied → Interview → Offer.
            </p>
          </div>

          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="font-semibold text-white">
              Success Rate
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Measure offer rate and interview conversion over time.
            </p>
          </div>

          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="font-semibold text-white">
              Response Rate
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              See how many applications receive responses.
            </p>
          </div>

          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="font-semibold text-white">
              Monthly Trends
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Compare applications, interviews, and offers month by month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}