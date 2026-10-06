import { useEffect, useState } from "react";

import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import { getApplicationAnalytics } from "@/services/analytics";
import type { ApplicationAnalytics } from "@/services/analytics";

export default function Analytics() {
  const [analytics, setAnalytics] =
    useState<ApplicationAnalytics | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        setError(null);

        const data = await getApplicationAnalytics();

        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

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

      {loading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Loading analytics...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-center text-red-400">
          {error}
        </div>
      )}

      {analytics && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">
                Total Applications
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.total_applications}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">
                Last 30 Days
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.applications_last_30_days}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">
                Interview Rate
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.application_to_interview_ratio}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">
                Offer Rate
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.application_to_offer_ratio}%
              </p>
            </div>
          </div>

          <DashboardAnalytics
            analytics={analytics}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">
                Rejection Rate
              </h2>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.application_to_rejection_ratio}%
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Percentage of applications that resulted in a rejection.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">
                Total Opportunities
              </h2>

              <p className="mt-2 text-3xl font-bold text-white">
                {analytics.total_opportunities}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Total opportunities currently tracked in JobAtlasAI.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 