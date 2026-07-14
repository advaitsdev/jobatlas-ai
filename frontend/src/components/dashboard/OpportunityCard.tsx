type OpportunityCardProps = {
  title: string;
  status: string;
  location: string;
  companyId: string;
};

export default function OpportunityCard({
  title,
  status,
  location,
  companyId,
}: OpportunityCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        Company ID: {companyId}
      </p>

      <p className="text-slate-400">
        📍 {location}
      </p>

      <span className="mt-3 inline-block rounded bg-blue-600 px-3 py-1 text-sm text-white">
        {status}
      </span>
    </div>
  );
}