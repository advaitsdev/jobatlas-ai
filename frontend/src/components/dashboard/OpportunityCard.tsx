import { deleteOpportunity } from "@/services/opportunity";
type OpportunityCardProps = {
  id: string;
  title: string;
  status: string;
  location: string;
  company: {
    id: string;
    name: string;
  };
  onDelete: (id: string) => void;
};

export default function OpportunityCard({
  id,
  title,
  status,
  location,
  company,
  onDelete,
}: OpportunityCardProps) {
  const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this opportunity?"
  );

  if (!confirmed) return;

  try {
    await deleteOpportunity(id);
    onDelete(id);
  } catch (error) {
    console.error(error);
    alert("Failed to delete opportunity.");
  }
};
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="text-xl font-semibold text-white">
  {title}
</h2>

     <p className="mt-2 text-sm text-slate-300">
        Company
    </p>

    <p className="font-semibold text-white">
    {company.name}
    </p>

      <p className="text-slate-400">
        📍 {location}
      </p>

      <span className="mt-3 inline-block rounded bg-blue-600 px-3 py-1 text-sm text-white">
        {status}
      </span>
      <div className="mt-4">
  <button
    onClick={handleDelete}
    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
  >
    🗑 Delete
  </button>
</div>
    </div>
  );
}