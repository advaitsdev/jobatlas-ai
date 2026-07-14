import OpportunityList from "@/components/dashboard/OpportunityList";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-400">
        Welcome back, Advait 👋
      </p>

      <OpportunityList />
    </div>
  );
}